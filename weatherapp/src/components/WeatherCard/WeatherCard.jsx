import React, {useState} from 'react';
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

  return (
    <div className='WeatherCard'>
      <CityInfo />
      <HourlyForecast />
      <DailyForecast />
      <PrecipitationMap />

      <div className="test">
        <UVIndex />
        <Sunset />
        <Wind />
        <Precipitation />
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