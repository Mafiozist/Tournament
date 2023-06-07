import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducer as testReducer } from '../component/tests/testSlice'
import { reducer as participantsReducer } from '../component/participants/participantsSlice'
import { reducer as matchesReducer } from '../component/tournaments/matchSlice'
import { reducer as tournReducer } from '../component/tournaments/matchSlice'
import { reducer as teamsReducer } from '../component/teams/teamSlice'
import {api} from './api/api'

const IsDevelopmentMode = true;

const reducers = combineReducers({
    test: testReducer,
    participants: participantsReducer,
    matches: matchesReducer,
    tournaments: tournReducer,
    teams: teamsReducer,
    [api.reducerPath]: api.reducer,
})

export const store = configureStore({
    reducer: reducers,
    devTools: IsDevelopmentMode,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(api.middleware),
})