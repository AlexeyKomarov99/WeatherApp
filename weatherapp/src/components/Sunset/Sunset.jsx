import React from 'react';
//===== assets =====//
import './Sunset.scss';
import { BsFillSunsetFill as SunsetIcon } from "react-icons/bs";
//===== components =====//
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Dot 
} from 'recharts';

const Sunset = ({hourlyWeatherData, onClick}) => {

  // console.log(hourlyWeatherData);

  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
      return (hours + 12) + (minutes / 60);
    }
    if (period === 'AM' && hours === 12) {
      return 0 + (minutes / 60);
    }

    return hours + (minutes / 60);
  };

  const sunrise = hourlyWeatherData?.[0]?.astro?.sunrise;
  const sunset = hourlyWeatherData?.[0]?.astro?.sunset;
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const sunriseHour = sunrise ? parseTime(sunrise) : null;
  const sunsetHour = sunset ? parseTime(sunset) : null;
  // console.log(sunriseValue);
  // console.log(sunsetValue);

  const sunsetFormatted = (hourlyWeatherData?.[0]?.astro?.sunset.split(' ')[0]);
  const sunsetHourFormatted = sunsetFormatted ? Number(sunsetFormatted.split(':')[0]) + 12 : null;
  const sunsetFullTimeFormatted = sunsetHourFormatted ? `${sunsetHourFormatted}:${sunsetFormatted.split(':')[1]}` : null;
  // console.log(sunsetFullTimeFormatted);

  const sunriseFormatted = hourlyWeatherData?.[0]?.astro?.sunrise.split(' ')[0];

  // Функция для расчета положения графика
  const calculateY = (x) => {
    if (!sunriseHour || !sunsetHour) return 0;
    
    // Ночь до восхода
    if (x < sunriseHour) return -1;
    // День
    if (x >= sunriseHour && x <= sunsetHour) {
      // Параболическая форма для дневного периода
      const noon = (sunriseHour + sunsetHour) / 2;
      const a = -4 / Math.pow(sunsetHour - sunriseHour, 2);
      return a * Math.pow(x - noon, 2) + 1;
    }
    // Ночь после заката
    return -1;
  };

  // Генерация данных для графика
  const generateData = () => {
    const data = [];
    // Ночь до восхода
    for (let x = 0; x < sunriseHour; x += 0.5) {
      data.push({ x, y: calculateY(x) });
    }
    // День
    for (let x = sunriseHour; x <= sunsetHour; x += 0.5) {
      data.push({ x, y: calculateY(x) });
    }
    // Ночь после заката
    for (let x = sunsetHour + 0.5; x <= 24; x += 0.5) {
      data.push({ x, y: calculateY(x) });
    }
    return data;
  };

  const data = generateData();

  // Получаем координаты для точки текущего времени
  const currentDataPoint = {
    x: currentHour,
    y: calculateY(currentHour)
  };

  return (
    <section 
      className='Sunset'
      onClick={onClick}
    >
      <div className="Sunset__header">
        <span className="Sunset__icon-wrapper icon-wrapper"><SunsetIcon className='' /></span>
        <span className="Sunset__name">Заход солнца</span>
      </div>
      
      <div className="Sunset__sunset-time">
        {sunsetFullTimeFormatted}
      </div>

      <div className="Sunset__chart">
        <ResponsiveContainer width="100%" height={70}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFA500" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#1a1a2e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#1a1a2e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            {/* Горизонтальная линия y=0 */}
            <ReferenceLine y={0} stroke="#666" strokeWidth={1} />
            
            {/* Точка текущего времени */}
            <Dot
              cx={`${(currentHour * 100 / 24)}%`}
              cy={`${(1 - (currentDataPoint.y + 1) / 2) * 100}%`}
              r={5}
              fill="#fff"
              stroke="#FFA500"
              strokeWidth={2}
            />
            
            <XAxis 
              dataKey="x"
              tickFormatter={(value) => {
                if (value === 0) return '12 AM';
                if (value === 6) return '6 AM';
                if (value === 12) return '12 PM';
                if (value === 18) return '6 PM';
                if (value === 24) return '12 AM';
                return '';
              }}
              tick={{ fill: '#fff', fontSize: 10 }}
            />
            <YAxis hide domain={[-1, 1]} />
            
            {/* Дневная область */}
            <Area 
              type="monotone" 
              dataKey="y" 
              stroke="#FFA500"
              strokeWidth={2}
              fillOpacity={0.8} 
              fill="url(#colorDay)" 
              activeDot={{ r: 6 }}
            />
            
            {/* Ночная область (ниже линии) */}
            <Area 
              type="monotone" 
              dataKey={(data) => data.y < 0 ? data.y : -1}
              stroke="#1a1a2e"
              strokeWidth={1}
              fillOpacity={0.5} 
              fill="url(#colorNight)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="Sunset__descr">
        Восход: {sunriseFormatted}
      </div>

    </section>
  )
}

export default Sunset;