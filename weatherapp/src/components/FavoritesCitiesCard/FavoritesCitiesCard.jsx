import React from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectTemperatureUnits
} from '../../features/weather/weatherSelectors';
import {
  deleteCityFavorites
} from '../../features/weather/weatherSlice';
//===== assets =====//
import './FavoritesCitiesCard.scss';
import { RxHamburgerMenu as BurgerIcon } from "react-icons/rx";
import { FaMinusCircle as CircleDeleteIcon } from "react-icons/fa";
//===== utils =====//
import { getBackgroundByWeather } from '../../utils/getBackgroundByWeather';
import { getWeatherDescription } from '../../utils/getWeatherDescription';

const FavoritesCitiesCard = ({ 
  city,
  onClick,
  isEditMode,
  dragHandleProps,
}) => {
  const temperatureUnits = useSelector(selectTemperatureUnits);
  const dispatch = useDispatch();

  // Получаем цвет фона на основе описания погоды
  const cardStyle = {
    background: city?.weatherDescr 
      ? getBackgroundByWeather(city.weatherDescr, city.is_day, city.currentTemp_c)
      : '#242323',
  };

  const weatherDescrFormatted = getWeatherDescription(city.weatherDescr);

  // Удаление города из списка
  const handleDeleteCity = (cityId) => {
    dispatch(deleteCityFavorites(cityId));
  }

  return (
    <div className={`FavoritesCitiesCard__wrapper-card ${isEditMode ? 'edit-mode' : ''}`}>

      {isEditMode && (
        <div 
          className="circle-delete-icon-wrapper"
          onClick={() => handleDeleteCity(city.cityId)}
        >
          <CircleDeleteIcon className="circle-delete-icon" />
        </div>
      )}

      <div 
        className='FavoritesCitiesCard' 
        style={cardStyle}
        onClick={onClick}
      >
        <div className="FavoritesCitiesCard__content">
          <div className="FavoritesCities__content-left">
            <div className="FavoritesCities__left-top">
              <div className="FavoritesCities__city-name">{city.cityName}</div>
              <div className="FavoritesCities__time">{city.currentTime}</div>
            </div>
            <div className="FavoritesCities__left-bottom">
              <div className="FavoritesCities__weather-descr">{weatherDescrFormatted}</div>
            </div>
          </div>
          <div className="FavoritesCities__content-right">
            <div className="FavoritesCities__right-top">
              <div className="FavoritesCities__temp-max">{temperatureUnits === 'Celsius' ? city.currentTemp_c : city.currentTemp_f}°</div>
            </div>
            <div className="FavoritesCities__right-bottom">
              <div className="FavoritesCities__temp temp-max">Макс.:{temperatureUnits === 'Celsius' ? city.maxTemp_c : city.maxTemp_f}°,</div>
              <div className="FavoritesCities__temp">мин.:{temperatureUnits === 'Celsius' ? city.minTemp_c : city.minTemp_f}°</div>
            </div>
          </div>
        </div>

      </div>

      {isEditMode && (
        <div className="burger-icon-wrapper" {...dragHandleProps}>
          <BurgerIcon className="burger-icon" />
        </div>
      )}

    </div>

  );
};

export default FavoritesCitiesCard;