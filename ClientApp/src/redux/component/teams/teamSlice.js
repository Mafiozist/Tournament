import { createSlice } from '@reduxjs/toolkit'
import { useGetTeamsQuery } from '../api/teams.api';

const initialState = [];

//createasyncthunc

export const teamSlice = createSlice({//slice for every feature
    name: 'teams',
    initialState,
    reducers: {

    }
})

export const { actions, reducer } = teamSlice;