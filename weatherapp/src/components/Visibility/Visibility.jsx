import React from 'react';
//===== assets =====//
import './Visibility.scss';
import { IoEye as EyeIcon } from "react-icons/io5";

const Visibility = ({currentWeatherData, onClick}) => {

  const vis_km = currentWeatherData?.current?.vis_km;
  const visibilityDescr = vis_km >= 10 ? 'Сейчас совершено ясно' : 'Сейчас плохая видимость';

  return (
    <section
      className='Visibility'
      onClick={onClick}
    >
      <div className="Visibility__container">

        <div className="Visibility__header">
          <div className="Visibility__icon-wrapper icon-wrapper"><EyeIcon className='' /></div>
          <div className="Visibility__name">Видимость</div>
        </div>

        <div className="Visibility__content">

          <div className="Visibility__content-top">
            <div className="Visibility__vis-km">{vis_km}км</div>
          </div>

          <div className="Visibility__content-bottom">
            <div className="Visibility__descr">{visibilityDescr}</div>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Visibility;