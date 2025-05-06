import React from 'react';
//===== assets =====//
import './Humidity.scss';
import { FaCloudRain as CloudRainIcon } from "react-icons/fa";

const Humidity = ({currentWeatherData, onClick}) => {

  const humidityPercent = currentWeatherData?.current?.humidity;
  const dewPoint = currentWeatherData?.current?.dewpoint_c;

  return (
    <section 
      className='Humidity'
      onClick={onClick}
    >
      <div className="Humidity__header">
        <div className="Humidity__icon-wrapper icon-wrapper"><CloudRainIcon className='' /></div>
        <div className="Humidity__name">Влажность</div>
      </div>
      <div className="Humidity__content">
        <div className="Humidity__humidity-percent">{humidityPercent}%</div>
        <div className="Humidity__dew-point">Точка росы сейчас: {dewPoint}°</div>
      </div>
    </section>
  )
}

export default Humidity;