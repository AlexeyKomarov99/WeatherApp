import React, {useState, useRef} from 'react';
//===== assets =====//
import './MWPrecipitation.scss';
import { GiWaterDrop as WaterDropIcon } from "react-icons/gi";
import { RxCross1 as CrossIcon } from "react-icons/rx";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const precipitationDescr = [
  {id: 1, title: 'Дождь', color: '#64d2ff'},
  {id: 2, title: 'Ледяной дождь', color: '#2250f5'},
  {id: 3, title: 'Осадки', color: '#9B4FE0'},
  {id: 4, title: 'Снег', color: '#ffffff'},
]

const MWPrecipitation = ({
  dailyWeatherData,
  handleClose,
}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  const dailyPrecipitationData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      totalprecip_in: day.day.totalprecip_in,
      totalprecip_mm: day.day.totalprecip_mm,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          precip_mm: currentHour.precip_mm,
          precip_in: currentHour.precip_in
        }
      })
    }
  });

  const precipitationByDay = dailyPrecipitationData[selectedDateIndex].hours.map((hour) => hour.precip_mm);
  const totalPrecipitationDay = Math.round(precipitationByDay.reduce((acc, precipitation) => acc + precipitation, 0));
  
  const selectedDayData = dailyPrecipitationData[selectedDateIndex];
  
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

  return (
    <div className='MWPrecipitation'>

      {/* Title */}
      <div className="MWPrecipitation__header">
        <div className="MWPrecipitation__icon-wrapper icon-wrapper"><WaterDropIcon className='icon'/></div>
        <div className="MWPrecipitation__title">Влажность</div>
        <div 
          className="MWPrecipitation__cross-icon-wrapper"
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
        {dailyPrecipitationData.map((day, index) => (
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
      <div className="MWPrecipitation__full-data">
        {fullData}
      </div>

      {/* Chart */}
      <div className="MWPrecipitation__chart">
        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWPrecipitation__swiper-chart'
        >
          {dailyPrecipitationData.map((day) => (
            <SwiperSlide key={day.id} className='MWPrecipitation__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWPrecipitation__responsive-container'}>
                <BarChart data={day.hours}>
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis 
                    dataKey="hour"
                    orientation='bottom'
                    tick={{dx: 10}}
                    ticks={['00', '06', '12', '18']}
                    interval={0}
                  />
                  <YAxis
                    orientation='right' 
                  />
                  <Bar 
                    dataKey={"precip_mm"}
                    fill="#64d2ff"
                  />
                </BarChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Chart descr */}
      <div className="MWPrecipitation__chart-descr">
        {precipitationDescr.map((precipitation) => (
          <div 
            key={precipitation.id}
            className="MWPrecipitation__chart-descr-item"
          >
            <div 
              className="MWPrecipitation__chart-descr-color"
              style={{
                backgroundColor: `${precipitation.color}`,
                width: '10px',
                height: '10px',
                borderRadius: '10000px',
                marginRight: '4px',
              }}
            />
            <div className="MWPrecipitation__chart-descr-name">{precipitation.title}</div>
          </div>
        ))}
      </div>

      {/* Daily summary */}
      <div className="MWPrecipitation__daily-summary">
        <div className="MWPrecipitation__daily-summary-title">Ежедневная сводка</div>
        <div className="MWPrecipitation__daily-summary-descr">
          Сегодня общее количество осадков составит {totalPrecipitationDay} мм.
        </div>
      </div>

    </div>
  )
}

export default MWPrecipitation;