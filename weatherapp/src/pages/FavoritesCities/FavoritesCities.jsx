import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectActiveSectionName, 
  selectFavoriteCities, 
  selectIsActiveMW 
} from '../../features/weather/weatherSelectors';
import {
  setIndexActivePage,
  reorderFavoriteCities,
  setIsActiveMW,
  setActiveSectionName,
} from '../../features/weather/weatherSlice';
//===== assets =====//
import './FavoritesCities.scss';
import { IoEllipsisHorizontalCircle as CircleWithPointsIcon } from "react-icons/io5";
//===== components =====//
import SearchCity from '../../components/SearchCity/SearchCity';
import FavoritesCitiesCard from '../../components/FavoritesCitiesCard/FavoritesCitiesCard';
import WeatherCardsSettingsMW from '../../components/WeatherCardsSettingsMW/WeatherCardsSettingsMW';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

const FavoritesCities = ({
  currentWeatherData,
  hourlyForecastData
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [isActiveSearchMW, setIsActiveSearchMW] = useState(false);
  const [isActiveSetingsMW, setIsActiveSettingsMW] = useState(false);

  const activeSectionName = useSelector(selectActiveSectionName);
  const isActiveMW = useSelector(selectIsActiveMW);

  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const favoritesCitiesList = useSelector(selectFavoriteCities);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const hourlyWeatherData = hourlyForecastData?.forecast?.forecastday;
  const hourlyData_c = hourlyWeatherData 
    ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_c))
    : [];
  const hourlyData_f = hourlyWeatherData 
    ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_f))
    : [];
  
  const nameCity = 'Текущее место';
  const currentTime = currentWeatherData?.location?.localtime.split(' ')[1];
  const currentTemp_c = Math.round(currentWeatherData?.current?.temp_c);
  const currentTemp_f = Math.round(currentWeatherData?.current?.temp_f);
  const minTemp_c = Math.round(Math.min(...hourlyData_c));
  const minTemp_f = Math.round(Math.min(...hourlyData_f));
  const maxTemp_c = Math.round(Math.max(...hourlyData_c));
  const maxTemp_f = Math.round(Math.max(...hourlyData_f));
  
  const weatherDescr = currentWeatherData ? currentWeatherData?.current?.condition?.text : '-';

  const weatherDataCurrentCity = {
    cityName: nameCity,
    currentTime: currentTime,
    currentTemp_c: currentTemp_c,
    currentTemp_f: currentTemp_f,
    minTemp_c: minTemp_c,
    minTemp_f: minTemp_f,
    maxTemp_c: maxTemp_c,
    maxTemp_f: maxTemp_f,
    weatherDescr: weatherDescr
  };

  const goActivePage = (index) => {
    dispatch(setIndexActivePage(index));
    navigate('/');
  };

  useEffect(() => {
    if (blackout) {
      document.body.classList.add('page-blackout');
    } else {
      document.body.classList.remove('page-blackout');
    }
  }, [blackout]);


  const openSettingsMW = () => {
    if(iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setIconPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setIsActiveSettingsMW(prevState => !prevState);
  };

  // Обработчик завершения перетаскивания (Drag and Drop)
  const onDragEnd = (result) => {
    if (!result.destination) return; // Если элемент не перемещен
    
    // Не перемещаем текущее местоположение (оно всегда на позиции 0)
    if (result.source.index === 0 || result.destination.index === 0) return;

    dispatch(reorderFavoriteCities({
      fromIndex: result.source.index - 1, // -1, потому что первый элемент (текущее местоположение) не входит в favoritesCitiesList
      toIndex: result.destination.index - 1
    }));
  };

  const handleUndoChange = () => {
    setIsEditMode(prevState => !prevState);
  }

  const handleCloseMW = () => {
    dispatch(setIsActiveMW(false));
    dispatch(setActiveSectionName(''));
  }

  return (
    <>
      {blackout && <div className="page-blackout" />}
      <div className="FavoritesCities">

        <div className="FavoritesCities__settings">
          
          {isEditMode ? (
            <div 
              onClick={handleUndoChange}
              style={{
                height: '24px',
                cursor: 'pointer'
              }}
            >
              Готово
            </div>
          ) : (
            <div 
              className="FavoritesCities__icon-wrapper"
              onClick={openSettingsMW}
              ref={iconRef}
            >
              <CircleWithPointsIcon className='icon' />
            </div>
          )}

        </div>

        <div 
          className={`FavoritesCities__title ${blackout ? 'hide-title' : ''}`}
          ref={titleRef}
        >
          Погода
        </div>

        <SearchCity
          blackout={blackout} 
          setBlackout={setBlackout} 
          isActiveSearchMW={isActiveSearchMW}
          setIsActiveSearchMW={setIsActiveSearchMW}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="favoritesCities">
            {(provided) => (
              <div 
                className={`FavoritesCities__content ${blackout ? 'content-up' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* Карточка текущего местоположения - всегда на позиции 0 и не перетаскивается */}
                <FavoritesCitiesCard 
                  city={weatherDataCurrentCity}
                  onClick={() => goActivePage(0)}
                />

                {/* Карточки избранных городов с возможностью перетаскивания */}
                {favoritesCitiesList.map((city, index) => (
                  <Draggable 
                    key={city.cityId} 
                    draggableId={String(city.cityId)}
                    index={index + 1} // +1, потому что текущее местоположение занимает 0 индекс
                    isDragDisabled={!isEditMode}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <FavoritesCitiesCard 
                          city={city} 
                          onClick={() => !isEditMode && goActivePage(index + 1)}
                          isEditMode={isEditMode}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <WeatherCardsSettingsMW
        isActiveSetingsMW={isActiveSetingsMW}
        openSettingsMW={openSettingsMW}
        iconPosition={iconPosition}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        isEditMode={isEditMode}
      />

      <ModalWindow 
        isActiveMW={isActiveMW}
        activeSectionName={activeSectionName}
        handleCloseMW={handleCloseMW}
      />
    </>
  );
};

export default FavoritesCities;