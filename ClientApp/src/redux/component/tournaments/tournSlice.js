import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const tournSlice = createSlice({//slice for every feature
    name: 'tournaments',
    initialState,
    reducers: {
        createTournament: (state, { payload}) => {
            //if(state.find(item => item.id == payload.id)) return;
            //console.log(state);
            //state.push(payload);   
        },
        deleteTournament: (state, { payload}) => {

        },
        updateTournament: (state, { payload}) => {

        },
    
        createGroupMatches: (state, { payload}) => {

        },
        createTournMatches: (state, { payload}) => {

        },
    }
})

export const { actions, reducer } = tournSlice;