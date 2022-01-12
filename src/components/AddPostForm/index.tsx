import { Button } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { required, staticMsgs, customSwal } from '../../utils/helpers/viewHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Alert } from '../Alert';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { wrapFileForms } from '../../HOC/WrapFileForm';
import { postFormProps } from './../../utils/configs/types/global'
import { useAddPostMutation, useUpdatePostMutation } from './../../redux/fetches/post';
import { Loading } from '../Loading';



 const PostForm = ({setModalOpen, file, fileValidation, setFileValidation, setFile, src, user, isUpdate, updateParams}: postFormProps) => {  
    const [ content, setContent ] = useState<string>();
    const [ date, setDate ] = useState<string>();

    const [ addPostDispatch, resultAddPost ]        = useAddPostMutation();
    const [ updatePostDispatch, resultUpdatePost ]  = useUpdatePostMutation();

    //submit form and dispatch
    const submitForm = ({subject} : {subject :string}) => {
        if(!file) return setFileValidation(staticMsgs().validateNotImageEntered);
        if(!date || date === '') return setFileValidation("لطفا تاریخ پست را وارد کنید");
        const args = {
            subject,
            image : file,
            content,
            dateTime : date,
            token    : user.token
        };

        addPostDispatch(args);
    }

    const submitUpdateForm = ({subject} : {subject :string}) => {
        if(!file && !updateParams.image) return setFileValidation(staticMsgs().validateNotImageEntered);
        if(!date || date === '') return setFileValidation("لطفا تاریخ پست را وارد کنید");

        const args = {
            id : updateParams.id,
            subject,
            ...(file && {image : file}),
            content : content ? content : updateParams.content,
            dateTime : date ? date : updateParams.dateTime,
            token    : user.token
        };

        updatePostDispatch(args);
    }
    
    //close and check result
    useEffect(() => {
        if((resultAddPost.isSuccess && resultAddPost.data?.result) || (resultUpdatePost.isSuccess && resultUpdatePost.data?.result)) {
        
            setModalOpen(false);
             customSwal({
                title : staticMsgs().congrat,
                text  : isUpdate ? staticMsgs('پست').updateNewItem : staticMsgs('پست').savedNewItem,
                icon  : "success",
                showCancelButton: false,
                showConfirmButton: false,
            })
        }
    }, [resultAddPost, resultUpdatePost]);

    return (
        <div>
            <Loading isFullWidth={true} isVisible={(resultAddPost.isLoading || resultUpdatePost.isLoading)} />

            {fileValidation &&  (<Alert type='danger' text={fileValidation} isFullWidth={false} isVisible={!!fileValidation}/>) }
            {(resultAddPost.isError || (resultAddPost.data?.error)) &&  (<Alert type='danger' text={staticMsgs().errorServer} isFullWidth={false} isVisible={!!resultAddPost.data?.error}/>) }
            {(resultUpdatePost.isError || (resultUpdatePost.data?.error)) &&  (<Alert type='danger' text={staticMsgs().errorServer} isFullWidth={false} isVisible={!!resultUpdatePost.data?.error}/>) }

            <LocalForm className='form row' model='add_post' 
            onSubmit={(values => {
                    isUpdate ? 
                    submitUpdateForm(values) :
                    submitForm(values)
                    }
                )    
            }>
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
                defaultValue={(isUpdate)? updateParams.subject : ''}
                
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
                defaultValue={(isUpdate)? ((updateParams.content && updateParams.content != 'undefined') ? updateParams.content : '') : content}
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
                    {(src || isUpdate) && (<img className="addsliderImg" src={(isUpdate)? updateParams.image : src} />)}
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
                value={(isUpdate)? updateParams.dateTime : date}
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
                        {isUpdate ? 'بروزرسانی' : 'ذخیره'}
                </Button>
            </div>
            
        </LocalForm>
    </div>
    )
}

export const AddPostForm = wrapFileForms(PostForm)