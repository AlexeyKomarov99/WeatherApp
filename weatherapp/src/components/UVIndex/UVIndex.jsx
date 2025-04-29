import React from 'react';
//===== assets =====//
import './UVIndex.scss';
import { IoSunny as SunIcon } from "react-icons/io5";

const UVIndex = ({currentWeatherData}) => {

  console.log(currentWeatherData);

  const indexUV = currentWeatherData?.current?.uv;
  

  console.log(indexUV);

  return (
    <section className='UVIndex'>
      <div className="UVIndex__header">
        <span className="UVIndex__icon-wrapper icon-wrapper"><SunIcon className='' /></span>
        <span className="UVIndex__name">уф-индекс</span>
      </div>

    </section>
  )
}

export default UVIndex;