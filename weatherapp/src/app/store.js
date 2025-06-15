import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../features/weather/weatherApi';
import weatherReducer from '../features/weather/weatherSlice';
import localStorageMiddleware from '../middleware/localStorageMiddleware';

// Загрузка начального состояния
const preloadedState = {
    weather: {
        favoriteCities: JSON.parse(localStorage.getItem('featured-cities-list')) || [],
    }
}

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
        weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Увеличиваем порог предупреждения до 100ms
                warnAfter: 100,
            }
        })
            .concat(weatherApi.middleware)
            .concat(localStorageMiddleware),
    preloadedState
});