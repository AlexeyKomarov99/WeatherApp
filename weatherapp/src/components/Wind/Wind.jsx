import React from 'react';
//===== assets =====//
import './Wind.scss';
import { FaWind as WindIcon } from "react-icons/fa6";
//===== components =====//
import Compass from './Compass';

const Wind = ({dailyWeatherData, onClick}) => {
  const todayWeatherData = dailyWeatherData ? dailyWeatherData[0] : null;
  // console.log(todayWeatherData);
  const windHoursDataList = todayWeatherData?.hour.map((hour) => {
    return {
      wind_degree: hour.wind_degree,
      wind_dir: hour.wind_dir,
      wind_kph: hour.wind_kph,
      windchill_c: hour.windchill_c,
    }
  })
  // console.log(windHoursDataList);
  const now = new Date();
  const currentHour = now.getHours();
  // console.log(`Текущий час: ${currentHour}`);

  const currentWindData = dailyWeatherData ? windHoursDataList[currentHour-1] : null;
  // console.log(currentWindData);

  const windDegree = currentWindData?.wind_degree || 0;
  const windSpeed = currentWindData 
    ? `${Math.round(currentWindData.wind_kph / 3.6)} м/с` 
    : "0 м/с";

  return (
    <section
      className='Wind'
      onClick={onClick}
    >
      <div className="Wind__container">

        <div className="Wind__header">
          <span className="Wind__icon-wrapper icon-wrapper"><WindIcon className='' /></span>
          <span className="Wind__name">Ветер</span>
        </div>

        <div className="Wind__compass">
          <Compass
            radius={150} 
            markLength={15} 
            strokeWidth={1.5} 
            scale={0.375} 
            fontSize={28} 
            arrowAngle={windDegree}     // Передаём направление ветра
            windSpeed={windSpeed}       // Передаём скорость ветра
            innerCircleRadius={55} 
            arrowHeadSize={25}
            arrowEndCircleStrokeWidth={3}
            arrowWidth={8} 
            arrowEndCircleRadius={8}
          />
        </div>
        
      </div>

    </section>
  )
}

export default Wind;