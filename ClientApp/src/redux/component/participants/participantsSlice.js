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
        setRemoveFromParticipants: (state, { payload}) => { //Just change the del attr
            //console.log(state);
            let val = state.find(user => user.id == payload.row.id);
            if(!val) return;
            console.log(payload);

            val.is_deleted = payload.is_deleted;
            val.loading = false;
        },
        updateParticipant: (state, {payload})=>{
            state[state.findIndex(i=> i.id == payload.id)] = payload;
        },
        setRowLoading: (state, {payload})=>{
            state[state.findIndex(i=> i.id == payload.row.id)].loading = payload.loading;
        },
    }
})

export const { actions, reducer } = participantsSlice;