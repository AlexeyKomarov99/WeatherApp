import React, {useState, useRef} from 'react';
//===== asses =====//
import './MWHumidity.scss';
import { FaCloudRain as CloudRainIcon } from "react-icons/fa";
//===== components =====//
import { Swiper, SwiperSlide } from 'swiper/react';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
//===== utils =====//
import { Month } from '../../../utils/getMonth';
import { DayWeek } from '../../../utils/getDayWeek';

const MWHumidity = ({dailyWeatherData}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const chartSwiperRef = useRef(null);
  const dailyHumidityData = dailyWeatherData?.map((day) => {
    return {
      id: day.date_epoch,
      date: day.date,
      dayWeek: day.date_epoch,
      avgDayHumidity: day.day.avghumidity,
      hours: day.hour.map((currentHour) => {
        return {
          time_epoch: currentHour.time_epoch,
          hour: currentHour.time.split(' ')[1].split(':')[0],
          hourHumidity: currentHour.humidity,
          dewpoint_c: currentHour.dewpoint_c,
          dewpoint_f: currentHour.dewpoint_f,
        }
      })
    }
  })
  const selectedDayData = dailyHumidityData[selectedDateIndex];

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

  const dewPointList = dailyHumidityData[selectedDateIndex].hours.map((hour) => (
    hour.dewpoint_c
  ));
  const minDewPoint = Math.round(Math.min(...dewPointList));
  const maxDewPoint = Math.round(Math.max(...dewPointList));
  const avgDayHumidity = dailyHumidityData[selectedDateIndex].avgDayHumidity;

  return (
    <div className='MWHumidity'>
      
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
        {dailyHumidityData.map((day, index) => (
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
      
      {/* Chart */}
      <div className="MWHumidity__chart">
        <Swiper
          onSwiper={(swiper) => chartSwiperRef.current = swiper}
          onSlideChange={handleChartSwipe}
          initialSlide={selectedDateIndex}
          className='MWHumidity__swiper-chart'
        >
          {dailyHumidityData.map((day) => (
            <SwiperSlide key={day.id} className='MWHumidity__swiper-slide-chart'>
              <ResponsiveContainer width="100%" height={300} className={'MWHumidity__responsive-container'}>
                <LineChart data={day.hours}>
                  <defs>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke="#242323" />
                  <XAxis 
                    dataKey="hour"
                    orientation="bottom"
                    tick={{dx: 10}}
                    ticks={['00', '06', '12', '18']}
                    interval={0}
                  />
                  <YAxis 
                    dataKey="hourHumidity" 
                    orientation="right"
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Area 
                    type="monotone"
                    dataKey="hourHumidity"
                    fill="url(#humidityGradient)"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone"
                    dataKey="hourHumidity"
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
      <div className="MWHumidity__daily-summary">
        <div className="MWHumidity__daily-summary-title">Ежедневная сводка</div>
        <div className="MWHumidity__daily-summary-descr">
          Сегодня средняя влажность составит {avgDayHumidity}%.
          <br/>
          Точка росы: от {minDewPoint} до {maxDewPoint}
        </div>
      </div>

      {/* Humidity descr */}
      <div className="MWHumidity__humidity-descr">
        <div className="MWHumidity__descr-title">Об относительной влажности</div>
        <div className="MWHumidity__descr-text">Относительная влажность или просто влажность - это отношение количества влаги в воздухе к максимальному количеству, которое может содержаться в воздухе. При высокой температуре в воздухе может содержаться больше влаги. Если относительная влажность составляет около 100%, это может означать наличие росы или тумана.</div>
      </div>
      
      {/* Dew point descr */}
      <div className="MWHumidity__dew-point-descr">
        <div className="MWHumidity__descr-title">О точке росы</div>
        <div className="MWHumidity__descr-text">Точка росы - это значение до которого должна снизиться температура, чтобы образовалась роса. Это удобный способ определения влажности воздуха - чем выше точка росы, тем более влажным ощущается воздух. Точка росы, совпадающая с текущей температурой, означает, что относительная влажность воздуха составляет 100% и может образоваться роса или туман.</div>
      </div>

    </div>
  )
}

export default MWHumidity;
