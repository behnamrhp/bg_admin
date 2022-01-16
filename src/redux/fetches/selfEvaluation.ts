import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../utils/configs/constants";
import { limitTableData } from "../../utils/configs/constants/global";
import { apiTemplatePaginatedType, Final_result, page, resultFetchSelfEvaluation } from "../../utils/configs/types/api";


const selfEvaluationTags:string = "SelfEvaluationTag";

const selfEvaluationAdaptor = createEntityAdapter<resultFetchSelfEvaluation>();

export const selfEvaluationApi = createApi({
    reducerPath : 'selfEvaluationScores',
    baseQuery : fetchBaseQuery({
        baseUrl     : baseUrl + '/self-evaluation-questions'
    }),
    tagTypes    : [ selfEvaluationTags ],
    endpoints   : builder => ({
        selfEvaluationQuestionsScores    : builder.query<Final_result<resultFetchSelfEvaluation>, {page:number; user_id:number}>({
            query : ({page,  user_id}) => `get_admin?page=${page}&lim=${limitTableData}&user_id=${user_id}`,
            transformResponse : (response : apiTemplatePaginatedType<resultFetchSelfEvaluation[]>) => {

                const data = selfEvaluationAdaptor.addMany(
                    selfEvaluationAdaptor.getInitialState(),
                    response.result as resultFetchSelfEvaluation[]
                );

                const page  = response.page as page;

                const error = response.error;
                
                return { data, page, error }
            },
            providesTags : (result : Final_result<resultFetchSelfEvaluation>, error, args) => {
                if(result.error) return [{type: selfEvaluationTags, id: 'PARTIAL-LIST'}];

                const data = result.data.ids;
                return [
                    ...data.map(id => ({type: selfEvaluationTags, id : +id})),
                    {type: selfEvaluationTags, id: 'PARTIAL-LIST'}
                ]
            }
        })
    })
})

export const { useSelfEvaluationQuestionsScoresQuery } = selfEvaluationApi;