import React from 'react';
//===== assets =====//
import './CityInfo.scss';

const CityInfo = ({currentWeather, locationData, hourlyWeatherData}) => {
    const nameCity =  locationData ? locationData.name : "Город не найден";
    const weatherTemp = Math.round(currentWeather?.temp_c ?? 0);
    const weatherDescr = currentWeather ? currentWeather.condition?.text : "—";
    const hourlyData = hourlyWeatherData 
        ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_c))
        : [];
    const minTemp = Math.min(...hourlyData);
    const maxTemp = Math.max(...hourlyData);

    return (
        <div className="CityInfo">
            <div className="CityInfo__content">

                <span className="CityInfo__city">{nameCity}</span>
                <span className="CityInfo__weather">{weatherTemp}°</span>
                <span className="CityInfo__description">{weatherDescr}</span>
                <div className="CityInfo__temp-group">
                    <span className="CityInfo__temp-item">Макс.: {minTemp}°, </span>
                    <span className="CityInfo__temp-item">Мин.: {maxTemp}°</span>
                </div>

            </div>
        </div>
    )
}

export default CityInfo