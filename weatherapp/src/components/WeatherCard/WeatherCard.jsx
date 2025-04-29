import React, {useState, useEffect} from 'react';
//===== assets =====//
import './WeatherCard.scss';
//===== components =====//
import CityInfo from '../CityInfo/CityInfo';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import DailyForecast from '../DailyForecast/DailyForecast';

const WeatherCard = () => {

  const [activeSection, setActiveSection] = useState('');
  const [isActiveMW, setIsActiveMW] = useState(false);

  return (
    <div className='WeatherCard'>
      <CityInfo />
      <HourlyForecast />
      <DailyForecast />
    </div>
  )
}

export default WeatherCard;