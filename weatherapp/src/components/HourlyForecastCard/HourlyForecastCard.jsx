import React from 'react';
//===== assets =====//
import './HourlyForecastCard.scss';

const HourlyForecastCard = ({hourlyForecast}) => {
  
  const timeFormatted = hourlyForecast.time.split(':')[0];
  const tempFormatted = Math.round(hourlyForecast.temperature);
  
  return (
    <div className='HourlyForecastCard'>
        <span className="HourlyForecastCard__time">{timeFormatted}</span>
        <div className="HourlyForecastCard__icon-wrapper icon-weather-wrapper">
          <img 
            className='HourlyForecastCard__icon icon-weather'
            src={`${hourlyForecast.weatherIcon}`}
            alt={`${hourlyForecast.weatherDescr}`}
          />
        </div>
        <span className="HourlyForecastCard__temperature">{tempFormatted}°</span>
    </div>
  )
}

export default HourlyForecastCard;