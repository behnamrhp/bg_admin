import { fetchBaseQuery, createApi  } from "@reduxjs/toolkit/query/react";
import { apiRoute, baseUrl, limitContents, Reducers } from "../../utils/configs/constants";
import { apiTemplatePaginatedType, postFetchResult, Final_result } from '../../utils/configs/types/api';
import { createEntityAdapter } from "@reduxjs/toolkit";

const postTag:string = "Posts";

const postAdaptor = createEntityAdapter<postFetchResult>();

export const postApi = createApi({
    reducerPath : Reducers.post,
    baseQuery : fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes : [ postTag ],
    endpoints : builder => ({
        getPost : builder.query<Final_result<postFetchResult>, number>({
            query : (page) => apiRoute.post + `?page=${page}&lim=${limitContents}`,
            transformResponse : (result : apiTemplatePaginatedType<postFetchResult[]>) => {

                const data = postAdaptor.addMany(
                    postAdaptor.getInitialState(),
                    result.result as postFetchResult[]
                )
                const _page = result.page && result.page;
                const error = result.error;
                const final = { page  : _page , data, error};
                return final;

            },
            providesTags : (result : Final_result<postFetchResult>, error, page) => { 
                if(!result || !result.data) return [{type : postTag, id: 'PARTIAL-LIST'}];
                const data = result.data.ids;
                return [
                    ...data.map(id => ({type : postTag, id: +id}) ),
                    {type : postTag, id : 'PARTIAL-LIST'}
                ]
            } 
        })
    })
})

export const { useGetPostQuery } = postApi;

