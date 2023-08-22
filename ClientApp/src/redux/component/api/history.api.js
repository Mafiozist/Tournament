import { api } from "./api";

export const historyApi = api.injectEndpoints({//История пусть не хранится в кэше, пока
    endpoints: builder => ({
        getTeamsMembersHistory: builder.query({
            query: id => ({
                url: `History/api/GetTeamMembersHistory?idTeam=${id}`,
                method:'POST',
            }),
        }),
    }),
})

export const {useLazyGetTeamsMembersHistoryQuery} = historyApi;