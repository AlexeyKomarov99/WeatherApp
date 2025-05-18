import React, {useState, useEffect, useRef} from 'react';
import './HourlyForecast.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HourlyForecastCard from '../HourlyForecastCard/HourlyForecastCard';

const HourlyForecast = ({dailyWeatherData, onClick}) => {
    const [currentIndexHour, setCurrentIndexHour] = useState(0);
    const swiperRef = useRef(null);
    
    const formatTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        
        hours = parseInt(hours);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    const dailyWeatherDataList = dailyWeatherData
    ? dailyWeatherData.map((day) => {
        const dayCopy = {
            id: day.date_epoch,
            date: day.date,
            sunrise: day.astro.sunrise,
            sunset: day.astro.sunset,
            hours: day.hour.map((hour) => ({
                time_epoch: hour.time_epoch,
                time: hour.time.split(' ')[1],
                temp_c: Math.round(hour.temp_c),
                weatherIcon: hour.condition.icon,
                weatherDescr: hour.condition.text,
                weatherIconCode: hour.condition.code,
            }))
        };
        
        // Добавляем sunrise с иконкой
        dayCopy.hours.push({
            time_epoch: day.date_epoch * 1000,
            time: formatTime(dayCopy.sunrise),
            temp_c: 'Восход солнца',
            isSunEvent: true,
            weatherIcon: '//cdn.weatherapi.com/weather/64x64/day/176.png' // Иконка восхода
        });
        
        dayCopy.hours.push({
            time_epoch: day.date_epoch * 1000 + 1,
            time: formatTime(dayCopy.sunset),
            temp_c: 'Закат солнца',
            isSunEvent: true,
            weatherIcon: '//cdn.weatherapi.com/weather/64x64/night/176.png' // Иконка заката
        });
        
        // Сортируем часы по времени
        dayCopy.hours.sort((a, b) => {
            const timeA = a.time.replace(':', '');
            const timeB = b.time.replace(':', '');
            return timeA - timeB;
        });
        
        return dayCopy;
    })
    : [];

    // Остальной код без изменений
    const weatherData = dailyWeatherDataList.slice(0, 2);
    
    const hourlyWeatherData = weatherData
        .map((day) => day.hours)
        .flat(1)
        .slice(0, 26);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        setCurrentIndexHour(currentHour);
    }, []);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(currentIndexHour);
        }
    }, [currentIndexHour, swiperRef.current]);

    return (
        <section className="HourlyForecast" onClick={onClick}>
            <div className="HourlyForecast__header">Почасовой прогноз погоды</div>        
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={6}
            >
                {hourlyWeatherData?.map((hour) => (
                    <SwiperSlide key={hour.time_epoch}>
                        <HourlyForecastCard hour={hour} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default HourlyForecast;