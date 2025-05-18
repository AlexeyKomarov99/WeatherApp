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
    data: hourlyForecastData, 
    isLoading: isForecastLoading, 
    error: forecastError
  } = useGetHourlyForecastQuery('Moscow');
  
  // Daily forecast data for name city (for 10 day)
  const {
    data: dailyForecastData,
    isLoading: isDailyForecastLoading,
    error: dailyForecastError
  } = useGetDailyForecstQuery('Moscow');

  const locationData = currentWeatherData?.location;
  const currentWeather = currentWeatherData?.current;
  const hourlyWeatherData = hourlyForecastData?.forecast?.forecastday;
  const dailyWeatherData = dailyForecastData?.forecast?.forecastday;

  return (
    <div className='WeatherCard'>
      <CityInfo
        locationData={locationData}
        currentWeather={currentWeather}
        hourlyWeatherData={hourlyWeatherData}
      />
      <HourlyForecast 
        dailyWeatherData={dailyWeatherData}
        onClick={() => toggleActiveSection('Hourly Forecast')}
      />
      <DailyForecast 
        dailyWeatherData={dailyWeatherData}
        onClick={() => toggleActiveSection('Daily Forecast')} 
      />
      <PrecipitationMap />

      <div className="WeatherCard__sections">
        <UVIndex 
          currentWeatherData={currentWeatherData}
          hourlyWeatherData={hourlyWeatherData}
          onClick={() => toggleActiveSection('UV Index')}
        />
        <Sunset
          hourlyWeatherData={hourlyWeatherData}
          onClick={() => toggleActiveSection('Sunset')}
        />
        <Wind
          dailyWeatherData={dailyWeatherData}
          onClick={() => toggleActiveSection('Wind')}
        />
        <Precipitation 
          hourlyWeatherData={hourlyWeatherData}
          onClick={() => toggleActiveSection('Precipitation')}
        />
        <FeelsLike
          currentWeatherData={currentWeatherData}
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
          currentWeatherData={currentWeatherData}
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