import React from 'react'
//===== assets =====//
import './DailyForecastCard.scss';

const DailyForecastCard = ({dailyForecast}) => {
  
  const date = new Date(dailyForecast.id * 1000).toDateString();
  const dateFormatted = date.split(' ')[0];

  const weatherIcon = dailyForecast.weatherIcon;
  const weatherDescr = dailyForecast.weatherDescr;
  
  const tempMin = Math.round(dailyForecast.tempMin);
  const tempMax = Math.round(dailyForecast.tempMax);
  
  return (
    <div className='DailyForecastCard'>
        <span className="DailyForecastCard__day-week">{dateFormatted}</span>
        <img
          className='DailyForecastCard__icon'
          src={weatherIcon} 
          alt={weatherDescr} 
        />
        <span className="DailyForecastCard__temp-min">{tempMin}° </span>
        <span className="DailyForecastCard__temp-max">{tempMax}°</span>
    </div>
  )
}

export default DailyForecastCard