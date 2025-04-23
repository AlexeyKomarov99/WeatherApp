import React from 'react';
import { 
  useGetWeatherByCoordsQuery,
  useGetCurrentWeatherQuery 
} from '../../features/weather/weatherApi';
import './WeatherCard.scss';

const WeatherCard = ({ cityId, isHome = false }) => {
  const geoQuery = useGetWeatherByCoordsQuery(
    isHome ? getUserCoords() : { latitude: 0, longitude: 0 },
    { skip: !isHome }
  );
  
  const cityQuery = useGetCurrentWeatherQuery(cityId, {
    skip: isHome
  });

  const { data, error, isLoading } = isHome ? geoQuery : cityQuery;

  if (isLoading) return (
    <div className="weather-card loading">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return (
    <div className="weather-card error">
      <p>⚠️ Ошибка загрузки данных</p>
      <p>{error.message}</p>
    </div>
  );

  if (!data) return null;

  // Форматирование данных
  const weather = data.weather[0];
  const main = data.main;
  const wind = data.wind;
  const sys = data.sys;
  const visibility = data.visibility / 1000; // в километрах
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className={`weather-card ${weather.main.toLowerCase()}`}>
      <div className="card-header">
        <h2>{isHome ? `Мое местоположение: ${data.name}` : data.name}</h2>
        <span className="current-time">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <span className="temperature">{Math.round(main.temp)}°C</span>
          <span className="feels-like">Ощущается как {Math.round(main.feels_like)}°C</span>
        </div>
        <div className="weather-icon">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} 
            alt={weather.description}
          />
          <p className="weather-description">{weather.description}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-label">Влажность</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Давление</span>
            <span className="detail-value">{Math.round(main.pressure * 0.75)} мм рт.ст.</span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-label">Ветер</span>
            <span className="detail-value">
              {wind.speed} м/с, {getWindDirection(wind.deg)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Видимость</span>
            <span className="detail-value">{visibility.toFixed(1)} км</span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-label">Восход</span>
            <span className="detail-value">{sunrise}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Закат</span>
            <span className="detail-value">{sunset}</span>
          </div>
        </div>

        <div className="temp-minmax">
          <span>Мин: {Math.round(main.temp_min)}°C</span>
          <span>Макс: {Math.round(main.temp_max)}°C</span>
        </div>
      </div>
    </div>
  );
};

// Вспомогательные функции
const getUserCoords = () => {
  return { latitude: 55.7558, longitude: 37.6173 };
};

const getWindDirection = (degrees) => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  return directions[Math.round(degrees / 45) % 8];
};

export default WeatherCard;