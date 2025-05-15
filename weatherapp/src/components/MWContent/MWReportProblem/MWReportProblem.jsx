import React, {useState, useEffect} from 'react';
//===== assets =====//
import './MWReportProblem.scss';
import { MdDone as DoneIcon } from "react-icons/md";
import {
  CURRENT_WEATHER_DATA,
  TEMPERATURE_DATA,
  WIND_DATA,
  OTHER_WEATHER_CONDITIONS_DATA,
  FEELING_DESCR,
  TEMPERATURE_DESCR,
  ATMOSPHERE_DESCR,
  WIND__DESCR
} from './data';

const MWReportProblem = () => {

  const [weatherData, setWeatherData] = useState(CURRENT_WEATHER_DATA);
  const [tempData, setTempData] = useState(TEMPERATURE_DATA);
  const [windData, setWindData] = useState(WIND_DATA);
  const [otherData, setOtherData] = useState(OTHER_WEATHER_CONDITIONS_DATA);
  const [feeling, setFeeling] = useState(FEELING_DESCR);
  const [temperature, setTemperature] = useState(TEMPERATURE_DESCR);
  const [atmosphere, setAtmosphere] = useState(ATMOSPHERE_DESCR);
  const [wind, setWind] = useState(WIND__DESCR);

  const toggleShowDetail = (id) => {
    setWeatherData(prevState => 
      prevState.map(item => 
        item.id === id 
        ? {...item, status: !item.status}
        : item
      )
    )
  };
  const toggleWeatherStatus = (weatherId, detailId) => {
    setWeatherData(prevState =>
      prevState.map(weatherItem => {
        if (weatherItem.id !== weatherId) {
          return weatherItem; // Не изменяем другие разделы
        }
        
        return {
          ...weatherItem,
          detail: weatherItem.detail?.map(detail => ({
            ...detail,
            status: detail.id === detailId // Включаем только выбранный пункт в этом разделе
          })) || []
        };
      })
    );
  }

  const toggleTempStatus = (id) => {
    setTempData(prevState =>
      prevState.map(temp => ({
        ...temp,
        status: temp.id === id
      }))
    )
  }
  const toggleWindStatus = (id) => {
    setWindData(prevState =>
      prevState.map(wind => ({
        ...wind,
        status: wind.id === id
      }))
    )
  }
  const toggleOtherDataStatus = (id) => {
    setOtherData(prevState =>
      prevState.map(weather =>
        weather.id === id
        ? {...weather, status: !weather.status}
        : weather
      )
    )
  }
  const toggleFeelingStatus = (id) => {
    setFeeling(prevState =>
      prevState.map(feeling => ({
        ...feeling,
        status: feeling.id === id
      }))
    )
  }
  const toggleTemperatureStatus = (id) => {
    setTemperature(prevState =>
      prevState.map(temp => ({
        ...temp,
        status: temp.id === id
      }))
    )
  }
  const toggleAtmosphereStatus = (id) => {
    setAtmosphere(prevState =>
      prevState.map(atmos => ({
        ...atmos,
        status: atmos.id === id
      }))
    )
  }
  const toggleWindDescrStatus = (id) => {
    setWind(prevState =>
      prevState.map(wind => ({
        ...wind,
        status: wind.id === id
      }))
    )
  }

  return (
    <div className='MWReportProblem'>
      
      <div className="MWReportProblem__header">
        <div 
          className="MWReportProblem__cancel"
        >
          Отменить
        </div>
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

      {/* weather data */}
      <div className="MWReportProblem__weather-section">
        <div className="MWReportProblem__weather-title">Текущие погодные условия</div>
        <div className="MWReportProblem__weather-content section">
          {weatherData.map((current_weather) => (
            <div key={current_weather.id}>
              <div 
                className="MWReportProblem__content-item"
              >
                <div className="MWReportProblem__content-left">
                  <div className="MWReportProblem__icon-wrapper icon-wrapper">{current_weather.icon}</div>
                </div>

                <div className="MWReportProblem__content-right">

                  <div className="MWReportProblem__content-name">{current_weather.name}</div>

                  <div 
                    className={`MWReportProblem__togglebar-wrapper ${current_weather.status ? 'togglebar-wrapper-active' : ''}`}
                    onClick={() => toggleShowDetail(current_weather.id)}
                  >
                    <div className={`MWReportProblem__circle ${current_weather.status ? 'togglebar-circle-active' : ''}`}></div>
                  </div>

                </div>

              </div>

              {current_weather.status && (
                <div className="MWReportProblem__content-detail">
                  {current_weather.detail.map((detail) => (
                    <div 
                      key={detail.id}
                      className="MWReportProblem__detail-item"
                      onClick={() => toggleWeatherStatus(current_weather.id, detail.id)}
                    >
                      <div className="MWReportProblem__detail-name">{detail.name}</div>

                      <div className="MWReportProblem__icon-wrapper icon-wrapper">
                        {detail.status ? <DoneIcon className="MWReportProblem__icon icon" /> : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* temperature */}
      <div className="MWReportProblem__section">
        <div className="MWReportProblem__section-title">Температура</div>
        <div className="MWReportProblem__content section">
          {tempData.map((current_temp) => (
            <div
              key={current_temp.id}
              className="MWReportProblem__content-item temperature-item"
              onClick={() => toggleTempStatus(current_temp.id)}
          >
            <div className="MWReportProblem__content-left">
              <div className="MWReportProblem__icon-wrapper icon-wrapper">{current_temp.icon}</div>
            </div>

            <div className="MWReportProblem__content-right">
              <div className="MWReportProblem__content-name">{current_temp.name}</div>

              <div className="MWReportProblem__icon-wrapper icon-wrapper">
                {current_temp.status ? <DoneIcon className="MWReportProblem__icon icon" /> : ''}
              </div>

            </div>
          </div>
          ))}
        </div>
      </div>
      
      {/* wind */}
      <div className="MWReportProblem__section">
        <div className="MWReportProblem__section-title">Ветер</div>
        <div className="MWReportProblem__content section">
          {windData.map((current_wind) => (
            <div
                  key={current_wind.id}
                  className="MWReportProblem__content-item temperature-item"
                  onClick={() => toggleWindStatus(current_wind.id)}
              >
                <div className="MWReportProblem__content-left">
                  <div className="MWReportProblem__icon-wrapper icon-wrapper">{current_wind.icon}</div>
                </div>

                <div className="MWReportProblem__content-right">
                  <div className="MWReportProblem__content-name">{current_wind.name}</div>

                  <div className="MWReportProblem__icon-wrapper icon-wrapper">
                    {current_wind.status ? <DoneIcon className="MWReportProblem__icon icon" /> : ''}
                  </div>

                </div>
              </div>
          ))}
        </div>
      </div>
      
      {/* other weather conditios */}
      <div className="MWReportProblem__section">
        <div className="MWReportProblem__section-title">Другие погодные условия</div>
        <div className="MWReportProblem__content section">
          {otherData.map((current_data) => (
              <div
                    key={current_data.id}
                    className="MWReportProblem__content-item temperature-item"
                    onClick={() => toggleOtherDataStatus(current_data.id)}
                >
                  <div className="MWReportProblem__content-left">
                    <div className="MWReportProblem__icon-wrapper icon-wrapper">{current_data.icon}</div>
                  </div>

                  <div className="MWReportProblem__content-right">
                    <div className="MWReportProblem__content-name">{current_data.name}</div>

                    <div className="MWReportProblem__icon-wrapper icon-wrapper">
                      {current_data.status ? <DoneIcon className="MWReportProblem__icon icon" /> : ''}
                    </div>

                  </div>
                </div>
            ))}
        </div>
      </div>
      
      {/* descriptions */}
      <div className="MWReportProblem__description">
        <div className="MWReportProblem__section-title">Описание</div>
        <div className="MWReportProblem__content">
          
          <div className="MWReportProblem__feeling-container">
            {feeling.map((current_feeling) => (
              <div 
                key={current_feeling.id}  
                className={`MWReportProblem__item ${current_feeling.status ? 'active-item' : ''}`}
                onClick={() => toggleFeelingStatus(current_feeling.id)}
              >
                {current_feeling.name}
              </div>
            ))}
          </div>
          
          <div className="MWReportProblem__temp-container">
            {temperature.map((current_temp) => (
              <div 
                  key={current_temp.id}  
                  className={`MWReportProblem__item ${current_temp.status ? 'active-item' : ''}`}
                  onClick={() => toggleTemperatureStatus(current_temp.id)}
                >
                  {current_temp.name}
                </div>
            ))}
          </div>

          <div className="MWReportProblem__atmosphere-container">
            {atmosphere.map((current_atmosp) => (
              <div 
                  key={current_atmosp.id}  
                  className={`MWReportProblem__item ${current_atmosp.status ? 'active-item' : ''}`}
                  onClick={() => toggleAtmosphereStatus(current_atmosp.id)}
                >
                  {current_atmosp.name}
                </div>
            ))}
          </div>

          <div className="MWReportProblem__wind-container">
            {wind.map((current_wind) => (
              <div 
                  key={current_wind.id}  
                  className={`MWReportProblem__item ${current_wind.status ? 'active-item' : ''}`}
                  onClick={() => toggleWindDescrStatus(current_wind.id)}
                >
                  {current_wind.name}
                </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* footer descr */}
      <div className="MWReportProblem__footer">
        Чтобы поделиться мнением о приложении "Погода", <a className='MWReportProblem__link' href='https://www.apple.com/feedback/weather/'>оставьте отзыв онлайн</a>.
      </div>

    </div>
  )
}

export default MWReportProblem;