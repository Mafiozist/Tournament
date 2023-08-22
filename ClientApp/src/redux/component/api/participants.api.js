
import { api } from "./api";

export const participantsApi = api.injectEndpoints({
    endpoints: builder => ({
        getParticipants: builder.query({
            query: () => `Participants/api/GetParticipants`,
            providesTags: (result, error, id) => 
                result? 
                    [
                        ...result.map(({id})=> ({type: "participants", id})),
                        {type: 'participants', id:'id'}
                    ] 
                    : [{type: 'participants', id:'id'}],
        }),
        getParticipant: builder.query({
            query: (id) => `Participants/api/GetParticipant?id='${id}'`,
            providesTags: (result, error, id) => [{type: 'participants', id}]
        }),
        editOrCreateParticipant: builder.mutation({
            query: (person) => ({
                body: person,
                url: 'Participants/api/EditOrCreateParticipant',
                method:'POST',
            }),
            invalidatesTags: (result, error, id) => ['participants'], 
        }),
        getRoles: builder.query({
            query: () => `Participants/api/GetRoles`,
        }),
    }),})

export const {useGetParticipantsQuery,useLazyGetParticipantQuery, useEditOrCreateParticipantMutation, useGetRolesQuery} = participantsApi;