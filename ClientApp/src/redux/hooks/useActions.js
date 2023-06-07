import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../component/tests/testSlice';
import { actions as participantsActions } from '../component/participants/participantsSlice';
import { actions as tournActions } from '../component/tournaments/tournSlice';
import { actions as matchesActions } from '../component/tournaments/matchSlice';
import { bindActionCreators } from '@reduxjs/toolkit'

const rootActions = {
    ...actions,
    ...participantsActions,
    ...tournActions,
    ...matchesActions,
}

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}