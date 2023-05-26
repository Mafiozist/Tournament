import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

//createasyncthunc

export const participantsSlice = createSlice({//slice for every feature
    name: 'participants',
    initialState,
    reducers: {
        addToParticipants: (state, { payload}) => {
            //if(state.find(user => user.id == payload.id)) return; //There is a simillar person
            console.log('Внутри',payload)
            state.push(payload); 
            console.log('Новый стейт',state); 
        },
        removeFromParticipants: (state, { payload}) => { //Just change the del attr
            //console.log(state);
            let val = state.find(user => user.id == payload.id);
            if(!val) return;
            state.splice(state.indexOf(val),1);
        },
        updateParticipant: (state, {payload})=>{
            state[state.findIndex(i=> i.id == payload.id)] = payload;
        },
    }
})

export const { actions, reducer } = participantsSlice;