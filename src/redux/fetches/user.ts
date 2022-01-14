import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reducers, baseUrl, apiRoute } from "../../utils/configs/constants";
import { userFetchResult, usersListFetchResult, apiTemplateType, Final_result, staticTemplateResult } from '../../utils/configs/types/api';
import { createEntityAdapter } from '@reduxjs/toolkit';


const userAdaptor = createEntityAdapter<usersListFetchResult>();

export const userApi = createApi({
    reducerPath : Reducers.users,
    baseQuery   : fetchBaseQuery({
        baseUrl : baseUrl + '/user'
        
    }),
    tagTypes : ['user'],
    endpoints   : builder => ({
        getUser  : builder.query<Final_result<usersListFetchResult> | staticTemplateResult, string >({
            query : (token) => `${apiRoute.get}?token=${token}`,
            transformResponse: (result: apiTemplateType<usersListFetchResult>) => {
               if(!result.result) return result;

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
        })
    })
});

export const { useGetUserQuery } = userApi;