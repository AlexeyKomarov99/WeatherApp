import React from 'react';
//===== assets =====//
import './FavoritesCitiesCard.scss';

const FavoritesCitiesCard = ({city}) => {
  
  const weatherDescrFormatted = 
    city.weatherDescr === 'Partly Cloudy' ? 'Переменная облачность' : 
    city.weatherDescr === 'Sunny' ? 'Солнечно' :
    city.weatherDescr === 'Light drizzle' ? 'Мелкий моросящий дождь' :
    city.weatherDescr === 'Light rain' ? 'Легкий дождь' :
    city.weatherDescr === 'Patchy rain nearby' ? 'Местами дождь' :
    city.weatherDescr === 'Clear' ? 'Ясная погода' :
    city.weatherDescr === '' ? 'Нет данных' :
    city.weatherDescr;
  
  return (
    <div className='FavoritesCitiesCard'>
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
                  <div className="FavoritesCities__temp-max">{city.currentTemp}°</div>
                </div>

                <div className="FavoritesCities__right-bottom">
                  <div className="FavoritesCities__temp temp-max">Макс.:{city.maxTemp}°,</div>
                  <div className="FavoritesCities__temp">мин.:{city.minTemp}°</div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default FavoritesCitiesCard;