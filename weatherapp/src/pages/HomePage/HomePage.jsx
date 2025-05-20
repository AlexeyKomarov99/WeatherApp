import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
//===== assets =====//
import './HomePage.scss';
//===== components =====//
import WeatherCard from '../../components/WeatherCard/WeatherCard';

const HomePage = ({coords, currentWeatherData, hourlyForecastData, dailyForecastData}) => {
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