import { fetchBaseQuery, createApi  } from "@reduxjs/toolkit/query/react";
import { apiRoute, baseUrl, limitContents, Reducers } from "../../utils/configs/constants";
import { apiTemplatePaginatedType, postFetchResult, Final_result, apiTemplateType, postArgumentsAdd, booleanResult } from '../../utils/configs/types/api';
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
        }),
        addPost : builder.mutation<apiTemplateType<postFetchResult>, postArgumentsAdd>({
            query(args){
                const formData = new FormData();
                for(const key in args){
                    formData.append(key, args[key])
                }

                return {
                    url     : apiRoute.postAdd,
                    method  : 'POST',
                    body    : formData
                }

            },
            invalidatesTags : (result : apiTemplateType<postFetchResult>) => {
                if(!result.result) return [];
                return [{ type: postTag, id:'PARTIAL-LIST'}]
            }
            
        }),
        updatePost : builder.mutation<booleanResult, postArgumentsAdd>({
            query(args) {
                const formData = new FormData();
                for(const key in args){
                    formData.append(key, args[key])
                }

                return {
                    url     : apiRoute.postUpdate,
                    method  : 'POST',
                    body    : formData
                } 
            },
            invalidatesTags : (result : booleanResult) => {
                if(!result.result) return [];
                return [{type : postTag, id : 'PARTIAL-LIST'}]
            }
        }),
        deletePost : builder.mutation<booleanResult, {id : string | number , token : string}>({
            query(args) {
                const formData = new FormData();
                for(const key in args){
                    formData.append(key, args[key])
                }

                return {
                    url     : apiRoute.postDelete,
                    method  : 'POST',
                    body    : formData
                }
            },
            invalidatesTags : (result : booleanResult, error, {id}) => {
                if(!result.result) return [];
                return [
                    {type : postTag, id },
                    {type : postTag, id : 'PARTIAL-LIST'}
                ]
            }
        })

    })
})

export const { useGetPostQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = postApi;

