import { useState, useEffect } from 'react';
import { fileReader, byteToMb, staticMsgs } from './../utils/helpers/viewHelpers';
import { maxFileSize } from './../utils/configs/constants/global';
import { useAppSelector } from '../redux/hooks';
import { userFetchResult } from '../utils/configs/types/api';

export const wrapFileForms = ComponentFileForm  => ({...props}) => {
    //for send file to backend
    const [file , setFile ] = useState<File | null>(null);
    //for show image 
    const [ src, setSrc ]   = useState<string | null>(null);
    const [ fileValidation, setFileValidation ] = useState<false | string>(false);
    const user = useAppSelector(state => state.user.data) as userFetchResult;

     //set file and load image src
     useEffect(() => {
        if(!file) return;
        
        const size = byteToMb(file.size);
        const type = file.type;
        if( size > maxFileSize ) return setFileValidation(staticMsgs(maxFileSize).validateMaxFileSize);
        if(type !== "image/png" && type !== "image/jpg" && type !== "image/jpeg") return setFileValidation(staticMsgs().validateFileType);

        fileReader(file, setSrc);
    }, [file]);


    return (
        <ComponentFileForm {...props} file={file} src={src} setFile={setFile} fileValidation={fileValidation} setFileValidation={setFileValidation} user={user}/>
    )
}
