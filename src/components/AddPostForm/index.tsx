import { Button } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { required, fileReader, byteToMb, staticMsgs } from '../../utils/helpers/viewHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Loading } from '../Loading';
import { Alert } from '../Alert';
import { userFetchResult } from '../../utils/configs/types/api';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import type{Value} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { wrapFileForms } from '../../HOC/WrapFileForm';
import { postFormProps } from './../../utils/configs/types/global'

 const PostForm = ({file, fileValidation, setFileValidation, setFile, src, setSrc, user}: postFormProps) => {  
    const [content, setContent ] = useState<string>();
    const [date, setDate] = useState<Value>();


    //submit form and dispatch
    const submitForm = ({subject} : {subject :string}) => {
        if(!file) return setFileValidation(staticMsgs().validateNotImageEntered);
        if(!date || date === '') return setFileValidation("لطفا تاریخ پست را وارد کنید");
        const args = {
            subject,
            file,
            content,
            date
        }
    }
    
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

               
            </div>
            <h6>تاریخ پست</h6>
            <div className='form-group mb-3 col-12'>
                <DatePicker 
                calendar={persian}
                locale={persian_fa}
                value={date || ""}
                onChange={({day, year, month}: DateObject) =>{
                     setDate(`${year}/${month.number}/${day}`)
                     }}
                />

                
            </div>

            <div className='form-group mb-3 col-12'>
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

export const AddPostForm = wrapFileForms(PostForm)