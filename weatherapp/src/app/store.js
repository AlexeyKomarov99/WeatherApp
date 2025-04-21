import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../features/weather/weatherApi';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer, // данные для работы с API
        weather: weatherReducer, // данные локального состояния
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
})