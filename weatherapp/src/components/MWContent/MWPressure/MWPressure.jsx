import React, {useState, useRef} from 'react';
//===== asses =====//
import './MWPressure.scss';
import { IoMdSpeedometer as PressureIcon } from "react-icons/io";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWPressure = ({dailyWeatherData}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  const dailyPressureData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      avgDayHumidity: day.day.avghumidity,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hourPressure: currentHour.time.split(' ')[1].split(':')[0],
          pressure_in: Math.round(currentHour.pressure_in * 25.4),
          pressure_mb: Math.round(currentHour.pressure_mb * 0.750062),
        }
      })
    }
  })
  // console.log(dailyPressureData);
  const selectedDayData = dailyPressureData[selectedDateIndex];
  const fullData = `
    ${DayWeek(selectedDayData.dayWeek).charAt(0).toUpperCase() + 
      DayWeek(selectedDayData.dayWeek).slice(1)}, 
    ${selectedDayData.date.split('-')[2]}
    ${Month(selectedDayData.dayWeek)}
    ${selectedDayData.date.split('-')[0]}
  `;

  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
    if(chartSwiperRef.current) {
      chartSwiperRef.current.slideTo(index);
    }
  }
  
  const handleChartSwipe = (swiper) => {
    setSelectedDateIndex(swiper.activeIndex);
  };
  
  const pressureList = dailyPressureData[selectedDateIndex].hours.map(pressure => pressure.pressure_in);
  const sumPressure = pressureList.reduce((acc, pressure) => acc + pressure, 0);
  const avgDailyPressure = Math.round(sumPressure / pressureList.length);
  const minDailyPressure = Math.min(...pressureList);
  const maxDailyPressure = Math.max(...pressureList);

  return (
    <div className='MWPressure'>
      
      {/* Title */}
      <div className="MWPressure__header">
        <div className="MWPressure__icon-wrapper icon-wrapper"><PressureIcon className='icon'/></div>
        <div className="MWPressure__title">Давление</div>
      </div>

      {/* Swiper dates */}
      <Swiper
        initialSlide={selectedDateIndex}
        slidesPerView={7}
        className='Swiper__days'
      >
        {dailyPressureData.map((day, index) => (
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
      <div className="MWPressure__full-data">
        {fullData}
      </div>
      
      {/* Chart */}
      <div className="MWPressure__chart">
        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWPressure__swiper-chart'
        >
          {dailyPressureData.map((day) => (
            <SwiperSlide key={day.id} className='MWPressure__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWPressure__responsive-container'}>
                <LineChart data={day.hours}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#242323" />
                  <XAxis 
                    dataKey="hourPressure"
                    orientation="bottom"
                    tick={{dx: 10}}
                    ticks={['00', '06', '12', '18']}
                    interval={0}
                  />
                  <YAxis 
                    dataKey="pressure_in" 
                    orientation="right"
                    domain={[730, 790]}
                    ticks={[730, 740, 750, 760, 770, 780, 790]}
                  />
                  <Line 
                    type="monotone"
                    dataKey="pressure_in"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Daily summary */}
      <div className="MWPressure__daily-summary">
        <div className="MWPressure__daily-summary-title">Ежедневная сводка</div>
        <div className="MWPressure__daily-summary-descr">
          Сегодня: среднее давление составит {avgDailyPressure} мм рт. ст. <br />
          Максимальное значение – {maxDailyPressure} <br />
          Минимальное значение – {minDailyPressure} 
        </div>
      </div>

      {/* Dew point descr */}
      <div className="MWPressure__pressure-descr">
        <div className="MWPressure__descr-title">О давлении</div>
        <div className="MWPressure__descr-text">Существенные, резкие изменения давления используются для прогнозирования изменений погоды. Например, падения давления может означать, что скоро пойдет дождь или снег, а повышение давления может предвещать улучшения погоды. Давления также называют барометрическим давлением или атмосферным давлением.</div>
      </div>

    </div>
  )
}

export default MWPressure;