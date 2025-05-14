import React, {useState, useRef} from 'react';
//===== assets =====//
import './MWFeelsLike.scss';
import { PiThermometerHotDuotone as FeelsLikeIcon } from "react-icons/pi";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWFeelsLike = ({dailyWeatherData}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  // console.log(dailyWeatherData);
  const dailyFeelsLikeData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hourFeelsLike: currentHour.time.split(' ')[1].split(':')[0],
          feelslike_c: currentHour.feelslike_c,
          feelslike_f: currentHour.feelslike_f,
        }
      })
    }
  })

  console.log(dailyFeelsLikeData)

  const selectedDayData = dailyFeelsLikeData[selectedDateIndex];

  const feelsLikeByDay = dailyFeelsLikeData[selectedDateIndex].hours.map((hour) => hour.feelslike_c);
  const minFeelsLike = Math.round(Math.min(...feelsLikeByDay));
  const maxFeelsLike = Math.round(Math.max(...feelsLikeByDay));

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
    <div className='MWFeelsLike'>
      
      {/* Title */}
      <div className="MWFeelsLike__header">
        <div className="MWFeelsLike__icon-wrapper icon-wrapper"><FeelsLikeIcon className='icon'/></div>
        <div className="MWFeelsLike__title">Влажность</div>
      </div>

      {/* Swiper dates */}
      <Swiper
        initialSlide={selectedDateIndex}
        slidesPerView={7}
        className='Swiper__days'
      >
        {dailyFeelsLikeData.map((day, index) => (
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
      <div className="MWFeelsLike__full-data">
        {fullData}
      </div>

      {/* Chart */}
      <div className="MWFeelsLike__chart">
        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWFeelsLike__swiper-chart'
        >
          {dailyFeelsLikeData.map((day) => (
            <SwiperSlide key={day.id} className='MWFeelsLike__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWFeelsLike__responsive-container'}>
                <LineChart data={day.hours}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#242323" />
                  <XAxis 
                    dataKey="hourFeelsLike"
                    orientation="bottom"
                    tick={{dx: 10}}
                    ticks={['00', '06', '12', '18']}
                    interval={0}
                  />
                  <YAxis 
                    dataKey="feelslike_c" 
                    orientation="right"
                    // domain={[0, 100]}
                    // ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(value) => `${value}°`}
                  />
                  <Line 
                    type="monotone"
                    dataKey="feelslike_c"
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
      <div className="MWFeelsLike__daily-summary">
        <div className="MWFeelsLike__daily-summary-title">Ежедневная сводка</div>
        <div className="MWFeelsLike__daily-summary-descr">
          Сегодня: температура ощущалась в диапазоне от {minFeelsLike}° до {maxFeelsLike}°.
        </div>
      </div>

      {/* MWFeelsLike descr */}
      <div className="MWFeelsLike__precipitation-descr">
        <div className="MWFeelsLike__descr-title">О показателе температуры "Ощущается как"</div>
        <div className="MWFeelsLike__descr-text">Показатель "Ощущается как" характеризует то, как температура воспринимается человеком, и может отличаться от фактической температуры. На показатель "Ощущается как" оказывают влияние скорость ветра и относительная влажность.</div>
      </div>

    </div>
  )
}

export default MWFeelsLike;
