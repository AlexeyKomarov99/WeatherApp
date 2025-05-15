import React, {useState, useRef} from 'react';
//===== asses =====//
import './MWSunset.scss';
import { BsFillSunsetFill as SunsetIcon } from "react-icons/bs";
//===== components =====//
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MWSunset = ({hourlyWeatherData}) => {
  const sunrise = hourlyWeatherData?.sunrise;
  const sunset = hourlyWeatherData?.sunset;
  const moonrise = hourlyWeatherData.moonrise;
  const moonset = hourlyWeatherData.moonset;
  const moon_phase = hourlyWeatherData.moon_phase;
  const moon_illumination = hourlyWeatherData.moon_illumination;
  const is_moon_up = hourlyWeatherData.is_moon_up;
  const is_sun_up = hourlyWeatherData.is_sun_up;

  console.log(sunrise, sunset, moonrise, moonset);

  const sunDescr = [
    // {id: 1, title: 'Первые лучи', value: moonrise},
    {id: 2, title: 'Восход солнца', value: sunrise},
    {id: 3, title: 'Заход солнца', value: sunset},
    {id: 4, title: 'Последние лучи', value: moonset}
  ]

  return (
    <div className='MWSunset'>

      {/* Title */}
      <div className="MWSunset__header">
        <div className="MWSunset__icon-wrapper icon-wrapper"><SunsetIcon className='icon'/></div>
        <div className="MWSunset__title">Заход солнца</div>
      </div>

      {/* Chart */}
      <LineChart>

      </LineChart>

      {/* Descr */}
      <div className="MWSunset__Sun-descr">
        {sunDescr.map((descr) => (
          <div 
            key={descr.id}
            className="MWSunset__descr-item"
          >
            <div className="MWSunset__descr-title">{descr.title}</div>
            <div className="MWSunset__descr-value">{descr.value}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MWSunset;