import { userFetchResult } from "./api"

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

export type postFormProps = {
    file                : File,
    setFile             : React.Dispatch<React.SetStateAction<File>>,
    fileValidation      : string,
    setFileValidation   : React.Dispatch<React.SetStateAction<string>>,
    src                 : string,
    setSrc              : React.Dispatch<React.SetStateAction<string>>,
    user                : userFetchResult,
    setModalOpen        ?: React.Dispatch<React.SetStateAction<boolean>>,
}
