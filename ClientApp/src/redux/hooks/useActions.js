import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../component/one/testSlice';
import { actions as participantsActions } from '../component/participants/participantsSlice';
import { bindActionCreators } from '@reduxjs/toolkit'

const rootActions = {
    ...actions,
    ...participantsActions
}

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}