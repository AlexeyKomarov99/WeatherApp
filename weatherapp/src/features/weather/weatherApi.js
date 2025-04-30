import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// https://www.weatherapi.com
const API_KEY = '4ecbf6c1542849e1873184553252804';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://api.weatherapi.com/v1'}),
    endpoints: (builder) => ({
        
        // Call current weather data for name city
        getCurrentWeather: builder.query({
            query: (city) => ({
                url: 'current.json',
                params: {
                    q: city,
                    key: API_KEY,
                }
            }),
        }),

        // Call hourly forecast data for name city (for 1 day)
        getHourlyForecast: builder.query({
            query: (city) => ({
                url: 'forecast.json',
                params: {
                    q: city,
                    key: API_KEY,
                    days: 1
                }
            })
        }),

        // Call daily forecast data for name city (for 10 days)
        getDailyForecst: builder.query({
            query: (city) => ({
                url: 'forecast.json',
                params: {
                    q: city,
                    key: API_KEY,
                    days: 10,
                }
            })
        }),

    }),
});

export const {
    useGetCurrentWeatherQuery, 
    useLazyGetCurrentWeatherQuery,
    useGetHourlyForecastQuery,
    useLazyGetHourlyForecastQuery,
    useGetDailyForecstQuery,
    useLazyGetDailyForecstQuery
} = weatherApi;