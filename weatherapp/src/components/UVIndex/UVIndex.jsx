import React from 'react';
//===== assets =====//
import './UVIndex.scss';
import { IoSunny as SunIcon } from "react-icons/io5";

const UVIndex = ({currentWeatherData, hourlyWeatherData, onClick}) => {
  const uvValue = Number(currentWeatherData?.current?.uv) || 0;
  const indexUV = Math.round(uvValue);

  const UVIndexDailyData = hourlyWeatherData ? hourlyWeatherData[0].hour.map((hour) => Math.round(hour.uv)) : [];
  const UVIndexLeftBorder = UVIndexDailyData.findIndex(number => number === 3);
  const UVIndexRightBorder = UVIndexDailyData.findLastIndex(number => number === 3);

  const indexUVDescrText = `Защищайтесь от солнца с ${UVIndexLeftBorder + 1}:00 до ${UVIndexRightBorder + 1}:00`;

  // console.log(UVIndexDailyData)
  // console.log(UVIndexLeftBorder, UVIndexRightBorder);

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
      <div className="UVIndex__container">

        <div className="UVIndex__header">
          <span className="UVIndex__icon-wrapper icon-wrapper"><SunIcon className='' /></span>
          <span className="UVIndex__name">уф-индекс</span>
        </div>

        <div className="UVIndex__content">

          <div className="UVIndex__content-top">
            <div className="UVIndex__index">{isNaN(indexUV) ? '-' : indexUV}</div>
            <div className="UVIndex__index-descr">{indexUVDescr}</div>
            <div className="UVIndex__line">
              <div 
                className="UVIndex__circle"
                style={{
                  left: `${isNaN(indexUV) ? 0 : (indexUV*9.09)}%`
                }}
              >
              </div>
            </div>
          </div>

          <div className="UVIndex__content-bottom">
            <div className="UVIndex__descr-current">{indexUVDescrText}</div>
          </div>

        </div>

      </div>
      
    </section>
  )
}

export default UVIndex;