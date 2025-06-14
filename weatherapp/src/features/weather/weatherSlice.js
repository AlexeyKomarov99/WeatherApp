import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteCities: [],
    indexActivePage: 0,
    citiesWeatherData: {},
    temperatureUnits: 'Celsius', // Celsius || Fahrenheit
}

const featuredFavoritesCities = () => {
    const stored = localStorage.getItem('featured-cities-list');
    return stored ? JSON.parse(stored) : [];
}
initialState.favoriteCities = featuredFavoritesCities();

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        addCityFavorites: {
            reducer(state, action) {
                const existCity = state.favoriteCities.some(city =>
                    city.cityId === action.payload.cityId
                )
                if(!existCity) {
                    state.favoriteCities.push(action.payload);
                }
            },
            prepare(
                cityId, 
                lat, 
                lon, 
                cityName, 
                region, 
                country, 
                currentTime,
                weatherDescr,
                currentTemp_c,
                currentTemp_f,
                minTemp_c,
                minTemp_f,
                maxTemp_c,
                maxTemp_f,
                is_day,
            ) {
                return {
                    payload: {
                        cityId,
                        lat,
                        lon,
                        cityName,
                        region,
                        country,
                        currentTime,
                        weatherDescr,
                        currentTemp_c,
                        currentTemp_f,
                        minTemp_c,
                        minTemp_f,
                        maxTemp_c,
                        maxTemp_f,
                        is_day
                    }
                }
            }
        },
        deleteCityFavorites: {
            reducer(state, action) {
                state.favoriteCities = state.favoriteCities.filter(
                city => city.cityId !== action.payload
            )
            }
        },
        setCityWeatherData: (state, action) => {
            state.citiesWeatherData[action.payload.cityId] = action.payload.data;
        },
        updateAllCitiesWeather: (state, action) => {
            state.citiesWeatherData = action.payload;
        },
        setIndexActivePage: (state, action) => {
            state.indexActivePage = action.payload;
        },
        setTemperatureUnits: (state, action) => {
            state.temperatureUnits = action.payload;
        },
        reorderFavoriteCities: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const [movedCity] = state.favoriteCities.splice(fromIndex, 1); // Удаляем город из старой позиции
            state.favoriteCities.splice(toIndex, 0, movedCity); // Вставляем в новую позицию
        },
    }
});

export const {
    addCityFavorites,
    deleteCityFavorites,
    setCurrentLocation,
    setIndexActivePage,
    setCityWeatherData,
    updateAllCitiesWeather,
    setTemperatureUnits,
    reorderFavoriteCities,
} = weatherSlice.actions;
export default weatherSlice.reducer;