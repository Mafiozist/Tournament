import { api } from "./api";

export const teamsApi = api.injectEndpoints({
    endpoints: builder => ({
        editOrCreateTeam: builder.mutation({
            query: team => ({
                body: team,
                url: 'Teams/api/EditOrCreateTeam',
                method:'POST',
            }),
            //invalidatesTags: (retVal, args)=> ['teams'], 
            async onQueryStarted (team, {dispatch, queryFulfilled}){
                let patchResult = undefined;

                try {
                    const { data: result } = await queryFulfilled;
                    let patchResult = dispatch(
                        teamsApi.util.updateQueryData('getTeams', undefined, (draft) => {

                            let newTeam = draft?.find(i => i.id === team.id);
                            const retData = JSON.parse(result.data);
                            
                            if(team.id <= 0) draft?.push(retData);
                            else Object.assign(newTeam, retData);
                        })
                    );

                    if (result.status === 1) {
                        dispatch(
                            teamsApi.util.invalidateTags(
                                { type: 'teams', id: team.id },
                            )
                        );
                    }

                }
                catch (err) {
                    patchResult?.undo();
                    console.log('Возникла ошибка ревалидации', err)
                }
            }
        }),
        getTeams: builder.query({
            query: () => 'Teams/api/GetTeams',
            providesTags: (retVal, args) =>{
                var res = [
                    ...retVal.map(team=> ({type: 'teams', id: team.id}))
                ];
                console.log('Кэш кранится так', res)
                return res;
            }
        }),
        getTeam: builder.query({
            query: idTeam => `Teams/api/GetTeam?idTeam=${idTeam}`,
            providesTags: (retVal, args) => [{
                type: 'teams',
                id: args
            }]
        }),
        getTeamsMembers: builder.query({
            query: idTeam => 
            ({
                url:`Teams/api/GetTeamsMembers?idTeam=${idTeam}`,
                method:'POST'
            }),
            // providesTags: (result, error, arg) => {
            //     console.warn('getTeamsMembersValidation', result, arg)
            //     return result? [...result.data.map(({id})=> ({type: 'teams/members', id: arg}))] : ['teams/members']
            // },
        }),
        setDeleteTeam: builder.mutation({
            query: team => ({
                body: team,
                url: 'Teams/api/SetDeleteTeam',
                method:'POST',
            }),
            //invalidatesTags: ['teams'],
            async onQueryStarted (team, {dispatch, queryFulfilled}){

                const patchResult = dispatch(
                    teamsApi.util.updateQueryData('getTeams', undefined, (draft) => {

                        let newTeam = draft?.find(i=> i.id === team.id);
                        newTeam.is_deleted = !newTeam.is_deleted; 

                    })
                );

                try {
                    const {data: result} = await queryFulfilled;

                    if(result.status === 1){
                        dispatch(
                            teamsApi.util.invalidateTags(
                                { type: 'teams', id: team.id },
                            )
                        );
                    }else throw new Error(result.msg);

                }
                catch (err) {
                    patchResult.undo();
                    console.log('Возникла ошибка ревалидации', err)
                }
            }
        }),
    }),
})

export const {useGetTeamsQuery, useEditOrCreateTeamMutation, useLazyGetTeamsMembersQuery, useSetDeleteTeamMutation} = teamsApi;