import React from 'react';
//===== assets =====//
import './Pressure.scss';
import { IoMdSpeedometer as PressureIcon } from "react-icons/io";
//===== components =====//
import Barometer from './Barometer';

const Pressure = ({currentWeatherData, onClick}) => {

  const pressure = currentWeatherData ? Math.round(currentWeatherData?.current?.pressure_in * 25.4) : 0;

  return (
    <section 
      className='Pressure'
      onClick={onClick}
    >
      <div className="Pressure__container">

        <div className="Pressure__header">
          <span className="Pressure__icon-wrapper icon-wrapper"><PressureIcon className='' /></span>
          <span className="Pressure__name">Давление</span>
        </div>

        <div className="Pressure__barometer">
          <Barometer pressure={pressure} />
        </div>

      </div>
    </section>
  )
}

export default Pressure;