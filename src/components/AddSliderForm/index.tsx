import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import { Alert } from '../Alert';
import { Button } from 'reactstrap';
import { useAddSliderMutation } from './../../redux/fetches/slider';
import { Loading } from '../Loading';
import { staticMsgs, customSwal } from '../../utils/helpers/viewHelpers';
import { postFormProps } from './../../utils/configs/types/global'
import { wrapFileForms } from '../../HOC/WrapFileForm';

const SliderForm = ({setModalOpen, file, fileValidation, setFileValidation, setFile, src, setSrc, user}: postFormProps)  => {
    //add slider rtk query
    const [ addSliderDispatch, addSliderResult ] = useAddSliderMutation();

    //submit button handler for dispatch file
    const submitSlider = () => {
        //check file not entered
       if(!file) return setFileValidation(staticMsgs().validateNotImageEntered);
       addSliderDispatch({slider : file , token : user.token});
    }

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

export const AddSliderForm = wrapFileForms(SliderForm);