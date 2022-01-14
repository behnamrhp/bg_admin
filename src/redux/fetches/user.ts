import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reducers, baseUrl, apiRoute } from "../../utils/configs/constants";
import { userFetchResult, usersListFetchResult, apiTemplateType, Final_result, staticTemplateResult, booleanResult } from '../../utils/configs/types/api';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

const userTag:string = 'Users';
const userAdaptor = createEntityAdapter<usersListFetchResult>();

export const userApi = createApi({
    reducerPath : Reducers.users,
    baseQuery   : fetchBaseQuery({
        baseUrl : baseUrl + '/user'
        
    }),
    tagTypes : [userTag],
    endpoints   : builder => ({
        getUser  : builder.query<Final_result<usersListFetchResult>, string >({
            query : (token) => `${apiRoute.get}?token=${token}`,
            providesTags : (result: Final_result<usersListFetchResult>, error, args ) => {
                if(!result || !result.data) return [{type: userTag, id : 'PARTIAL-LIST'}];

                const data = result.data.ids;
                return [
                    ...data.map( id => ({type : userTag, id : +id})),
                    {type : userTag, id : 'PARTIAL-LIST'}
                ];

            },
            transformResponse: (result: apiTemplateType<usersListFetchResult>) => {

               const data = result.result as usersListFetchResult[];
                const key_to_compare = 'firstname';

                const collator = new Intl.Collator('fa');

                //make array of firstname
                const names = data.map(item => {
                    return item[key_to_compare] + '_' + item.id
                })

                //sort by key
                const sortedNames = names.sort(collator.compare);

                //make new sorted array
               const sorted_data =  sortedNames.map(item => {
                    const id = item.split('_')[1];

                    const found_user = data.find(user => {
                       return +user.id === +id
                    });

                    return found_user
                });

                const final = userAdaptor.addMany(
                                                    userAdaptor.getInitialState(),
                                                    sorted_data    
                                                )
               
               return {data: final , error : result.error}
            }
        }),
        delteUser : builder.mutation<booleanResult, {id : string, token : string}>({
            query(args){
                const formData = new FormData();
                formData.append('token', args.token);
                formData.append('id', args.id);

                return {
                    url        : apiRoute.delete,
                    method     : 'POST',
                    body       : formData
                }

            },
            invalidatesTags : (result : booleanResult, error, {id}) => {
                if(!result.result) return [];
                return [
                    {type : userTag, id},
                    {type : userTag, id : 'PARTIAL-LIST'}
                ]
            }

        })
    })
});

export const { useGetUserQuery, useDelteUserMutation } = userApi;