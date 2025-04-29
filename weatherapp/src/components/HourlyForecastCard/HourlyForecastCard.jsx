import React from 'react';
//===== assets =====//
import './HourlyForecastCard.scss';

const HourlyForecastCard = ({hourlyForecast}) => {
  
  const tempFormatted = Math.round(hourlyForecast.temperature);
  
  return (
    <div className='HourlyForecastCard'>
        <span className="HourlyForecastCard__time">{hourlyForecast.time}</span>
        <img 
          src={`${hourlyForecast.weatherIcon}`}
          alt={`${hourlyForecast.weatherDescr}`}
        />
        <span className="HourlyForecastCard__temperature">{tempFormatted}°</span>
    </div>
  )
}

export default HourlyForecastCard;