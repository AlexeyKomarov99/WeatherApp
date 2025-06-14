import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectTemperatureUnits } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './Humidity.scss';
import { FaCloudRain as CloudRainIcon } from "react-icons/fa";

const Humidity = ({currentWeatherData, onClick}) => {

  const humidityPercent = currentWeatherData?.current?.humidity;
  const temperatureUnits = useSelector(selectTemperatureUnits);
  const dewPoint_c = currentWeatherData?.current?.dewpoint_c;
  const dewPoint_f = currentWeatherData?.current?.dewpoint_f;

  return (
    <section 
      className='Humidity'
      onClick={onClick}
    >
      <div className="Humidity__container">

        <div className="Humidity__header">
          <div className="Humidity__icon-wrapper icon-wrapper"><CloudRainIcon className='' /></div>
          <div className="Humidity__name">Влажность</div>
        </div>

        <div className="Humidity__content">

          <div className="Humidity__content-top">
            <div className="Humidity__humidity-percent">{humidityPercent}%</div>
          </div>

          <div className="Humidity__content-bottom">
            <div className="Humidity__dew-point">Точка росы <br /> сейчас: {temperatureUnits === 'Celsius' ? dewPoint_c : dewPoint_f}°</div>
          </div>
          
        </div>

      </div>
    </section>
  )
}

export default Humidity;