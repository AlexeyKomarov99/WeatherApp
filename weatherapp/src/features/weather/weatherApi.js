import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_KEY = '00c30a45b6ced933e030cb31cee97371';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.openweathermap.org/data/3.0/'}),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query({
            query: (city) => ({
                url: 'weather',
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                }
            }),
        }),
    }),
});

export const { useGetWeatherByCityQuery } = weatherApi;