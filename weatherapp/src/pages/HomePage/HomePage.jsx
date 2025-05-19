import React from 'react';
//===== assets =====//
import './HomePage.scss';
//===== components =====//
import WeatherCard from '../../components/WeatherCard/WeatherCard';

const HomePage = ({coords, currentWeatherData, hourlyForecastData, dailyForecastData}) => {
  console.log(coords);
  return (
    <div className='HomePage'>
      <WeatherCard
        currentWeatherData={currentWeatherData}
        hourlyForecastData={hourlyForecastData}
        dailyForecastData={dailyForecastData}
      />
    </div>
  )
}

export default HomePage;