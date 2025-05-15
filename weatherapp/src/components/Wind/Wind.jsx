import React from 'react';
//===== assets =====//
import './Wind.scss';
import { FaWind as WindIcon } from "react-icons/fa6";
//===== components =====//
import Compass from './Compass';

const Wind = ({dailyWeatherData, onClick}) => {

  const todayWeatherData = dailyWeatherData ? dailyWeatherData[0] : null;
  console.log(todayWeatherData);

  // const windHourData = todayWeatherData?.hour.map((hour) => (
    // ))

  const windDegree = dailyWeatherData ? 'test' : null;
  const maxwind_kph = dailyWeatherData ? Math.round(dailyWeatherData[0]?.day?.maxwind_kph / 3.6) : null;
  // console.log(maxwind_kph)

  const now = new Date();
  const currentHour = now.getHours();



  return (
    <section
      className='Wind'
      onClick={onClick}
    >
      <div className="Wind__header">
        <span className="Wind__icon-wrapper icon-wrapper"><WindIcon className='' /></span>
        <span className="Wind__name">Заход солнца</span>
      </div>

      <Compass 
        // windDegree={dailyWindData[0].hours[0].wind_degree} 
        // windSpeed={dailyWindData[0].hours[0].wind_kph} 
        // windDir={dailyWindData[0].hours[0].wind_dir}
        // unit="metric"
      />

    </section>
  )
}

export default Wind;