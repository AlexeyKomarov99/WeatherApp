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
import ModalWindow from '../ModalWindow/ModalWindow';

const WeatherCard = () => {

  const [activeSection, setActiveSection] = useState('');
  const [isActiveMW, setIsActiveMW] = useState(false);

  const toggleActiveSection = (current) => {
    setActiveSection(current);
    console.log(`Active section: ${current}`);
    setIsActiveMW(true);
  }

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

  return (
    <div className='WeatherCard'>
      <CityInfo 
        currentWeatherData={currentWeatherData} 
      />
      <HourlyForecast 
        forecastData={forecastData}
        onClick={() => toggleActiveSection('Hourly Forecast')}
      />
      <DailyForecast 
        dailyForecastData={dailyForecastData}
        onClick={() => toggleActiveSection('Daily Forecast')} 
      />
      <PrecipitationMap />

      <div className="test">
        <UVIndex 
          currentWeatherData={currentWeatherData}
          onClick={() => toggleActiveSection('UV Index')}
        />
        <Sunset
          onClick={() => toggleActiveSection('Sunset')}
        />
        <Wind
          onClick={() => toggleActiveSection('Wind')}
        />
        <Precipitation 
          forecastData={forecastData}
          onClick={() => toggleActiveSection('Precipitation')}
        />
        <FeelsLike 
          onClick={() => toggleActiveSection('Feels Like')}
        />
        <Humidity 
          currentWeatherData={currentWeatherData}
          onClick={() => toggleActiveSection('Humidity')}
        />
        <Visibility 
          currentWeatherData={currentWeatherData}
          onClick={() => toggleActiveSection('Visibility')}
        />
        <Pressure 
          onClick={() => toggleActiveSection('Pressure')}
        />
      </div>
      
      <ReportProblem 
        onClick={() => toggleActiveSection('Report Problem')}
      />

      {/* Modal Window */}
      <ModalWindow 
        isActiveMW={isActiveMW}
        activeSection={activeSection}
        onClose={() => setIsActiveMW(false)}
      />

    </div>
  )
}

export default WeatherCard;