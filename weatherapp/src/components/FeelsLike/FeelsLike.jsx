import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectTemperatureUnits } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './FeelsLike.scss';
import { PiThermometerHotDuotone as FeelsLikeIcon } from "react-icons/pi";

const FeelsLike = ({currentWeatherData, onClick}) => {
  const temperatureUnits = useSelector(selectTemperatureUnits);
  const feelsLike_c = currentWeatherData ? Math.round(currentWeatherData?.current?.feelslike_c) : 0;
  const feelsLike_f = currentWeatherData ? Math.round(currentWeatherData?.current?.feelslike_f) : 0;
  const temperature_c = currentWeatherData ? Math.round(currentWeatherData?.current?.temp_c) : 0;
  const temperature_f = currentWeatherData ? Math.round(currentWeatherData?.current?.temp_f) : 0;
  
  const descrFeelsLike = () => {
    if (temperatureUnits === 'Celsius') {
      if (temperature_c > feelsLike_c) {
        return 'По ощущениям прохладнее из-за ветра';
      } else if (temperature_c === feelsLike_c) {
        return 'По ощущениям примерно также';
      } else {
        return 'По ощущениям теплее из-за влажности';
      }
    } else {
      if (temperature_f > feelsLike_f) {
        return 'По ощущениям прохладнее из-за ветра';
      } else if (temperature_f === feelsLike_f) {
        return 'По ощущениям примерно также';
      } else {
        return 'По ощущениям теплее из-за влажности';
      }
    }
  };

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
            <div className="FeelsLike__indicator">{temperatureUnits === 'Celsius' ? feelsLike_c : feelsLike_f}°</div>
          </div>

          <div className="FeelsLike__content-bottom">
            {descrFeelsLike()}
          </div>
        </div>

      </div>

    </section>
  )
}

export default FeelsLike;