import { api } from "./api";

export const tournamentsApi = api.injectEndpoints({
    endpoints: builder => ({
        createTournament: builder.mutation({
            query: (tourn) => ({
                url: `Tournaments/api/CreateTournament`,
                method: 'POST',
                headers: {
                    contentType: 'application/json'
                },
                body: tourn,
            }),
            invalidatesTags: (result) => [{
                type: 'tournaments',
                //id
            }],
            transformResponse: (responce) => responce,
        }),
        getTournaments: builder.query({
            query: () => 'Tournaments/api/GetTournaments',
            providesTags: () => [{
                type: 'tournaments',
            }]
        }),
    }),
})

export const { useGetTournamentsQuery, useCreateTournamentMutation } = tournamentsApi;