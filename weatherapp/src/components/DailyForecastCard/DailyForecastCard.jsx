import React from 'react';
import './DailyForecastCard.scss';

const DailyForecastCard = ({ dailyForecast }) => {
  const date = new Date(dailyForecast.id * 1000).toDateString();
  const dateFormatted = date.split(' ')[0];

  const weatherIcon = dailyForecast.weatherIcon;
  const weatherDescr = dailyForecast.weatherDescr;
  
  const tempMin = Math.round(dailyForecast.tempMin);
  const tempMax = Math.round(dailyForecast.tempMax);

  // Получаем почасовые температуры (если есть)
  const hourlyTemps = dailyForecast.hours || [];

  // Рассчитываем позицию градиента
  const calculateGradientPosition = () => {
    if (hourlyTemps.length === 0) return 50; // По умолчанию по центру
    
    const minTemp = Math.min(...hourlyTemps);
    const maxTemp = Math.max(...hourlyTemps);
    
    const minIndex = hourlyTemps.indexOf(minTemp);
    const maxIndex = hourlyTemps.indexOf(maxTemp);
    
    // Чем раньше максимум, тем левее смещение
    return maxIndex <= 12 ? 30 : 70;
  };

  const gradientPosition = calculateGradientPosition();

  // Цвета градиента в зависимости от температуры
  const getGradientColors = () => {
    const avgTemp = (tempMin + tempMax) / 2;
    
    if (avgTemp <= 0) return ['#6EB4FF', '#1E5EB2']; // Холодно
    if (avgTemp <= 15) return ['#8CE0FF', '#4FA3F7']; // Прохладно
    if (avgTemp <= 25) return ['#FFD86E', '#FFA726']; // Тепло
    return ['#FF8C66', '#FF3B30']; // Жарко
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
        <span className="DailyForecastCard__temp-min">{tempMin}°</span>
        
        <div className="DailyForecastCard__gradient-wrapper">
          <div className="DailyForecastCard__gradient-bg"></div>
          <div className="DailyForecastCard__gradient-container">
            <div 
              className="DailyForecastCard__gradient-line"
              style={{
                background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
                width: `${Math.min(Math.abs(tempMax - tempMin) * 5, 100)}%`, // Ограничиваем ширину
                left: `${gradientPosition}%`,
                transform: 'translateX(-50%)',
                maxWidth: '100%' // Добавляем максимальную ширину
              }} 
            />
          </div>
        </div>
        
        <span className="DailyForecastCard__temp-max">{tempMax}°</span>
      </div>

      
    </div>
  );
};

export default DailyForecastCard;