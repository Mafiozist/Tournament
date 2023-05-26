import { useSelector, shallowEqual } from 'react-redux'

export const useParticipants = (partId) => {

    const { participants } = useSelector(state => state);
    let members = partId? participants.find(i=> i.id === partId) : participants;
    console.log('Возвращаю из хука', members);

    return {members}
}