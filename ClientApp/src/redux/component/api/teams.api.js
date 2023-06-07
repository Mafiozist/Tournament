import { api } from "./api";

export const teamsApi = api.injectEndpoints({
    endpoints: builder => ({
        createTeam: builder.mutation({
            query: (name) => ({
                body: name,
                url: 'Teams/CreateTeam',
                method:'POST',
            }),
            invalidatesTags: ()=> [{
                type:'teams',
                //id
            }]
        }),
        getTeams: builder.query({
            query: () => 'Teams/GetTeams',
            providesTags: () => [{
                type: 'teams',
            }]
        }),
    }),
})

export const {useGetTeamsQuery, useCreateTeamMutation} = teamsApi;