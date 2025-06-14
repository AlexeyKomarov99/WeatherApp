import React, {useState, useEffect} from 'react';
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

const WeatherCard = ({
  currentWeatherData,
  hourlyForecastData, 
  dailyForecastData,
  isCurrentLocation,
  isFavorite,
}) => {

  const [activeSection, setActiveSection] = useState('');
  const [isActiveMW, setIsActiveMW] = useState(false);

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const toggleActiveSection = (current) => {
    setActiveSection(current);
    setIsActiveMW(true);
  }

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
        locationData={locationData}
        dailyWeatherData={dailyWeatherData}
        onClick={() => toggleActiveSection('Daily Forecast')}
      />
      <DailyForecast 
        dailyWeatherData={dailyWeatherData}
        onClick={() => toggleActiveSection('Daily Forecast')}
        setSelectedDateIndex={setSelectedDateIndex}
      />
      <PrecipitationMap 
        currentWeatherData={currentWeatherData}
      />

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
        currentWeatherData={currentWeatherData}
        hourlyForecastData={hourlyForecastData}
        dailyForecastData={dailyForecastData}
        selectedDateIndex={selectedDateIndex} // Для компонента MWDailyForecast
        setSelectedDateIndex={setSelectedDateIndex} // Для компонента MWDailyForecast
      />

    </div>
  )
}

export default WeatherCard;
