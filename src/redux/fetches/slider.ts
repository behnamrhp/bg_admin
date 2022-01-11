import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { Reducers } from '../../utils/configs/constants';
import { baseUrl, limitContents } from '../../utils/configs/constants/global';
import { sliderFetchResult, apiTemplatePaginatedType, Final_result, booleanResult } from '../../utils/configs/types/api';
import { apiRoute } from '../../utils/configs/constants/apiRoutes';
import { createEntityAdapter } from '@reduxjs/toolkit';

const sliderTag:string = 'Sliders';

const sliderAdaptor = createEntityAdapter<sliderFetchResult>();

export const sliderApi = createApi({
    reducerPath : Reducers.slider,
    baseQuery   : fetchBaseQuery({
        baseUrl
    }),
    tagTypes    : [sliderTag],
    endpoints   : builder => ({
        getSlider : builder.query<Final_result<sliderFetchResult>, number>({
            query        : (page) => apiRoute.slider + `?page=${page}&lim=${limitContents}`,
            providesTags : (result : Final_result<sliderFetchResult>, error, page) => {
                if(!result || !result.data) return [{type: sliderTag, id : 'PARTIAL-LIST'}];

                const data = result.data.ids;
                return [
                    ...data.map( (id) => ({type : sliderTag, id: +id})),
                    {type: sliderTag, id : 'PARTIAL-LIST'}
                ]

            },
            transformResponse : (response: apiTemplatePaginatedType<sliderFetchResult[]>) => {
                const data = sliderAdaptor.addMany(
                    sliderAdaptor.getInitialState(),
                    response.result as sliderFetchResult[]
                )
                const page = response.page && response.page ;
                
                const final = {page ,data, error: response.error};
                return final
            }
                 

        }),
        deleteSlider : builder.mutation<booleanResult, string>({
            query(id) {
                const formData = new FormData();
                formData.append('slider_id', id);

                return {
                    url     : apiRoute.sliderDelete,
                    method  : 'POST',
                    body    : formData
                }
            },
            invalidatesTags: (result, error, id) =>{
                if(!result.result) return [];
                return [
                    {type : sliderTag, id },
                    {type : sliderTag, id : 'PARTIAL-LIST' }
                ]
            } 
        }),
        addSlider : builder.mutation<apiTemplatePaginatedType<sliderFetchResult>, {slider: File, token: string}>({
            query({slider, token}) {
                const formData = new FormData();
                formData.append('slider', slider);
                formData.append('token', token);

                return {
                    url     : apiRoute.sliderAdd,
                    method  : 'POST',
                    body    : formData
                }

            },
            invalidatesTags: (result) => {
                if(!result.result) return [];
                return [{type : sliderTag, id : 'PARTIAL-LIST' }]
            }
        })
    })
})


export const { useGetSliderQuery, useDeleteSliderMutation, useAddSliderMutation } = sliderApi