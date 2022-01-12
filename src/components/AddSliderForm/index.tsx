import { useAppSelector } from '../../redux/hooks';
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import { Alert } from '../Alert';
import { Button } from 'reactstrap';
import { useAddSliderMutation } from './../../redux/fetches/slider';
import { userFetchResult } from '../../utils/configs/types/api';
import { Loading } from '../Loading';
import { byteToMb, staticMsgs, customSwal, fileReader } from '../../utils/helpers/viewHelpers';
import { maxFileSize } from '../../utils/configs/constants/global';



export const AddSliderForm = ({setModalOpen})  => {
    //for send file to backend
    const [ file , setFile]  = useState<File | null>(null);
    //for show image 
    const [ src , setSrc ]   = useState<string | null>(null);
    const [ fileValidation, setFileValidation ] = useState<false | string>(false);
    const user = useAppSelector(state => state.user.data) as userFetchResult;

    //add slider rtk query
    const [ addSliderDispatch, addSliderResult ] = useAddSliderMutation();

    //submit button handler for dispatch file
    const submitSlider = () => {
        //check file not entered
       if(!file) return setFileValidation(staticMsgs().validateNotImageEntered);
       addSliderDispatch({slider : file , token : user.token});
    }

    //set file and load image src
    useEffect(() => {
        if(!file) return;
        
        const size = byteToMb(file.size);
        const type = file.type;
        if( size > maxFileSize ) return setFileValidation(staticMsgs(maxFileSize).validateMaxFileSize);
        if(type !== "image/png" && type !== "image/jpg" && type !== "image/jpeg") return setFileValidation(staticMsgs().validateFileType);

        fileReader(file, setSrc);
    }, [file]);

    //close and check result
    useEffect(() => {
        if(addSliderResult.isSuccess && addSliderResult.data?.result) {
        
            setModalOpen(false);
             customSwal({
                title : staticMsgs().congrat,
                text  : staticMsgs('اسلاید').savedNewItem,
                icon  : "success",
                showCancelButton: false,
                showConfirmButton: false,
            })
        }
    }, [addSliderResult]);


    return (
        <div>
            <Loading isFullWidth={true} isVisible={(addSliderResult.isLoading)} />
            
            {fileValidation &&  (<Alert type='danger' text={fileValidation} isFullWidth={false} isVisible={!!fileValidation}/>) }
            {(addSliderResult.isError || (addSliderResult.data?.error)) &&  (<Alert type='danger' text={staticMsgs().errorServer} isFullWidth={false} isVisible={!!addSliderResult.data?.error}/>) }
            <div className='mb-3'>برای انتخاب عکس برروی کادر زیر کلیک کنید</div>

            <label htmlFor="addSliderInput" className="addSliderLabel mx-auto d-flex justify-content-center align-items-center pointer mb-3">
                <FontAwesomeIcon icon={faPlus} />
                {src && (<img className="addsliderImg" src={src} />)}
            </label>
            <input 
            type="file" 
            id="addSliderInput" 
            className="d-none" 
            accept=".jpg,.jpeg,.png,.gif"
            onChange={(e) => setFile(e.target.files[0])}
            />
            <Button 
            color='success'
            onClick={submitSlider}
            >
                ثبت
            </Button>
        </div>
    )
}