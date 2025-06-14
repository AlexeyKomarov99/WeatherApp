import React, { useState, useEffect, useRef } from 'react';
import './HourlyForecast.scss';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toZonedTime, fromZonedTime, format } from 'date-fns-tz';
import HourlyForecastCard from '../HourlyForecastCard/HourlyForecastCard';

const HourlyForecast = ({
    locationData,
    dailyWeatherData,
    onClick
}) => {
    const [processedHourlyData, setProcessedHourlyData] = useState([]);
    const swiperRef = useRef(null);
    const timeZoneId = locationData?.tz_id || 'UTC';

    // Функция для конвертации времени в локальную зону города
    const formatTimeForCity = (timeStr, isAstroTime = false) => {
        if (!timeStr) return '00:00';

        // Для астрономических данных (восход/закат)
        if (isAstroTime) {
            const [time, period] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            
            hours = parseInt(hours, 10) || 0;
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            
            // Создаем дату в UTC и конвертируем в локальное время города
            const now = new Date();
            const dateWithTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hours,
                minutes
            );
            const zonedDate = toZonedTime(dateWithTime, timeZoneId);
            return format(zonedDate, 'HH:mm', { timeZone: timeZoneId });
        }

        // Для обычных часовых данных
        const [datePart, timePart] = timeStr.split(' ');
        const [hours, minutes] = timePart.split(':');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        const getHourlyData = () => {
            if (!dailyWeatherData || !Array.isArray(dailyWeatherData)) return [];

            // Получаем текущее время в временной зоне города
            const nowInCityTz = toZonedTime(new Date(), timeZoneId);
            const currentHour = nowInCityTz.getHours();
            const currentMinutes = nowInCityTz.getMinutes();
            const currentTimeInMinutes = currentHour * 60 + currentMinutes;
            const todayStr = format(nowInCityTz, 'yyyy-MM-dd', { timeZone: timeZoneId });

            // Находим текущий день в данных
            let currentDay = dailyWeatherData.find(day => day.date === todayStr) || dailyWeatherData[0];
            if (!currentDay) return [];

            // Находим текущий час в данных
            const currentHourData = currentDay.hour.find(hour => {
                const hourTime = hour.time.split(' ')[1];
                const hourNum = parseInt(hourTime.split(':')[0], 10);
                return hourNum === currentHour;
            });

            if (!currentHourData) return [];

            // Создаем запись "Сейчас" с центрированным текстом
            const currentTimeEntry = {
                time_epoch: currentHourData.time_epoch,
                time: 'Сейчас',
                temp_c: Math.round(currentHourData.temp_c),
                temp_f: Math.round(currentHourData.temp_f),
                weatherIcon: currentHourData.condition.icon,
                weatherDescr: currentHourData.condition.text,
                weatherIconCode: currentHourData.condition.code,
                isCurrent: true,
                isHour: true,
                centered: true
            };

            // Формируем оставшиеся 23 часа прогноза
            let forecastHours = [currentTimeEntry];
            let remainingHours = 23;
            let currentDateIndex = dailyWeatherData.indexOf(currentDay);

            // Добавляем оставшиеся часы текущего дня
            const todayHours = currentDay.hour
                .filter(hour => {
                    const hourTime = hour.time.split(' ')[1];
                    const hourNum = parseInt(hourTime.split(':')[0], 10);
                    return hourNum > currentHour;
                })
                .map(hour => ({
                    time_epoch: hour.time_epoch,
                    time: hour.time.split(' ')[1],
                    temp_c: Math.round(hour.temp_c),
                    temp_f: Math.round(hour.temp_f),
                    weatherIcon: hour.condition.icon,
                    weatherDescr: hour.condition.text,
                    weatherIconCode: hour.condition.code,
                    isHour: true
                }));

            forecastHours.push(...todayHours.slice(0, remainingHours));
            remainingHours -= todayHours.length;
            currentDateIndex++;

            // Добираем часы из следующих дней
            while (remainingHours > 0 && currentDateIndex < dailyWeatherData.length) {
                const day = dailyWeatherData[currentDateIndex];
                const hoursToAdd = Math.min(remainingHours, day.hour.length);
                forecastHours.push(...day.hour.slice(0, hoursToAdd).map(hour => ({
                    time_epoch: hour.time_epoch,
                    time: hour.time.split(' ')[1],
                    temp_c: Math.round(hour.temp_c),
                    temp_f: Math.round(hour.temp_f),
                    weatherIcon: hour.condition.icon,
                    weatherDescr: hour.condition.text,
                    weatherIconCode: hour.condition.code,
                    isHour: true
                })));
                remainingHours -= hoursToAdd;
                currentDateIndex++;
            }

            // Обрезаем ровно до 24 часов (1 текущий + 23 будущих)
            forecastHours = forecastHours.slice(0, 24);

            // Обрабатываем восход/закат с учетом временной зоны
            const sunriseTime = formatTimeForCity(currentDay.astro?.sunrise, true);
            const sunsetTime = formatTimeForCity(currentDay.astro?.sunset, true);

            const sunriseHour = parseInt(sunriseTime.split(':')[0], 10);
            const sunriseMinute = parseInt(sunriseTime.split(':')[1], 10);
            const sunriseInMinutes = sunriseHour * 60 + sunriseMinute;

            const sunsetHour = parseInt(sunsetTime.split(':')[0], 10);
            const sunsetMinute = parseInt(sunsetTime.split(':')[1], 10);
            const sunsetInMinutes = sunsetHour * 60 + sunsetMinute;

            // Добавляем восход только если он еще не прошел
            if (sunriseInMinutes > currentTimeInMinutes) {
                const sunriseEvent = {
                    time_epoch: (currentDay.date_epoch || 0) * 1000,
                    time: sunriseTime,
                    temp_c: 'Восход солнца',
                    temp_f: 'Sunrise',
                    isSunEvent: true,
                    weatherIcon: '//cdn.weatherapi.com/weather/64x64/day/176.png'
                };

                const insertIndex = forecastHours.findIndex((h, idx) => {
                    if (idx === 0) return false;
                    const hHour = parseInt(h.time.split(':')[0], 10);
                    const hMinute = parseInt(h.time.split(':')[1], 10);
                    return (hHour * 60 + hMinute) > sunriseInMinutes;
                });

                if (insertIndex !== -1) {
                    forecastHours.splice(insertIndex, 0, sunriseEvent);
                }
            }

            // Добавляем закат только если он в пределах 24 часов
            if (sunsetInMinutes > currentTimeInMinutes &&
                sunsetInMinutes < (currentTimeInMinutes + 24 * 60)) {

                const sunsetEvent = {
                    time_epoch: (currentDay.date_epoch || 0) * 1000 + 1,
                    time: sunsetTime,
                    temp_c: 'Закат солнца',
                    temp_f: 'Sunset',
                    isSunEvent: true,
                    weatherIcon: '//cdn.weatherapi.com/weather/64x64/night/176.png'
                };

                const insertIndex = forecastHours.findIndex((h, idx) => {
                    if (idx === 0) return false;
                    const hHour = parseInt(h.time.split(':')[0], 10);
                    const hMinute = parseInt(h.time.split(':')[1], 10);
                    return (hHour * 60 + hMinute) > sunsetInMinutes;
                });

                if (insertIndex !== -1) {
                    forecastHours.splice(insertIndex, 0, sunsetEvent);
                }
            }

            return forecastHours;
        };

        setProcessedHourlyData(getHourlyData());
    }, [dailyWeatherData, timeZoneId]);

    return (
        <section className="HourlyForecast" onClick={onClick}>
            <div className="HourlyForecast__header">Почасовой прогноз погоды</div>
            <Swiper
                slidesPerView={6}
                initialSlide={0}
                spaceBetween={10}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {processedHourlyData.map((hour, index) => (
                    <SwiperSlide key={`${hour.time_epoch}_${index}`}>
                        <HourlyForecastCard
                            hour={hour}
                            isCurrent={hour.isCurrent}
                            centered={hour.centered}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default HourlyForecast;