import React from 'react';
//===== redux =====//
import {useGetDailyForecstQuery} from '../../features/weather/weatherApi';
//===== assets =====//
import './DailyForecast.scss';
//===== components =====//
import DailyForecastCard from '../DailyForecastCard/DailyForecastCard';

const DailyForecast = () => {

    const {
        data: forecastData,
        isLoading: isForecastLoading,
        error: forecastLoading
    } = useGetDailyForecstQuery('Moscow');

    // console.log('forecast weather on 10 days /n:', forecastData);

    const dailyWeatherForecast = forecastData?.forecast?.forecastday.map(day => {
        return {
            id: day.date_epoch,
            date: day.date,
            weatherIcon: day.day.condition.icon,
            weatherDescr: day.day.condition.text,
            tempMax: day.day.maxtemp_c,
            tempMin: day.day.mintemp_c
        }
    })

    // console.log(dailyWeatherForecast);
    
    return (
        <section className='DailyForecast'>
            <div className="DailyForecast__header">Ежедневный прогноз</div>
            <div className="DailyForecast__content">
            {dailyWeatherForecast?.map(day => (
                <DailyForecastCard
                    key={day.id}
                    dailyForecast={day}
                />
            ))}
            </div>
        </section>
    )
}

export default DailyForecast;