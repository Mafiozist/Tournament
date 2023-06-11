import { api } from "./api";

export const matchesApi = api.injectEndpoints({
    endpoints: builder => ({
        getMatches: builder.query({
            query: (idTourn) => `Tournaments/api/GetMatches?idTour=${idTourn}`,
            providesTags: () => [{
                type: 'matches',
            }]
        }),
    }),
})

export const {useGetMatchesQuery} = matchesApi;