import React, {useState, useEffect} from 'react';
//===== redux =====//
import {useGetCurrentWeatherQuery} from '../../../features/weather/weatherApi';

//===== assets =====//
import './MWReportProblem.scss';
import {
  CURRENT_WEATHER_DATA,
  TEMPERATURE_DATA,
  WIND_DATA,
  OTHER_WEATHER_CONDITIONS_DATA
} from './data';

const MWReportProblem = () => {

  return (
    <div className='MWReportProblem'>
      
      <div className="MWReportProblem__header">
        <div className="MWReportProblem__cancel">Отменить</div>
        <div className="MWReportProblem__report-problem">Сообщить о проблеме</div>
        <div className="MWReportProblem__send">Отправить</div>
      </div>

      <div className="MWReportProblem__header-description">
        <div className="MWReportProblem__descr-body">
          Помогите улучшить приложение "Погода", сообщая о текущих погодных условиях там, где Вы находитесь.
        </div>
        <div className="MWReportProblem__descr-footer">
          Apple получит Ваш отзыв и геопозицию, но эта информация не связана с Вашим Apple ID.
        </div>
      </div>

      <div className="MWReportProblem__current-weather">
        <h3 className="MWReportProblem__section-title"></h3>
        <div className="MWReportProblem__current-weather-content">
          {}
        </div>
      </div>



    </div>
  )
}

export default MWReportProblem;