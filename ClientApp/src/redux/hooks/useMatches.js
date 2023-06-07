import { useSelector, shallowEqual } from 'react-redux'

export const useMatches = () => {

    const { matches } = useSelector(state => state);
    return {matches}
}