import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteCities } from '../../features/weather/weatherSelectors';
import { setCurrentIndex } from '../../features/weather/weatherSlice';
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
  const [blackout, setBlackout] = useState(false);
  const [isActiveMW, setIsActiveMW] = useState(false);
  const [isActiveSetingsMW, setIsActiveSettingsMW] = useState(false);
  const favoritesCitiesList = useSelector(selectFavoriteCities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  // Для главного модального окна
  const [activeSection, setActiveSection] = useState('');
  const [isActiveMainMW, setIsActiveMainMW] = useState(false);

    
  const hourlyWeatherData = hourlyForecastData?.forecast?.forecastday;
  const hourlyData_c = hourlyWeatherData 
    ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_c))
    : [];
  const hourlyData_f = hourlyWeatherData 
    ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_f))
    : [];
  
  const nameCity = 'Текущее место';
  const currentTime = currentWeatherData?.location?.localtime.split(' ')[1];
  const currentTemp_c = currentWeatherData?.current?.temp_c || '';
  const currentTemp_f = currentWeatherData?.current?.temp_f || '';
  const minTemp_c = Math.min(...hourlyData_c);
  const minTemp_f = Math.min(...hourlyData_f);
  const maxTemp_c = Math.max(...hourlyData_c);
  const maxTemp_f = Math.max(...hourlyData_f);
  
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
    dispatch(setCurrentIndex(index));
    navigate('/');
  }

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
  }

  const toggleActiveSection = (section) => {
    setActiveSection(section);
    setIsActiveMainMW(true);
  }

  return (
    <>
      {blackout && <div className="page-blackout" />}
      <div className="FavoritesCities">
        
        <div className="FavoritesCities__settings">
          <div 
            className="FavoritesCities__icon-wrapper"
            onClick={openSettingsMW}
            ref={iconRef}
          >
            <CircleWithPointsIcon className='icon' />
          </div>
        </div>

        <div
          className={`FavoritesCities__title ${blackout ? 'hide-title' : ''}`}
        >
          Погода
        </div>

        <SearchCity
          blackout={blackout} 
          setBlackout={setBlackout} 
          isActiveMW={isActiveMW}
          setIsActiveMW={setIsActiveMW}
        />

        <div className={`FavoritesCities__content ${blackout ? 'content-up' : ''}`}>
          {/* Карточка текущего местоположения - всегда с индексом 0 */}
          <FavoritesCitiesCard 
            city={weatherDataCurrentCity}
            onClick={() => goActivePage(0)}
          />

          {/* Карточки избранных городов с индексами, начиная с 1 */}
          {favoritesCitiesList.map((city, index) => (
            <FavoritesCitiesCard 
              key={city.cityId} 
              city={city} 
              onClick={() => goActivePage(index + 1)}
            />
          ))}
        </div>
      </div>

      <WeatherCardsSettingsMW
        isActiveSetingsMW={isActiveSetingsMW}
        openSettingsMW={openSettingsMW}
        iconPosition={iconPosition}
        toggleActiveSection={toggleActiveSection}
      />

      <ModalWindow 
        isActiveMW={isActiveMainMW}
        activeSection={activeSection}
        onClose={() => setIsActiveMainMW(false)}
      />
    </>
  );
};

export default FavoritesCities;