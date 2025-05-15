import React, {useState, useRef} from 'react';
//===== asses =====//
import './MWVisibility.scss';
import { IoEye as EyeIcon } from "react-icons/io5";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWVisibility = ({dailyWeatherData}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  console.log(dailyWeatherData);
  const dailyVisibilityData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      avgvis_km: day.day.avgvis_km,
      avgvis_miles: day.day.avgvis_miles,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          vis_km: Math.round(currentHour.vis_km),
          vis_miles: Math.round(currentHour.vis_miles),
        }
      })
    }
  })
  console.log(dailyVisibilityData)
  const selectedDayData = dailyVisibilityData[selectedDateIndex];

  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
    if(chartSwiperRef.current) {
      chartSwiperRef.current.slideTo(index);
    }
  }

  const handleChartSwipe = (swiper) => {
    setSelectedDateIndex(swiper.activeIndex);
  };

  const visibilityDataList = dailyVisibilityData[selectedDateIndex].hours.map(vis => vis.vis_km);
  const minDailyVisibility = Math.min(...visibilityDataList);
  const maxDailyVisibility = Math.max(...visibilityDataList);

  const fullData = `
    ${DayWeek(selectedDayData.dayWeek).charAt(0).toUpperCase() + 
      DayWeek(selectedDayData.dayWeek).slice(1)}, 
    ${selectedDayData.date.split('-')[2]}
    ${Month(selectedDayData.dayWeek)}
    ${selectedDayData.date.split('-')[0]}
  `;

  return (
    <div className='MWVisibility'>
      
      {/* Title */}
      <div className="MWVisibility__header">
        <div className="MWVisibility__icon-wrapper icon-wrapper"><EyeIcon className='icon'/></div>
        <div className="MWVisibility__title">Видимость</div>
      </div>

      {/* Swiper dates */}
      <Swiper
        initialSlide={selectedDateIndex}
        slidesPerView={7}
        className='Swiper__days'
      >
        {dailyVisibilityData.map((day, index) => (
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
      <div className="MWVisibility__full-data">
        {fullData}
      </div>
      
      {/* Chart */}
      <div className="MWVisibility__chart">
        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWVisibility__swiper-chart'
        >
          {dailyVisibilityData.map((day) => (
            <SwiperSlide key={day.id} className='MWVisibility__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWVisibility__responsive-container'}>
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
                    dataKey="vis_km" 
                    orientation="right"
                    domain={[0, 45]}
                    ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45]}
                  />
                  <Line 
                    type="monotone"
                    dataKey="vis_km"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Daily summary */}
      <div className="MWVisibility__daily-summary">
        <div className="MWVisibility__daily-summary-title">Ежедневная сводка</div>
        <div className="MWVisibility__daily-summary-descr">
          (условный текст), от {minDailyVisibility} до {maxDailyVisibility}.
        </div>
      </div>
      
      {/* Humidity descr */}
      <div className="MWVisibility__humidity-descr">
        <div className="MWVisibility__descr-title">О видимости</div>
        <div className="MWVisibility__descr-text">Видимость показывает, на каком расстоянии от себя Вы можете отчетливо видеть такие объекты, как здания и возвышенности. Видимость является мерой прозрачности воздуха и не учитывает количество солнечного света или наличие препятствий. Видимость на дистанцию в 10 км или выше считается ясной.</div>
      </div>

    </div>
  )
}

export default MWVisibility;