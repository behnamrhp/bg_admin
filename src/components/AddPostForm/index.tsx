import { Button } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { required, fileReader, byteToMb, staticMsgs } from '../../utils/helpers/viewHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Loading } from '../Loading';
import { Alert } from '../Alert';
import { userFetchResult } from '../../utils/configs/types/api';
import { maxFileSize } from '../../utils/configs/constants/global';

export const AddPostForm = () => {
    const [file , setFile ] = useState<File | null>(null);
    const [content, setContent ] = useState<string>(' ');
    const [ src, setSrc ]   = useState<string | null>(null);
    const [ fileValidation, setFileValidation ] = useState<false | string>(false);
    const user = useAppSelector(state => state.user.data) as userFetchResult;


    //submit form and dispatch
    const submitForm = ({subject} : {subject :string}) => {
        if(!file) return setFileValidation(staticMsgs().validateNotImageEntered);
        const args = {
            subject,
            file,
            content
        }
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

    
    return (
        // <Loading isFullWidth={true} isVisible={(addSliderResult.isLoading)} />
        <div>
            {fileValidation &&  (<Alert type='danger' text={fileValidation} isFullWidth={false} isVisible={!!fileValidation}/>) }
            <LocalForm className='form row' model='add_post' onSubmit={(values => submitForm(values))}>
            <div className='form-group mb-3 col-12'>
                <label htmlFor='subject' >عنوان</label>
                
                <Control.text 
                id='subject'
                model='.subject' 
                className='form-control'
                placeholder='عنوان پست را وارد کنید'
                validators={{
                    required
                }}
                />
                <Errors
                className='text-danger'
                model='.subject'
                show='touched'
                messages={{
                    required : 'عنوان پست الزامی است'
                }}
                />
            </div>
            <div className='form-group mb-3 col-12'>
                <label htmlFor='content' >محتوا</label>
                <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id='content'
                className='form-control'
                placeholder='محتوا را وارد کنید'
                rows={6}
                ></textarea>
            </div>
            <div className='form-group mb-3 col-12'>
                <h6>تصویر پست</h6>
                <label htmlFor="addSliderInput" className="addPostLabel mt-2 d-flex justify-content-center align-items-center pointer mb-3">
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
                type='submit'
                >
                    ذخیره
                </Button>
            </div>
        </LocalForm>
    </div>
    )
}