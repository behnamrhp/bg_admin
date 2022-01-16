import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../../utils/configs/constants";
import { limitTableData } from "../../utils/configs/constants/global";
import { apiTemplatePaginatedType, Final_result, page, resultFetchHabits } from "../../utils/configs/types/api";


const habitTags:string = "HabitTag";

const habitsAdaptor = createEntityAdapter<resultFetchHabits>();

export const habitsApi = createApi({
    reducerPath : 'habits',
    baseQuery : fetchBaseQuery({
        baseUrl     : baseUrl + '/habit'
    }),
    tagTypes    : [ habitTags ],
    endpoints   : builder => ({
        getHabit    : builder.query<Final_result<resultFetchHabits>, {page:number; user_id:number}>({
            query : ({page,  user_id}) => `get_admin?page=${page}&lim=${limitTableData}&user_id=${user_id}`,
            transformResponse : (response : apiTemplatePaginatedType<resultFetchHabits[]>) => {

                const data = habitsAdaptor.addMany(
                    habitsAdaptor.getInitialState(),
                    response.result as resultFetchHabits[]
                );

                const page  = response.page as page;

                const error = response.error;
                
                return { data, page, error }
            },
            providesTags : (result : Final_result<resultFetchHabits>, error, args) => {
                if(result.error) return [{type: habitTags, id: 'PARTIAL-LIST'}];

                const data = result.data.ids;
                return [
                    ...data.map(id => ({type: habitTags, id : +id})),
                    {type: habitTags, id: 'PARTIAL-LIST'}
                ]
            }
        })
    })
})

export const { useGetHabitQuery } = habitsApi;