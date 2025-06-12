import React from 'react';
//===== assets =====//
import './DailyForecast.scss';
import { IoCalendarOutline as CalendarIcon} from "react-icons/io5";
//===== components =====//
import DailyForecastCard from '../DailyForecastCard/DailyForecastCard';

const DailyForecast = ({dailyWeatherData, onClick}) => {

    const dailyWeatherForecast = dailyWeatherData ? dailyWeatherData.map(day => {
        return {
            id: day.date_epoch,
            date: day.date,
            weatherIcon: day.day.condition.icon,
            weatherDescr: day.day.condition.text,
            tempMax: day.day.maxtemp_c,
            tempMin: day.day.mintemp_c,
            hours: day.hour.map(hour => Math.round(hour.temp_c))
        } 
    }) : [];
    
    return (
        <section 
            className='DailyForecast'
            onClick={onClick}
        >
            <div className="DailyForecast__header">
                <span className="DailyForecast__wrapper icon-wrapper"><CalendarIcon /></span>
                <span className="DailyForecast__name">Прогноз на 10 дн</span>
            </div>
            
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