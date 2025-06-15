import React from 'react';
//===== assets =====//
import './Precipitation.scss';
import { GiWaterDrop as WaterDropIcon } from "react-icons/gi";

const Precipitation = ({hourlyWeatherData, onClick}) => {
  
  const precipHourlyData = hourlyWeatherData ? hourlyWeatherData[0]?.hour?.map(currentHour => currentHour.precip_mm) : [];
  const precipByDay = Math.round(precipHourlyData.reduce((acc, precip) => acc + precip, 0));

  return (
    <section 
      className='Precipitation section-card'
      onClick={onClick}
    >
      <div className="Precipitation__container">

        <div className="Precipitation__header">
          <span className="Precipitation__wrapper icon-wrapper"><WaterDropIcon className=''/></span>
          <span className="Precipitation__name">Осадки</span>
        </div>

        <div className="Precipitation__content">
          <div className="Precipitation__content-top">
            <div className="Precipitation__indicator">{precipByDay} мм</div>
            <div className="Precipitation__descr">За последние 24 часа</div>
          </div>

          <div className="Precipitation__content-bottom">
            <div className="Precipitation__descr-current">
              {precipByDay} мм ожидается в течение суток.
            </div>
          </div>
        </div>

      </div>
      
    </section>
  )
}

export default Precipitation;