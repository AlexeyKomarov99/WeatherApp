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

  const [formData, setFormData] = useState([]);
  const toggleShowDetail = (id) => {
    console.log('detail weather data', id);
  }

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

      <div className="MWReportProblem__section">
        <div className="MWReportProblem__section-title">Текущие погодные условия</div>
        <div className="MWReportProblem__content section">
          {CURRENT_WEATHER_DATA.map((current_weather) => (
            <div
              key={current_weather.id}
              className="MWReportProblem__content-item"
              onClick={() => toggleShowDetail(current_weather.id)}
            >
              <div className="MWReportProblem__content-left">
                <div className="MWReportProblem__icon-wrapper icon-weather-wrapper">{current_weather.icon}</div>
              </div>
              <div className="MWReportProblem__content-right">
                <div className="MWReportProblem__content-name">{current_weather.name}</div>

                <div className="MWReportProblem__togglebar-wrapper">
                  <div className="MWReportProblem__circle"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
  )
}

export default MWReportProblem;