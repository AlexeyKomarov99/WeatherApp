import React from 'react';
//===== assets =====//
import './HourlyForecast.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { LiaClockSolid as WatchIcon } from "react-icons/lia";
//===== components =====//
import HourlyForecastCard from '../HourlyForecastCard/HourlyForecastCard';

const HourlyForecast = ({forecastData}) => {
    
    const hourlyWeatherForecast = forecastData?.forecast?.forecastday[0]?.hour.map((hour) => {
        return {
            id: hour.time_epoch,
            time: hour.time.split(' ')[1],
            weatherIcon: hour.condition.icon,
            weatherDescr: hour.condition.text,
            temperature: hour.temp_c
        }
    })

    return (
    <section className="HourlyForecast">
        <div className="HourlyForecast__header">Почасовой прогноз погоды</div>        
        <Swiper
            slidesPerView={6}
        >
            {hourlyWeatherForecast?.map(hourlyForecast => (
                <SwiperSlide
                    key={hourlyForecast.id}
                >
                    <HourlyForecastCard 
                        hourlyForecast={hourlyForecast} 
                    />
                </SwiperSlide>
            ))}
        </Swiper>

    </section>
  )
}

export default HourlyForecast;











        {/* <div className="HourlyForecast__content">
            {hourlyWeatherForecast?.map(hourlyForecast => (
                <HourlyForecastCard 
                    key={hourlyForecast.id}
                    hourlyForecast={hourlyForecast} 
                />
            ))}
        </div> */}


    // console.log('list hours arrived from server:\n', forecastData);
    // console.log('list hours:\n', hourlyWeatherForecast);

    
    // console.log('Почасовой прогноз погоды:/n', forecastData);

    // const sunrise = new Date(forecastData?.city?.sunrise * 1000);
    // const sunriseHours = sunrise.getHours().toString().padStart(2, '0');
    // const sunriseMinutes = sunrise.getMinutes().toString().padStart(2, '0');
    // const sunriseTimeFormatted = `${sunriseHours}:${sunriseMinutes}`;
    // console.log('Восход:', sunriseTimeFormatted);

    // const sunset = new Date(forecastData?.city?.sunset * 1000);
    // const sunsetHours = sunset.getHours().toString().padStart(2, '0');
    // const sunsetMinutes = sunset.getMinutes().toString().padStart(2, '0');
    // const sunsetTimeFormatted = `${sunsetHours}:${sunsetMinutes}`;
    // console.log('Закат:', sunsetTimeFormatted);