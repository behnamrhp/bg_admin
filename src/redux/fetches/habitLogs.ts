import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../utils/configs/constants";
import { limitTableData } from "../../utils/configs/constants/global";
import { apiTemplatePaginatedType, Final_result, page, resultFetchHabitLogs } from "../../utils/configs/types/api";


const habitLogTags:string = "HabitLogTag";

const habitLogsAdaptor = createEntityAdapter<resultFetchHabitLogs>();

export const habitLogsApi = createApi({
    reducerPath : 'habitlogs',
    baseQuery : fetchBaseQuery({
        baseUrl     : baseUrl + '/habit/log'
    }),
    tagTypes    : [ habitLogTags ],
    endpoints   : builder => ({
        getHabitLog    : builder.query<Final_result<resultFetchHabitLogs>, {page:number; user_id:number}>({
            query : ({page,  user_id}) => `get_admin?page=${page}&lim=${limitTableData}&user_id=${user_id}`,
            transformResponse : (response : apiTemplatePaginatedType<resultFetchHabitLogs[]>) => {

                const data = habitLogsAdaptor.addMany(
                    habitLogsAdaptor.getInitialState(),
                    response.result as resultFetchHabitLogs[]
                );

                const page  = response.page as page;

                const error = response.error;
                
                return { data, page, error }
            },
            providesTags : (result : Final_result<resultFetchHabitLogs>, error, args) => {
                if(result.error) return [{type: habitLogTags, id: 'PARTIAL-LIST'}];

                const data = result.data.ids;
                return [
                    ...data.map(id => ({type: habitLogTags, id : +id})),
                    {type: habitLogTags, id: 'PARTIAL-LIST'}
                ]
            }
        })
    })
})

export const { useGetHabitLogQuery } = habitLogsApi;