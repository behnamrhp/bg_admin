import { fetchBaseQuery, createApi  } from "@reduxjs/toolkit/query/react";
import { apiRoute, baseUrl, limitContents, Reducers } from "../../utils/configs/constants";
import { apiTemplatePaginatedType, postFetchResult } from "../../utils/configs/types/api";

const postTag:string = "Posts";

// export const postApi = createApi({
//     reducerPath : Reducers.post,
//     baseQuery   : fetchBaseQuery({
//         baseUrl
//     }),
//     tagTypes : [postTag],
//     endpoints : builder => ({
//         getPost : builder.query<apiTemplatePaginatedType<postFetchResult[]>, number>({
//             query        : (page) => apiRoute.post + `?page=${page}&lim=${limitContents}`,

//         }),

//     })
// });  

export const postApi = createApi({
    reducerPath : Reducers.post,
    baseQuery : fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes : [ postTag ],
    endpoints : builder => ({
        getPost : builder.query<apiTemplatePaginatedType<postFetchResult[]>, number>({
            query : (page) => apiRoute.post + `?page=${page}&limit=${limitContents}`
        })
    })
})

export const { useGetPostQuery } = postApi;

