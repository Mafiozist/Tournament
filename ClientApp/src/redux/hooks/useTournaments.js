import { useSelector, shallowEqual } from 'react-redux'

export const useTournaments = () => {

    const { tournaments } = useSelector(state => state);

    return {tournaments}
}