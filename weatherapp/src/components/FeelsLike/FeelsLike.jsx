import React from 'react';
//===== assets =====//
import './FeelsLike.scss';
import { PiThermometerHotDuotone as FeelsLikeIcon } from "react-icons/pi";

const FeelsLike = ({currentWeatherData, onClick}) => {

  const feelsLike = currentWeatherData ? Math.round(currentWeatherData?.current?.feelslike_c) : 0;
  const temperature = currentWeatherData ? Math.round(currentWeatherData?.current?.temp_c) : 0;
  
  const descrFeelsLike = (temperature > feelsLike) 
    ? 'По ощущениям прохладнее из-за ветра'
    : (temperature === feelsLike) 
      ? 'По ощущениям примерно также'
      : 'По ощущениям теплее из-за влажности';

  return (
    <section
      className='FeelsLike'
      onClick={onClick}
    >
      <div className="FeelsLike__container">

        <div className="FeelsLike__header">
          <span className="FeelsLike__wrapper icon-wrapper"><FeelsLikeIcon className=''/></span>
          <span className="FeelsLike__name">Ощущается как</span>
        </div>

        <div className="FeelsLike__content">
          <div className="FeelsLike__content-top">
            <div className="FeelsLike__indicator">{feelsLike}°</div>
          </div>

          <div className="FeelsLike__content-bottom">
            {descrFeelsLike}
          </div>
        </div>

      </div>

    </section>
  )
}

export default FeelsLike;