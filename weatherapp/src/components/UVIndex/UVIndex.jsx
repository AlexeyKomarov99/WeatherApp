import React from 'react';
//===== assets =====//
import './UVIndex.scss';
import { IoSunny as SunIcon } from "react-icons/io5";

const UVIndex = ({currentWeatherData, onClick}) => {

  const indexUV = Math.round(currentWeatherData?.current?.uv);
  const indexUVDescr = indexUV <= 2 ? 'Низкий' :
    (indexUV <= 5) ? 'Умеренный' :
    (indexUV <= 7) ? 'Высокий' :
    (indexUV <= 10) ? 'Очень высокий' :
    (indexUV >= 11) ? 'Экстремальный' : '-';

  return (
    <section
      className='UVIndex'
      onClick={onClick}
    >
      <div className="UVIndex__header">
        <span className="UVIndex__icon-wrapper icon-wrapper"><SunIcon className='' /></span>
        <span className="UVIndex__name">уф-индекс</span>
      </div>
      <div className="UVIndex__index">{indexUV}</div>
      <div className="UVIndex__index-descr">{indexUVDescr}</div>
      <div className="UVIndex__line">
        <div 
          className="UVIndex__circle"
          style={{
            left: `${(indexUV*9.09)}%`
          }}
        >
        </div>
      </div>
      <div className="UVIndex__descr">temp temp</div>
    </section>
  )
}

export default UVIndex;