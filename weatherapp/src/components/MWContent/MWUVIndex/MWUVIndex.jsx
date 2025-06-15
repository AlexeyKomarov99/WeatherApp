import React, {useState, useRef} from 'react';
//===== assets =====//
import './MWUVIndex.scss';
import { IoSunny as SunIcon } from "react-icons/io5";
import { RxCross1 as CrossIcon } from "react-icons/rx";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MWUVIndex = ({
  dailyWeatherData,
  handleCloseMW,
}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  const dailyUVIndexData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      uv: day.day.uv,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          hourUV: currentHour.uv
        }
      })
    }
  });
  const selectedDayData = dailyUVIndexData[selectedDateIndex];
  // console.log('Список дней для МО UV', dailyUVIndexData);

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
    <div className='MWUVIndex'>
      
      {/* Title */}
      <div className="MWUVIndex__header">
        <div className="MWUVIndex__icon-wrapper icon-wrapper"><SunIcon className='icon'/></div>
        <div className="MWUVIndex__title">УФ-индекс</div>
        <div 
          className="MWUVIndex__cross-icon-wrapper"
          onClick={handleCloseMW}
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
        {dailyUVIndexData.map((day, index) => (
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
      <div className="MWUVIndex__full-data">
        {fullData}
      </div>
      
      {/* Chart */}
      <div className="MWUVIndex__chart">

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
          className='MWUVIndex__swiper-chart'
        >
          {dailyUVIndexData.map((day, index) => (
            <SwiperSlide key={day.id} className='MWUVIndex__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWUVIndex__responsive-container'}>
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
                    domain={[0, 11]}
                    ticks={[1,2,3,4,5,6,7,8,9,10,11]}
                    interval={0}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hourUV" 
                    stroke="#ff7300" 
                    strokeWidth={2} 
                    name="UV-индекс" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Descr UV */}
      <div className="MWUVIndex__descr">
        <div className="MWUVIndex__descr-title">Об УФ-индексе</div>
        <div className="MWUVIndex__descr-text">УФ-индекс (УФИ), разработанный Всемирной организацией здравоохранения, измеряет ультрафиолетовое излучение. Чем выше УФ-индекс, тем больше вероятность вреда здоровью и тем быстрее он может решить, когда следует защищаться от солнца, а когда лучше не выходить на улицу. ВОЗ рекомендует находиться в тени, пользоваться солнцезащитными кремами, головными уборами и защищающей одеждой при уровне 3 (умеренный) и выше.</div>
      </div>

    </div>
  )
}

export default MWUVIndex;