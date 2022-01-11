export type loginArg = {
    "email" : string,
    "password" : string,
}

export interface AlertyTypes {
    type         : 'success' | 'info' | 'warning' | 'danger';
    text         : string;
    isFullWidth  : boolean;
    isVisible    : boolean;
}

export interface swalTypes {
    title               :  string,
    text               ?: string, 
    icon                : 'warning' | 'success' | 'info', 
    showCancelButton    : boolean,
    showConfirmButton   ?: boolean,
}