import React, { useState, useEffect } from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { updateAllCitiesWeather } from '../../features/weather/weatherSlice';
import { selectFavoriteCities } from '../../features/weather/weatherSelectors';

import {
    useLazyGetCurrentWeatherQuery,
    useLazyGetHourlyForecastQuery,
    useLazyGetDailyForecastQuery,
} from '../../features/weather/weatherApi';

const WeatherDataLoader = () => {
    const favoriteCities = useSelector(selectFavoriteCities);
    const dispatch = useDispatch();

    const [triggerCurrentWeather] = useLazyGetCurrentWeatherQuery();
    const [triggerHourlyForecast] = useLazyGetHourlyForecastQuery();
    const [triggerDailyForecast] = useLazyGetDailyForecastQuery();
    
    useEffect(() => {

        const loadWeatherData = async () => {
            if(favoriteCities.length > 0) {
                let citiesWeatherDataList = [];

                for(const city of favoriteCities) {
                    const cityCoords = { lat: city.lat, lon: city.lon };

                    try {
                        // Параллельно запрашиваем все данные для города
                        const [current, hourly, daily] = await Promise.all([
                            triggerCurrentWeather(cityCoords),
                            triggerHourlyForecast(cityCoords),
                            triggerDailyForecast(cityCoords),
                        ]);

                        citiesWeatherDataList.push({
                            cityId: city.cityId,
                            cityData: {
                                currentWeatherData: current.data,
                                hourlyForecastData: hourly.data,
                                dailyForecastData: daily.data,
                            }
                        })

                    } catch (error) {
                        console.error(`Failed to load data for city ${city.cityId}:`, error);
                    }
                }

                dispatch(updateAllCitiesWeather(citiesWeatherDataList));
            }
        }

        loadWeatherData();

        // Обновляем данные каждые 30 минут
        const interval = setInterval(loadWeatherData, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, [favoriteCities, dispatch, triggerCurrentWeather, triggerHourlyForecast, triggerDailyForecast]);

    return null;
}

export default WeatherDataLoader;