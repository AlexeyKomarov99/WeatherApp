import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectTemperatureUnits } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './CityInfo.scss';

const CityInfo = ({currentWeather, locationData, hourlyWeatherData}) => {
    const temperatureUnits = useSelector(selectTemperatureUnits) || 'Celsius';
    
    const nameCity =  locationData ? locationData.name : "Город не найден";
    const weatherTemp_c = Math.round(currentWeather?.temp_c ?? 0);
    const weatherTemp_f = Math.round(currentWeather?.temp_f ?? 0);
    const weatherDescr = currentWeather ? currentWeather.condition?.text : "—";
    const hourlyData_c = hourlyWeatherData 
        ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_c))
        : [];
    const hourlyData_f = hourlyWeatherData 
        ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_f))
        : [];
    const minTemp_c = Math.min(...hourlyData_c);
    const minTemp_f = Math.min(...hourlyData_f);
    const maxTemp_c = Math.max(...hourlyData_c);
    const maxTemp_f = Math.max(...hourlyData_f);

    return (
        <div className="CityInfo">
            <div className="CityInfo__content">

                <span className="CityInfo__city">{nameCity}</span>
                <span className="CityInfo__weather">{temperatureUnits === 'Celsius' ? weatherTemp_c : weatherTemp_f}°</span>
                <span className="CityInfo__description">{weatherDescr}</span>
                <div className="CityInfo__temp-group">
                    <span className="CityInfo__temp-item">Макс.: {temperatureUnits === 'Celsius' ? minTemp_c : minTemp_f}°, </span>
                    <span className="CityInfo__temp-item">Мин.: {temperatureUnits === 'Celsius' ? maxTemp_c : maxTemp_f}°</span>
                </div>

            </div>
        </div>
    )
}

export default CityInfo