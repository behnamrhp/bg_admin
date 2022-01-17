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
                                   id               : number;
                                   email            : string;
                                   firstname        : string;
                                   lastname         : string;
                                   is_dark_theme    : "1" | "0";
                                   token            : string;
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
    id                  : number;
    subject             : string;
    details             : string;
    importance          : number;
    difficulty          : number;
    fear                : number;
    score               : number;
    time                : string;
    repeat_period       : number;
    days_of_week        : number;
    days_of_month       : number;
    skills              : {
        subject             : string;
        percent             : number;
        failed_count        : number;
        success_count       : number;
    }
    
}                                

export interface resultFetchHabitLogs {
    id      : number;
    subject : string;
    date    : string;
    time    : string;
    status  : number;
}

export interface resultFetchUserScores {
    id      : number;
    date    : string;
    score   : number;
}

export interface resultFetchSelfEvaluation {
    id      : number;
    title   : string;
    section : number;
    score   : number;
}