import React, {useState, useRef} from 'react';
//===== asses =====//
import './MWPressure.scss';
import { FaCloudRain as CloudRainIcon } from "react-icons/fa";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWPressure = ({dailyWeatherData}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  console.log(dailyWeatherData);
  const dailyPressureData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      avgDayHumidity: day.day.avghumidity,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          hourPressure: currentHour.humidity,
          pressure_in: currentHour.pressure_in,
          pressure_mb: currentHour.pressure_mb,
        }
      })
    }
  })

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
  
  return (
    <div className='MWPressure'>
      
      {/* Title */}
      <div className="MWHumidity__header">
        <div className="MWHumidity__icon-wrapper icon-wrapper"><CloudRainIcon className='icon'/></div>
        <div className="MWHumidity__title">Влажность</div>
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
      <div className="MWHumidity__full-data">
        {fullData}
      </div>

    </div>
  )
}

export default MWPressure;