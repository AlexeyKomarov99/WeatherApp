import React from 'react';
//===== assets =====//
import './Precipitation.scss';
import { GiWaterDrop as WaterDropIcon } from "react-icons/gi";

const Precipitation = ({forecastData, onClick}) => {

  const precip_mm = forecastData?.current?.precip_mm;
  let precipPerDay = 0;
  const precipPerHour = 
    forecastData?.forecast?.forecastday[0]?.hour.forEach(hour => {
      precipPerDay += hour.precip_mm
  })
  const precipPerDayFormatted = Math.round(precipPerDay);
  
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
            <div className="Precipitation__indicator">{precipPerDayFormatted} мм</div>
            <div className="Precipitation__descr">За последние 24 часа</div>
          </div>

          <div className="Precipitation__content-bottom">
            <div className="Precipitation__descr-current">
              {precip_mm} мм ожидается в течение суток.
            </div>
          </div>
        </div>

      </div>
      
    </section>
  )
}

export default Precipitation;