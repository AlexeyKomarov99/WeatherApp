import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { 
  selectFavoriteCities,
  selectCitiesWeatherData,
 } from '../../../features/weather/weatherSelectors';
//===== assets =====//
import './MWFavoriteCities.scss';
import { FaUmbrella as UmbrellaIcon } from "react-icons/fa";
import { TbTemperature as TempNormIcon } from "react-icons/tb";
import { RxCross1 as CrossIcon } from "react-icons/rx";

const MWFavoriteCities = ({
  handleCloseMW
}) => {
  const favoriteCities = useSelector(selectFavoriteCities);
  const citiesWeatherData = useSelector(selectCitiesWeatherData);

  const currentHour = new Date().getHours();
  const citiesDataFormatted = citiesWeatherData.map((city, index) => {
    return {
      cityId: city.cityId,
      cityName: city.cityData.currentWeatherData.location.name,
      weatherIcon: 
        city.cityData
            .hourlyForecastData
            .forecast
            .forecastday[0]
            .hour
            .filter((hour) => {
              const hourFormatted = Number(hour.time.split(' ')[1].split(':')[0]);
              return hourFormatted === currentHour
            })
            [0]
            .condition
            .icon
    }
  })

  return (
    <div className='MWFavoriteCities'>

      {/* Title */}
      <div className="MWFavoriteCities__header">
        <div className="MWFavoriteCities__content-left">
          <div className="MWFavoriteCities__icon-wrapper icon-wrapper"><UmbrellaIcon className='icon'/></div>

          <div className="MWFavoriteCities__header-group">
            <div className="MWFavoriteCities__title">Титул</div>
            <div className="MWFavoriteCities__title-descr">Описание</div>
          </div>
        </div>

        <div 
          className="MWFavoriteCities__cross-icon-wrapper"
          onClick={handleCloseMW}
        >
          <CrossIcon className='cross-icon' />
        </div>

      </div>

      <div className="MWFavoriteCities__city-list">
        {citiesDataFormatted.map((city) => (
          <div key={city.cityId} className="MWFavoriteCities__city-item">
            <div className="MWFavoriteCities__city-name">{city.cityName}</div>
            <div className="MWFavoriteCities__city-icon-wrapper">
              <img className="MWFavoriteCities__city-icon" src={`${city.weatherIcon}`} alt="" />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MWFavoriteCities