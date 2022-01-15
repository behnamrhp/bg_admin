import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Reducers } from '../../utils/configs/constants/reducers';
import { baseUrl, limitTableData } from '../../utils/configs/constants/global';
import { page, apiTemplateType, apiTemplatePaginatedType, Final_result, resultFetchSkills } from '../../utils/configs/types/api';
import { createEntityAdapter } from '@reduxjs/toolkit';

const skillsTag:string       = 'SkillTag';

const skillsAdaptor = createEntityAdapter<resultFetchSkills>()

export const skillsApi = createApi({
    reducerPath : Reducers.skills,
    baseQuery   : fetchBaseQuery({
        baseUrl : baseUrl + '/skills',
    }),
    tagTypes    : [skillsTag],
    endpoints   : builder => ({
        getSkills : builder.query<Final_result<resultFetchSkills>,{page:number; user_id:number}>({
            query               :  ({page,  user_id}) => `get_admin?page=${page}&lim=${limitTableData}&user_id=${user_id}`,
            transformResponse   :  (response: apiTemplatePaginatedType<resultFetchSkills[]>) => {
                const result = response.result as resultFetchSkills[];

                const data = skillsAdaptor.addMany(
                    skillsAdaptor.getInitialState(),
                    result
                )
                const page  = response.page as page;
                const error = response.error;
                const final = { data, page, error };
                return final
            },
            providesTags : (result: Final_result<resultFetchSkills>, error , args) => {
                if(result.error) return [{type : skillsTag, id: 'PARTIAL-LIST'}];
                const data = result.data.ids;
                return [
                    ...data.map(id => ({type : skillsTag, id: +id})),
                    {type : skillsTag, id : 'PARTIAL-LIST'}
                ]
            }
        })
    })

})

export const { useGetSkillsQuery } = skillsApi;