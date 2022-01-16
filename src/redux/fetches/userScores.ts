import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../utils/configs/constants";
import { limitTableData } from "../../utils/configs/constants/global";
import { apiTemplatePaginatedType, Final_result, page, resultFetchUserScores } from "../../utils/configs/types/api";


const scoreTags:string = "UserScoresTag";

const userScoreAdaptor = createEntityAdapter<resultFetchUserScores>();

export const userScoresApi = createApi({
    reducerPath : 'userScores',
    baseQuery : fetchBaseQuery({
        baseUrl     : baseUrl + '/user/score'
    }),
    tagTypes    : [ scoreTags ],
    endpoints   : builder => ({
        getUserScores    : builder.query<Final_result<resultFetchUserScores>, {page:number; user_id:number}>({
            query : ({page,  user_id}) => `get_admin?page=${page}&lim=${limitTableData}&user_id=${user_id}`,
            transformResponse : (response : apiTemplatePaginatedType<resultFetchUserScores[]>) => {

                const data = userScoreAdaptor.addMany(
                    userScoreAdaptor.getInitialState(),
                    response.result as resultFetchUserScores[]
                );

                const page  = response.page as page;

                const error = response.error;
                
                return { data, page, error }
            },
            providesTags : (result : Final_result<resultFetchUserScores>, error, args) => {
                if(result.error) return [{type: scoreTags, id: 'PARTIAL-LIST'}];

                const data = result.data.ids;
                return [
                    ...data.map(id => ({type: scoreTags, id : +id})),
                    {type: scoreTags, id: 'PARTIAL-LIST'}
                ]
            }
        })
    })
})

export const { useGetUserScoresQuery } = userScoresApi;