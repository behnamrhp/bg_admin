import axios, {AxiosPromise, AxiosResponse} from "axios";
import { apiTemplateType, staticTemplateResult } from './../configs/types/api';
import { baseUrl } from '../configs/constants/global';

export const fetchTemp =async <AT extends {[key: string] : any}, RT >(url: string, method : ('POST'| 'GET'), data: AT) =>{

    const form = new FormData();
    for (let prop in data ){
        form.append(prop, data[prop]);
    }

    return axios({
        url : (baseUrl+ '/' + url),
        method,
        data : form
    }).then((response: AxiosResponse<apiTemplateType<RT>>) => {
        const result = response.data;
        if(!result || result.error) throw new Error(result.error as string);

        return result
        
    }).catch((error:{message: string; stack: string}) => {
        return { error : error.message } 
    })
}