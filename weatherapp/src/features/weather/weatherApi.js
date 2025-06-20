import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '1d654b744f264d048e0143051251206';
const BASE_URL = 'http://api.weatherapi.com/v1';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    // Автоматический поиск городов
    searchCities: builder.query({
      query: (searchText) => ({
        url: 'search.json',
        params: {
          q: searchText,
          key: API_KEY,
        }
      }),
    }),

    // Текущая погода по координатам
    getCurrentWeather: builder.query({
      query: (coords) => ({
        url: 'current.json',
        params: {
          q: coords ? `${coords.lat},${coords.lon}` : 'London',
          key: API_KEY,
        }
      }),
    }),

    // Почасовой прогноз на 1 день
    getHourlyForecast: builder.query({
      query: (coords) => ({
        url: 'forecast.json',
        params: {
          q: coords ? `${coords.lat},${coords.lon}` : 'London',
          key: API_KEY,
          days: 1
        }
      })
    }),

    // Прогноз на 10 дней
    getDailyForecast: builder.query({
      query: (coords) => ({
        url: 'forecast.json',
        params: {
          q: coords ? `${coords.lat},${coords.lon}` : 'London',
          key: API_KEY,
          days: 10
        }
      })
    }),

  }),
});

export const {
  useSearchCitiesQuery,
  useLazySearchCitiesQuery,
  useGetCurrentWeatherQuery, 
  useLazyGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
  useLazyGetHourlyForecastQuery,
  useGetDailyForecastQuery,
  useLazyGetDailyForecastQuery,
} = weatherApi;