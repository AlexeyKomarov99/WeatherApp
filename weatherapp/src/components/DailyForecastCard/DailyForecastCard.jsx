import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectTemperatureUnits } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './DailyForecastCard.scss';

const DailyForecastCard = ({ dailyForecast }) => {
  const date = new Date(dailyForecast.id * 1000).toDateString();
  const dateFormatted = date.split(' ')[0];
  const temperatureUnits = useSelector(selectTemperatureUnits);

  const weatherIcon = dailyForecast.weatherIcon;
  const weatherDescr = dailyForecast.weatherDescr;
  
  const tempMin_c = Math.round(dailyForecast.tempMin_c);
  const tempMin_f = Math.round(dailyForecast.tempMin_f);

  const tempMax_c = Math.round(dailyForecast.tempMax_c);
  const tempMax_f = Math.round(dailyForecast.tempMax_f);

  // Получаем почасовые температуры (если есть)
  const hourlyTemps_c = dailyForecast.hours_c || [];
  const hourlyTemps_f = dailyForecast.hours_f || [];

  // Рассчитываем позицию градиента
  const calculateGradientPosition = () => {
    if (temperatureUnits === 'Celsius' ? hourlyTemps_c.length === 0 : hourlyTemps_f.length === 0) return 50; // По умолчанию по центру
    
    const minTemp = Math.min(temperatureUnits === 'Celsius' ? [...hourlyTemps_c] : [...hourlyTemps_f]);
    const maxTemp = Math.max(temperatureUnits === 'Celsius' ? [...hourlyTemps_c] : [...hourlyTemps_f]);
    
    const minIndex = temperatureUnits === 'Celsius' ? hourlyTemps_c.indexOf(minTemp) : hourlyTemps_f.indexOf(minTemp);
    const maxIndex = temperatureUnits === 'Celsius' ? hourlyTemps_c.indexOf(maxTemp) : hourlyTemps_f.indexOf(maxTemp);
    
    // Чем раньше максимум, тем левее смещение
    return maxIndex <= 12 ? 30 : 70;
  };

  const gradientPosition = calculateGradientPosition();

  // Цвета градиента в зависимости от температуры
  const getGradientColors = () => {
    const avgTemp = (temperatureUnits === 'Celsius' ? (tempMin_c + tempMax_c) : (tempMin_f + tempMax_f)) / 2;
    
    // Константы для температурных границ
    const COLD_C = 0;
    const COOL_C = 15;
    const WARM_C = 25;
    
    const COLD_F = 32;    // 0°C = 32°F
    const COOL_F = 59;    // 15°C = 59°F
    const WARM_F = 77;    // 25°C = 77°F
    
    if (temperatureUnits === 'Celsius') {
      if (avgTemp <= COLD_C) return ['#6EB4FF', '#1E5EB2'];
      if (avgTemp <= COOL_C) return ['#8CE0FF', '#4FA3F7'];
      if (avgTemp <= WARM_C) return ['#FFD86E', '#FFA726'];
      return ['#FF8C66', '#FF3B30'];
    } else {
      if (avgTemp <= COLD_F) return ['#6EB4FF', '#1E5EB2'];
      if (avgTemp <= COOL_F) return ['#8CE0FF', '#4FA3F7'];
      if (avgTemp <= WARM_F) return ['#FFD86E', '#FFA726'];
      return ['#FF8C66', '#FF3B30'];
    }
  };

  const [gradientStart, gradientEnd] = getGradientColors();

  return (
    <div className='DailyForecastCard'>
      
      <span className="DailyForecastCard__day-week">{dateFormatted}</span>
      
      <div className="DailyForecastCard__icon icon-weather-wrapper">
        <img
          className='icon-weather'
          src={weatherIcon} 
          alt={weatherDescr} 
        />
      </div>
      
      <div className="DailyForecastCard__content-right">
        <span className="DailyForecastCard__temp-min">{temperatureUnits === 'Celsius' ? tempMin_c : tempMin_f}°</span>
        
        <div className="DailyForecastCard__gradient-wrapper">
          <div className="DailyForecastCard__gradient-bg"></div>
          <div className="DailyForecastCard__gradient-container">
            <div className="DailyForecastCard__gradient-line"
              style={{
                background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
                width: `${Math.min(
                  Math.abs(temperatureUnits === 'Celsius' 
                    ? (tempMax_c - tempMin_c) * 5 
                    : (tempMax_f - tempMin_f) * 3), // Меньший множитель для Фаренгейтов
                  100
                )}%`,
                left: `${gradientPosition}%`,
                transform: 'translateX(-50%)',
                maxWidth: '100%'
              }} 
            />
          </div>
        </div>
        
        <span className="DailyForecastCard__temp-max">{temperatureUnits === 'Celsius' ? tempMax_c : tempMax_f}°</span>
      </div>

      
    </div>
  );
};

export default DailyForecastCard;