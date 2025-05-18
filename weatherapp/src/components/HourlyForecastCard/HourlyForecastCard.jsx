import React from 'react';
//===== assets =====//
import './HourlyForecastCard.scss';

const HourlyForecastCard = ({hour}) => {
  const timeFormatted = hour.time.split(':')[0];
  const isTemperature = typeof hour.temp_c === 'number';
  
  return (
    <div className='HourlyForecastCard'>
        <span className="HourlyForecastCard__time">{timeFormatted}</span>
        <div className="HourlyForecastCard__icon-wrapper icon-weather-wrapper">
          <img 
            className='HourlyForecastCard__icon icon-weather'
            src={`${hour.weatherIcon}`}
            alt={`hour.weatherDescr ? hour.weatherDescr : (hour.isSunEvent ? (hour.temp_c.includes('Восход') ? 'Восход солнца' : 'Закат солнца') : '')`}
          />
        </div>
        <span className="HourlyForecastCard__temperature">
          {isTemperature ? `${hour.temp_c}°` : hour.temp_c}
        </span>
    </div>
  )
}

export default HourlyForecastCard;