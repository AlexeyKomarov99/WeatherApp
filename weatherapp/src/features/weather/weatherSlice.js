import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteCities: [],
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
                currentTemp,
                maxTemp,
                minTemp
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
                        currentTemp,
                        maxTemp,
                        minTemp
                    }
                }
            }
        },
        setCurrentLocation: {
            reducer(state, action) {
                state.currentLocation = action.payload;
            }
        }
    }
});

export const {
    addCityFavorites,
    setCurrentLocation,
} = weatherSlice.actions;
export default weatherSlice.reducer;