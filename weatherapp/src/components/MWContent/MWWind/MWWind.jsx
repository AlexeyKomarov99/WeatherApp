import React, {useState, useRef} from 'react';
//===== asses =====//
import './MWWind.scss';
import { FaWind as WindIcon } from "react-icons/fa6";
import { RxCross1 as CrossIcon } from "react-icons/rx";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWWind = ({
  dailyWeatherData,
  handleClose,
}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  const dailyWindData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      maxwind_kph: day.day.maxwind_kph,
      maxwind_mph: day.day.maxwind_mph,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          gust_kph: Math.round(currentHour.gust_kph / 3.6),
          gust_mph: currentHour.gust_mph,
          wind_kph: Math.round(currentHour.wind_kph / 3.6),
          wind_mph: currentHour.wind_mph,
          windchill_c: currentHour.windchill_c,
          windchill_f: currentHour.windchill_f,
          wind_degree: currentHour.wind_degree,
          wind_dir: currentHour.wind_dir
        }
      })
    }
  })
  const selectedDayData = dailyWindData[selectedDateIndex];
  
  const handleDateClick = (index) => {
  setSelectedDateIndex(index);
    if(chartSwiperRef.current) {
      chartSwiperRef.current.slideTo(index);
    }
  }

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

  const windSpeedList = dailyWindData[selectedDateIndex].hours.map(windSpeed => windSpeed.wind_kph);
  const gustWindSpeedList = dailyWindData[selectedDateIndex].hours.map(gustWind => gustWind.gust_kph);
  const minWindSpeed = Math.round(Math.min(...windSpeedList));
  const maxWindSpeed = Math.round(Math.max(...windSpeedList));
  const maxGustWindSpeed = Math.round(Math.max(...gustWindSpeedList));  

  return (
    <div className='MWWind'>
      
      {/* Title */}
      <div className="MWWind__header">
        <div className="MWWind__icon-wrapper icon-wrapper"><WindIcon className='icon'/></div>
        <div className="MWWind__title">Ветер</div>
        <div 
          className="MWWind__cross-icon-wrapper"
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
        {dailyWindData.map((day, index) => (
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
      <div className="MWWind__full-data">
        {fullData}
      </div>
      
      {/* Chart */}
      <div className="MWWind__chart">
        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWWind__swiper-chart'
        >
          {dailyWindData.map((day) => (
            <SwiperSlide key={day.id} className='MWWind__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWWind__responsive-container'}>
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
                    dataKey="wind_kph" 
                    orientation="right"
                    domain={[0, 16]}
                    ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16]}
                  />
                  <Line 
                    type="monotone"
                    dataKey="wind_kph"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    name="Скорость ветра"
                  />
                  <Line 
                    type="monotone"
                    dataKey="gust_kph"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={false}
                    name="Порывы ветра"
                  />
                </LineChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Daily summary */}
      <div className="MWWind__daily-summary">
        <div className="MWWind__daily-summary-title">Ежедневная сводка</div>
        <div className="MWWind__daily-summary-descr">
          Сегодня скорость ветра составит от {minWindSpeed} м/с до {maxWindSpeed} м/с с порывами до {maxGustWindSpeed} м/с.
        </div>
      </div>
      
      {/* Humidity descr */}
      <div className="MWWind__humidity-descr">
        <div className="MWWind__descr-title">О скорости и порывах ветра</div>
        <div className="MWWind__descr-text">Скорость ветра рассчитывается как средняя за короткий период времени. Порыв – это резкое увеличение скорости ветра относительно его средней скорости. Обычно порыв длится менее 20 секунд.</div>
      </div>

    </div>
  )
}

export default MWWind;
