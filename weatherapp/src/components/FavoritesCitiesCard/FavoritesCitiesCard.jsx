import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectTemperatureUnits } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './FavoritesCitiesCard.scss';
//===== utils =====//
import { getBackgroundByWeather } from '../../utils/getBackgroundByWeather';

const FavoritesCitiesCard = ({ 
  city,
  onClick,
}) => {
  const temperatureUnits = useSelector(selectTemperatureUnits);
  
  // Получаем цвет фона на основе описания погоды
  const cardStyle = {
    background: city?.weatherDescr 
      ? getBackgroundByWeather(city.weatherDescr, city.is_day, city.currentTemp_c)
      : '#242323',
  };

  const weatherDescrFormatted = 
    city.weatherDescr === 'Partly cloudy' ? 'Переменная облачность' : 
    city.weatherDescr === 'Sunny' ? 'Солнечно' :
    city.weatherDescr === 'Clear' ? 'Ясно' :
    city.weatherDescr === 'Cloudy' ? 'Облачно' :
    city.weatherDescr === 'Overcast' ? 'Пасмурно' :
    city.weatherDescr === 'Mist' ? 'Дымка' :
    city.weatherDescr === 'Fog' ? 'Туман' :
    city.weatherDescr === 'Patchy rain possible' ? 'Возможен дождь' :
    city.weatherDescr === 'Patchy snow possible' ? 'Возможен снег' :
    city.weatherDescr === 'Patchy sleet possible' ? 'Возможен мокрый снег' :
    city.weatherDescr === 'Patchy freezing drizzle possible' ? 'Возможна ледяная морось' :
    city.weatherDescr === 'Thundery outbreaks possible' ? 'Возможны грозы' :
    city.weatherDescr === 'Blowing snow' ? 'Метель' :
    city.weatherDescr === 'Blizzard' ? 'Снежная буря' :
    city.weatherDescr === 'Freezing fog' ? 'Ледяной туман' :
    city.weatherDescr === 'Light rain' ? 'Небольшой дождь' :
    city.weatherDescr === 'Moderate rain' ? 'Умеренный дождь' :
    city.weatherDescr === 'Heavy rain' ? 'Сильный дождь' :
    city.weatherDescr === 'Light freezing rain' ? 'Лёгкий ледяной дождь' :
    city.weatherDescr === 'Moderate or heavy freezing rain' ? 'Сильный ледяной дождь' :
    city.weatherDescr === 'Light sleet' ? 'Небольшой мокрый снег' :
    city.weatherDescr === 'Moderate or heavy sleet' ? 'Сильный мокрый снег' :
    city.weatherDescr === 'Light snow' ? 'Небольшой снег' :
    city.weatherDescr === 'Moderate snow' ? 'Умеренный снегопад' :
    city.weatherDescr === 'Heavy snow' ? 'Сильный снегопад' :
    city.weatherDescr === 'Patchy rain nearby' ? 'Местами дождь' :
    city.weatherDescr === 'Light rain shower' ? 'Небольшой ливень' :
    city.weatherDescr === 'Moderate or heavy rain shower' ? 'Сильный ливень' :
    city.weatherDescr === 'Torrential rain shower' ? 'Проливной ливень' :
    city.weatherDescr === 'Light sleet showers' ? 'Небольшой мокрый снег' :
    city.weatherDescr === 'Moderate or heavy sleet showers' ? 'Сильный мокрый снег' :
    city.weatherDescr === 'Light snow showers' ? 'Небольшой снегопад' :
    city.weatherDescr === 'Moderate or heavy snow showers' ? 'Сильный снегопад' :
    city.weatherDescr === 'Light showers of ice pellets' ? 'Небольшой град' :
    city.weatherDescr === 'Moderate or heavy showers of ice pellets' ? 'Сильный град' :
    city.weatherDescr === 'Patchy light rain with thunder' ? 'Дождь с грозой' :
    city.weatherDescr === 'Moderate or heavy rain with thunder' ? 'Сильный дождь с грозой' :
    city.weatherDescr === 'Patchy light snow with thunder' ? 'Снег с грозой' :
    city.weatherDescr === 'Moderate or heavy snow with thunder' ? 'Сильный снег с грозой' :
    city.weatherDescr === 'Light drizzle' ? 'Мелкий моросящий дождь' :
    city.weatherDescr === '' ? 'Нет данных' :
    city.weatherDescr;

  return (
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
  );
};

export default FavoritesCitiesCard;