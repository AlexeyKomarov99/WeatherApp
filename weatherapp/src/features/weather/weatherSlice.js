import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteCities: [],
    currentLocation: null,
    isLoading: false,
    error: null
}

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
            prepare(cityId, cityName, temperature) {
                return {
                    payload: {
                        cityId,
                        cityName,
                        temperature
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