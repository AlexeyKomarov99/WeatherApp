import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteCities: [],
    currentIndex: 0,
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
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload;
        },
        setTemperatureUnits: (state, action) => {
            state.temperatureUnits = action.payload;
        }
    }
});

export const {
    addCityFavorites,
    setCurrentLocation,
    setCurrentIndex,
    setCityWeatherData,
    updateAllCitiesWeather,
    setTemperatureUnits,
} = weatherSlice.actions;
export default weatherSlice.reducer;