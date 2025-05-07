import React from 'react';
//===== redux =====//
import {useGetDailyForecstQuery} from '../../../features/weather/weatherApi';
//===== assets =====//
import './MWUVIndex.scss';
import { IoSunny as SunIcon } from "react-icons/io5";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWUVIndex = () => {

  const {
    data: dataUVIndex,
    isLoading: isUVIndexLoading,
    error: errorUVIndex
  } = useGetDailyForecstQuery('Moscow');

  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateFormatted = `${DayWeek(day)}, ${day} ${Month(month)} ${year}г.`

  console.log(dataUVIndex.forecast.forecastday);
  const currentHour = date.getHours();

  


  return (
    <div className='MWUVIndex'>
      
      <div className="MWUVIndex__header">
        <div className="MWUVIndex__icon-wrapper icon-wrapper"><SunIcon className='icon'/></div>
        <div className="MWUVIndex__title">УФ-индекс</div>
      </div>

      <div className="MWUVIndex__date-container">
        <div className="MWUVIndex__date">{dateFormatted}</div>
      </div>

    </div>
  )
}

export default MWUVIndex;