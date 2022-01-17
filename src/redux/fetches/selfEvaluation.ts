import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../utils/configs/constants";
import { apiTemplatePaginatedType, Final_result, resultFetchSelfEvaluation, apiTemplateType, FinalSelfEvaluationQuestionTemp } from '../../utils/configs/types/api';


const selfEvaluationTags:string = "SelfEvaluationTag";

const selfEvaluationAdaptor = createEntityAdapter<resultFetchSelfEvaluation>();

export const selfEvaluationApi = createApi({
    reducerPath : 'selfEvaluationScores',
    baseQuery : fetchBaseQuery({
        baseUrl     : baseUrl + '/self-evaluation-questions'
    }),
    tagTypes    : [ selfEvaluationTags ],
    endpoints   : builder => ({
        selfEvaluationQuestionsScores    : builder.query<FinalSelfEvaluationQuestionTemp<resultFetchSelfEvaluation>, {user_id:number}>({
            query : ({user_id}) => `get_admin?user_id=${user_id}`,
            transformResponse : (response : apiTemplateType<resultFetchSelfEvaluation>) => {

                const data = selfEvaluationAdaptor.addMany(
                    selfEvaluationAdaptor.getInitialState(),
                    response.result as resultFetchSelfEvaluation[]
                );

                const error = response.error;
                
                const results = {
                    1 : 0,
                    2 : 0,
                    3 : 0,
                    4 : 0,
                    5 : 0,
                    6 : 0,
                    7 : 0,
                    8 : 0
                }
                data.ids.forEach(id => {
                    const quest         = data.entities[id];
                    const section       = +quest.section;
                    const score         = +quest.score;
                    results[section]    += score;
                })
                return { data, error, results }
            },
            providesTags : (result : FinalSelfEvaluationQuestionTemp<resultFetchSelfEvaluation>, error, args) => {
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