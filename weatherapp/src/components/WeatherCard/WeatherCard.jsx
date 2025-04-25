import React from 'react';
//===== redux =====//
import { useGetCurrentWeatherQuery } from '../../features/weather/weatherApi';

const WeatherCard = () => {
  
  const {data, isLoading, error } = useGetCurrentWeatherQuery('Moscow');
  
  return (
    <section>
      
    </section>
  )
}

export default WeatherCard;
