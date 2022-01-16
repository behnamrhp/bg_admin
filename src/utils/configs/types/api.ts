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
    page  ?: page,
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

export type postFetchResult  = {
    id       : number;
    subject  : string;
    dateTime : string;
    content  : string;
    image    : string;
}


export type postArgumentsAdd = {
    subject     : string;
    content     : string;
    dateTime    : string;
    image       : File;
    token       : string;
}

export type usersListFetchResult = {
                                        id : number;
                                        mobile : string;
                                        image : string;
                                        firstname : string;
                                        lastname : string;
                                        sex : 0 | 1;
                                        birthday : string;
                                        score : number;    
                                    }
export type resultFetchSkills = {
                                    subject : string;
                                    id      : number;
                                    percent : number;
                                    docount : number;
                                }

export interface resultFetchHabits {
    id              : number;
    subject         : string;
    details         : string;
    icon            : string;
    color           : string;
    importance      : number;
    difficulty      : number;
    fear            : number;
    score           : number;
    time            : string;
    repeated_period : number;
    days_of_week    : number;
    days_of_month   : number;
    create_data     : string;
}                                