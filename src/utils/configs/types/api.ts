import { EntityState } from "@reduxjs/toolkit"

export type apiTemplateType<T> = {
    result : T[] | false
    error  : string | false
}

export type page = {
    total      : number,
    total_page : number,
    page       : number,
    limit      : number
}

export type apiTemplatePaginatedType<T> = {
    result : T | false
    error  : string | false
    page   : false | page
}

export type Final_result<T> = {
    error : false | string
    page  : page,
    data  : EntityState<T>
}

export type booleanResult = {
    result : boolean,
    error : string | false
}

export type  staticTemplateResult = {
    result: any,
    error: string | boolean
};

export type userFetchResult = { 
                                   id           : number;
                                   email        : string;
                                   firstname    : string;
                                   lastname     : string;
                                   is_dark_them : boolean;
                                   token        : string;
                               }

export type sliderFetchResult = {
    id      : number;
    image   : string;
}
