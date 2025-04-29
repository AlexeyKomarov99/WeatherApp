import React from 'react';
//===== redux =====//
import { 
  useGetCurrentWeatherQuery,
  useGetAirPollutionQuery
} from '../../features/weather/weatherApi';



const WeatherCard = () => {
  
  const {
    data: dataCurrentWeather, 
    isLoading: loadingCurrentWeather, 
    error: errorCurrentWeather,
  } = useGetCurrentWeatherQuery('Moscow');

  console.log(dataCurrentWeather);

  const {
    data: dataAirPollution,
    isLoading: loadingAirPollution,
    error: errorAirPollution
  } = useGetAirPollutionQuery();

  console.log(dataAirPollution);

  return (
    <section>
      
    </section>
  )
}

export default WeatherCard;
