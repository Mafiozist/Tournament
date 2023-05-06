import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../component/one/testSlice';
import { bindActionCreators } from '@reduxjs/toolkit'

const rootActions = {
    ...actions
}

export const useActions = () => {
    const dispatch = useDispatch();


    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);//Постоянно ссылка изменяться не будет, для оптимизация кэша
}