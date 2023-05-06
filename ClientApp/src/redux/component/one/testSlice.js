import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

//console.log(initialState);

//createasyncthunc

export const testSlice = createSlice({//slice for every feature
    name: 'test',
    initialState,
    reducers: {
        addToTest: (state, { payload}) => {
            if(state.find(item => item.id == payload.id)) return;
            state.push(payload);   
        },
    }
})

export const { actions, reducer } = testSlice;