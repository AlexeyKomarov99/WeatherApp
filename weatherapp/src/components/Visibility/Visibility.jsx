import React from 'react';
//===== assets =====//
import './Visibility.scss';
import { IoEye as EyeIcon } from "react-icons/io5";

const Visibility = ({currentWeatherData}) => {

  const vis_km = currentWeatherData?.current?.vis_km;
  const vis_miles = currentWeatherData?.current?.vis_miles;

  return (
    <section className='Visibility'>
      <div className="Visibility__header">
        <div className="Visibility__icon-wrapper icon-wrapper"><EyeIcon className='' /></div>
        <div className="Visibility__name">Видимость</div>
      </div>
      <div className="Visibility__content">
        <div className="Visibility__vis-km">{vis_km}км</div>
        <div className="Visibility__descr">temp temp</div>
      </div>
    </section>
  )
}

export default Visibility;