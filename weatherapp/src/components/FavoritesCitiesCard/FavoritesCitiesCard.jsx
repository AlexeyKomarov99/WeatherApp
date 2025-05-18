import React from 'react';
//===== assets =====//
import './FavoritesCitiesCard.scss';

const FavoritesCitiesCard = ({city}) => {
  return (
    <div className='FavoritesCitiesCard'>
        <div className="FavoritesCitiesCard__content">

            <div className="FavoritesCities__content-left">

                <div className="FavoritesCities__left-top">
                  <div className="FavoritesCities__city-name">{city.city}</div>
                  <div className="FavoritesCities__time">{city.currentTime}</div>
                </div>
                
                <div className="FavoritesCities__left-bottom">
                  <div className="FavoritesCities__weather-descr">{city.weatherDescr}</div>
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