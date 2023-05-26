import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { reducer as testReducer } from '../component/one/testSlice'
import { reducer as participantsReducer } from '../component/participants/participantsSlice'

const IsDevelopmentMode = true;

const reducers = combineReducers({
    test: testReducer,
    participants: participantsReducer,
})

export const store = configureStore({
    reducer: reducers,
    devTools: IsDevelopmentMode,
})