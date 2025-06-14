import React from 'react';
//===== assets =====//
import './DailyForecast.scss';
import { IoCalendarOutline as CalendarIcon} from "react-icons/io5";
//===== components =====//
import DailyForecastCard from '../DailyForecastCard/DailyForecastCard';

const DailyForecast = ({
    dailyWeatherData, 
    onClick,
    setSelectedDateIndex
}) => {

    const dailyWeatherForecast = dailyWeatherData ? dailyWeatherData.map(day => {
        return {
            id: day.date_epoch,
            date: day.date,
            weatherIcon: day.day.condition.icon,
            weatherDescr: day.day.condition.text,
            tempMax_c: day.day.maxtemp_c,
            tempMax_f: day.day.maxtemp_f,
            tempMin_c: day.day.mintemp_c,
            tempMin_f: day.day.mintemp_f,
            hours_c: day.hour.map(hour => Math.round(hour.temp_c)),
            hours_f: day.hour.map(hour => Math.round(hour.temp_f))
        } 
    }) : [];
    
    const handleClickDay = (index) => {
        setSelectedDateIndex(index);
    }

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
            {dailyWeatherForecast?.map((day, index) => (
                <DailyForecastCard
                    key={day.id}
                    dailyForecast={day}
                    handleClickDay={() => handleClickDay(index)}
                />
            ))}
            </div>
        </section>
    )
}

export default DailyForecast;