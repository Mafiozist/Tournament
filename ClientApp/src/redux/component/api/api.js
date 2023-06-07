import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
//const { env } = require('process');

//Base api for client-database
//Тут необходимо конфигурировать + не забывать про ревалидацию тегов
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['participants', 'tournaments', 'matches', 'group-matches', 'teams'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL
    }),
    endpoints: builder => ({
    }),
});
