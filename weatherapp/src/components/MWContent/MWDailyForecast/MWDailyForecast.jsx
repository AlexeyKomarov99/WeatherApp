import React, {useState, useRef} from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectTemperatureUnits } from '../../../features/weather/weatherSelectors';
//===== assets =====//
import './MWDailyForecast.scss';
import { TbTemperature as TempNormIcon } from "react-icons/tb";
import { RxCross1 as CrossIcon } from "react-icons/rx";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MWDailyForecast = ({
  dailyWeatherData,
  selectedDateIndex,
  setSelectedDateIndex,
  handleClose
}) => {
  const chartSwiperRef = useRef(null);
  const temperatureUnits = useSelector(selectTemperatureUnits);
  const dailyForecastData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      minTemp_c: Math.round(day.day.mintemp_c),
      minTemp_f: Math.round(day.day.mintemp_f),
      maxTemp_c: Math.round(day.day.maxtemp_c),
      maxTemp_f: Math.round(day.day.maxtemp_f),
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          temp_c: Math.round(currentHour.temp_c),
          temp_f: Math.round(currentHour.temp_f),
        }
      })
    }
  });
  const selectedDayData = dailyForecastData[selectedDateIndex];

  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
    if(chartSwiperRef.current) {
      chartSwiperRef.current.slideTo(index);
    }
  };

  const handleChartSwipe = (swiper) => {
    setSelectedDateIndex(swiper.activeIndex);
  };

  const fullData = `
    ${DayWeek(selectedDayData.dayWeek).charAt(0).toUpperCase() + 
      DayWeek(selectedDayData.dayWeek).slice(1)}, 
    ${selectedDayData.date.split('-')[2]}
    ${Month(selectedDayData.dayWeek)}
    ${selectedDayData.date.split('-')[0]}
  `;

  return (
    <div 
      className='MWDailyForecast'
    >
      
      {/* Title */}
      <div className="MWDailyForecast__header">
        <div className="MWDailyForecast__icon-wrapper icon-wrapper"><TempNormIcon className='icon'/></div>
        <div className="MWDailyForecast__title">УФ-индекс</div>
        <div 
          className="MWDailyForecast__cross-icon-wrapper"
          onClick={handleClose}
        >
          <CrossIcon className='cross-icon' />
        </div>
      </div>

      {/* Swiper dates */}
      <Swiper
        initialSlide={selectedDateIndex}
        slidesPerView={7}
        className='Swiper__days'
      >
        {dailyForecastData.map((day, index) => (
          <SwiperSlide
            key={day.id}
            className={`Swiper__day-container`}
            onClick={() => handleDateClick(index)}
          >
            <div className="Swiper__day-week">{DayWeek(day.dayWeek).charAt(0)}</div>
            <div className={`Swiper__day-number ${index === selectedDateIndex ? 'active' : ''}`}>{day.date.split('-')[2]}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Full data */}
      <div className="MWDailyForecast__full-data">
        {fullData}
      </div>

      {/* Chart */}
      <div className="MWDailyForecast__chart">

        {/* 
          Тут нужно сделать шапку со значениями:
            1. UV
            2. Словесное определение значения UV
            3. Кнопка переключения между разделами в МО
        */}

        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWDailyForecast__swiper-chart'
        >
          {dailyForecastData.map((day, index) => (
            <SwiperSlide key={day.id} className='MWDailyForecast__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWDailyForecast__responsive-container'}>
                <LineChart data={day.hours}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#242323" />
                  <XAxis 
                    dataKey="hour" 
                    orientation="bottom"
                    tick={{dx: 10}}
                    ticks={['00', '06', '12', '18']}
                    interval={0}
                  />
                  <YAxis
                    orientation='right'
                    domain={[
                      (dataMin) => {
                        const minTemp = temperatureUnits === 'Celsius' 
                          ? Math.min(...day.hours.map(h => h.temp_c)) 
                          : Math.min(...day.hours.map(h => h.temp_f));
                        return Math.floor(minTemp - (temperatureUnits === 'Celsius' ? 5 : 10));
                      },
                      (dataMax) => {
                        const maxTemp = temperatureUnits === 'Celsius' 
                          ? Math.max(...day.hours.map(h => h.temp_c)) 
                          : Math.max(...day.hours.map(h => h.temp_f));
                        return Math.ceil(maxTemp + (temperatureUnits === 'Celsius' ? 5 : 10));
                      }
                    ]}
                    ticks={temperatureUnits === 'Celsius' 
                      ? Array.from({ length: 11 }, (_, i) => i * 5) 
                      : Array.from({ length: 11 }, (_, i) => 32 + i * 10)
                    }
                    tickFormatter={(value) => `${value}°${temperatureUnits === 'Celsius' ? 'C' : 'F'}`}
                    interval={0}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={`${temperatureUnits === 'Celsius' ? 'temp_c' : 'temp_f'}`} 
                    stroke="#ff7300" 
                    strokeWidth={2} 
                    name="Температура" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Descr forecast temperature */}
      <div className="MWDailyForecast__descr">
        <div className="MWDailyForecast__descr-title">Прогноз</div>
        <div className="MWDailyForecast__descr-text">Сегодня температура составляет от {temperatureUnits === 'Celsius' ? dailyForecastData[selectedDateIndex].minTemp_c : dailyForecastData[selectedDateIndex].minTemp_f}° до {temperatureUnits === 'Celsius' ? dailyForecastData[selectedDateIndex].maxTemp_c : dailyForecastData[selectedDateIndex].maxTemp_f}°.</div>
      </div>
      
    </div>
  )
}

export default MWDailyForecast;