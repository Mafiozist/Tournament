import { createSlice } from '@reduxjs/toolkit'
import cloneDeep from 'lodash/cloneDeep';

const initialState = [];

function linkMatches(data){
    if(data.length === 1) return;
    //Кол-во матчей должно быть нечетное
    //Берем средний элемент и говорим, что он корневой
    let rootIndex = Math.floor(data.length / 2); 
    //data[rootIndex].isTop = true;
    
    //У нас есть корневой элемент, теперь нужно прбежаться по массиву и обозначить дочерние матчи
    let leftSub = data.slice(0, rootIndex);
    let rightSub = data.slice(rootIndex + 1, data.length);
  
    let childrenIndex = Math.floor(leftSub.length / 2);
  
    leftSub[childrenIndex].nextMatchId = data[rootIndex].id;
    rightSub[childrenIndex].nextMatchId = data[rootIndex].id;
    
    linkMatches(leftSub);
    linkMatches(rightSub);
}

  export const matchSlice = createSlice({//slice for every feature
    name: 'matches',
    initialState,
    reducers: {
        createMatches: (state, { payload}) => {
            if(state.length !== 0) return;

            for(let i=0; i<payload.length; i++){
                state.push(payload[i]);
            }

            console.log('Создал матчи', state, payload)
        },
        updateMatch: (state, { payload}) => {
            //console.log('updateMatch', payload);
            let currMatch = state.find(i=>i.id === payload.match.id);

            console.log('currMatch', currMatch);

            if(payload.winIndex !== undefined){
                let winner = currMatch.participants[payload.winIndex];
                winner.isWinner = true;
                console.log('updWinner', winner);
            }

            console.log('updCurrMatch', payload);
        },
        moveWinnerForward: (state, { payload}) => {
            console.log('currMatch',payload);
            var match = state.find(i=> i.id === payload.id);
            let winner = match.participants.find(i=> i.isWinner);

            if(winner!==undefined){
                let copy = cloneDeep(winner);
                copy.isWinner = false;
                state.find(i => i.id === payload.nextMatchId).participants.push(copy);
            }
        },
    }
})

export const { actions, reducer } = matchSlice;