import { useSelector, shallowEqual } from 'react-redux'

export const useTest = () => {

    const { test } = useSelector(state => state);

    return {test}
}