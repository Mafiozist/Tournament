import { api } from "./api";

export const teamsApi = api.injectEndpoints({
    endpoints: builder => ({
        createTeam: builder.mutation({
            query: (team) => ({
                body: {team},
                url: 'Teams/api/CreateTeam',
                method:'POST',
            }),
            invalidatesTags: ()=> [{
                type:'teams',
                //id
            }], 
            onQueryStarted: (e,a) => {console.warn(e,a)}
        }),
        getTeams: builder.query({
            query: () => 'Teams/api/GetTeams',
            providesTags: () => [{
                type: 'teams',
            }]
        }),
    }),
})

export const {useGetTeamsQuery, useCreateTeamMutation} = teamsApi;