import React, {useState} from 'react';
//===== redux =====//
import {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
  useGetDailyForecstQuery
} from '../../features/weather/weatherApi';
//===== assets =====//
import './WeatherCard.scss';
//===== components =====//
import CityInfo from '../CityInfo/CityInfo';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import DailyForecast from '../DailyForecast/DailyForecast';
import PrecipitationMap from '../PrecipitationMap/PrecipitationMap';

import UVIndex from '../UVIndex/UVIndex';
import Sunset from '../Sunset/Sunset';
import Wind from '../Wind/Wind';
import Precipitation from '../Precipitation/Precipitation';
import FeelsLike from '../FeelsLike/FeelsLike';
import Humidity from '../Humidity/Humidity';
import Visibility from '../Visibility/Visibility';
import Pressure from '../Pressure/Pressure';
import ReportProblem from '../ReportProblem/ReportProblem';

const WeatherCard = () => {

  const [activeSection, setActiveSection] = useState('');
  const [isActiveMW, setIsActiveMW] = useState(false);
  
  // Current weather data for name city
  const {
    data: currentWeatherData, 
    isLoading: isCurrentLoading, 
    error: currentError
  } = useGetCurrentWeatherQuery('Moscow');
  
  // Hourly forecast data for name city (for 1 day)
  const {
    data: forecastData, 
    isLoading: isForecastLoading, 
    error: forecastError
  } = useGetHourlyForecastQuery('Moscow');
  
  // Daily forecast data for name city (for 10 day)
  const {
    data: dailyForecastData,
    isLoading: isDailyForecastLoading,
    error: dailyForecastLoading
  } = useGetDailyForecstQuery('Moscow');

  // Dubai
  // console.log('Прогноз погоды по названию города:\n', currentWeatherData);
  // console.log('Прогноз погоды по часам за 1 день:', forecastData);
  // console.log('Прогноз погоды на 10 дней', dailyForecastData);

  return (
    <div className='WeatherCard'>
      <CityInfo 
        currentWeatherData={currentWeatherData} 
      />
      <HourlyForecast 
        forecastData={forecastData}
      />
      <DailyForecast 
        dailyForecastData={dailyForecastData} 
      />
      <PrecipitationMap />

      <div className="test">
        <UVIndex 
          currentWeatherData={currentWeatherData}
        />
        <Sunset />
        <Wind />
        <Precipitation 
          forecastData={forecastData}
        />
        <FeelsLike />
        <Humidity />
        <Visibility />
        <Pressure />
      </div>
      
      <ReportProblem />
    </div>
  )
}

export default WeatherCard;