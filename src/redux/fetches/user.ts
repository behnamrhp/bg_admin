import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { Reducers, baseUrl, apiRoute } from "../../utils/configs/constants";
import { userFetchResult } from '../../utils/configs/types/api';
import { RootState } from '../store/store';

// const customFetchBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' }
//   ): BaseQueryFn<
//     {
//       url: string
//       method: 'POST' | 'GET' 
//       data?: any
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data }): Promise<any> => {
//     try {
//         const form = new FormData();
//         for (let prop in data ){
//             form.append(prop, data[prop]);
//         }
//       const _result = await fetch( baseUrl+ '/' + url ,{  method, body: form}).then(resp => {
//         if(!resp.ok) throw new Error('your error is:' + resp.status)
//         const res = resp.json()
//         console.log(res);
//         if(!res) throw new Error('error');
//         return res;
//       }).then(resp=> resp).catch(err => {
//           throw err
//       })
     
//       return { _result  }

//     } catch (errMess) {
//       return errMess;
//     }
//   }


export const userApi = createApi({
    reducerPath : Reducers.user,
    baseQuery   : fetchBaseQuery({
        baseUrl : baseUrl
        
    }),
    
    tagTypes : ['wrong_login', 'currect'],
    endpoints   : builder => ({
        getUser  : builder.mutation<userFetchResult, Partial<FormData> >({
            query : (body) => ({
                url : `${apiRoute.admin}`,
                method : 'POST',
                body: body
                
            }),
            transformResponse: (response: any) => {
                console.log('data is: ', response);
               if(!response.result) return false
               return response.result
            }
        })
    })
});

export const { useGetUserMutation } = userApi;