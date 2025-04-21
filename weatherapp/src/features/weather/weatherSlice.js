import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: 'Moscow',
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload
        },
    }
});

export const {setCity} = weatherSlice.actions;
export default weatherSlice.reducer;