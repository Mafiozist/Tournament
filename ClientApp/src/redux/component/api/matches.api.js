import { api } from "./api";

export const matchesApi = api.injectEndpoints({
    endpoints: builder => ({
        getMatches: builder.query({
            query: (idTourn) => `Tournaments/api/GetMatches?idTour=${idTourn}`,
            providesTags: (result, error, id) => [{
                type: 'matches',
                id:'idTourn'
            }]
        }),
        updateMatches: builder.mutation({
            query: (matches) => ({
                body: matches,
                url: 'Tournaments/api/UpdateMatches',
                method:'PUT',
            }),
            invalidatesTags: (result, error, id) => [{
                type:'matches',
                id
            }], 
        })
    }),})

export const {useGetMatchesQuery, useUpdateMatchesMutation} = matchesApi;