import React from 'react';
//===== assets =====//
import './CityInfo.scss';

const CityInfo = ({currentWeatherData}) => {
    
    const nameCity = currentWeatherData?.location?.name ?? "Город не найден";
    const weatherTemp = Math.round(currentWeatherData?.current?.temp_c ?? 0);
    const weatherDescr = currentWeatherData?.current?.condition?.text ?? "—";
    const weatherTempMax = Math.ceil(currentWeatherData?.main?.temp_max ?? 0);
    const weatherTempMin = Math.floor(currentWeatherData?.main?.temp_min ?? 0);

    // console.log('Прогноз погоды по названию города:\n', currentWeatherData);

    return (
        <div className="CityInfo">
            <div className="CityInfo__content">

                <span className="CityInfo__city">{nameCity}</span>
                <span className="CityInfo__weather">{weatherTemp}°</span>
                <span className="CityInfo__description">{weatherDescr}</span>
                {/* <div className="CityInfo__temp-group">
                    <span className="CityInfo__temp-item">Макс.: {weatherTempMax}°, </span>
                    <span className="CityInfo__temp-item">Мин.: {weatherTempMin}°</span>
                </div> */}

            </div>
        </div>
    )
}

export default CityInfo