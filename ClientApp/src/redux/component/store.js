import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { reducer as testReducer } from '../component/one/testSlice'

const IsDevelopmentMode = true;

const reducers = combineReducers({
    test: testReducer,
})

export const store = configureStore({
    reducer: reducers,
    devTools: IsDevelopmentMode,
})