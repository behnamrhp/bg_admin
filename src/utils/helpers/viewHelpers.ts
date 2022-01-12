import { Dispatch, SetStateAction } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { swalTypes } from '../configs/types/global'; 

export const toggleSidebarButton = () => {
    document.querySelector('.app').classList.toggle('sidenav-toggled');
}

export const toggleSubItems = (isUserExpanded:boolean, setIsUserExpanded: Dispatch<SetStateAction<boolean>>) => {
    const button   = document.getElementById('userContainer');
    const subItems = button.querySelector('.slide-menu') as HTMLElement;
    const childItems  = subItems.querySelectorAll('li');
    const itemsLength = childItems.length;
    const itemsHeigth = childItems[0].offsetHeight;

    const subItemsHeight = !isUserExpanded ? (itemsHeigth * itemsLength) + 6 + 'px' : '0px';

    subItems.style.height = subItemsHeight;
    setIsUserExpanded(!isUserExpanded);

}


export const customSwal = async ({title, text, icon, showCancelButton, showConfirmButton}: swalTypes) => {
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
        title,
        icon,
        showCancelButton,
        showConfirmButton : showConfirmButton ? showConfirmButton : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر',
        ...(text && {text}),

    }).then(result => {
        return result.isConfirmed;
    })

    return result
}

export const staticMsgs = (param: string | number = '') => {
    return {
        delete                  : `آیا از حذف ${param} مورد نظر اطمینان دارید؟`,
        validateNotImageEntered : `ابتدا فایل عکس مورد نظر خود را وارد کنید`,
        validateMaxFileSize     : `سایز عکس باید کمتر از ${param} باشد.`,
        validateFileType        : 'فرمت عکس باید یکی از موارد jpg, png و یا jpeg باشد',
        congrat                 : 'تبریک!',
        savedNewItem            : `${param} مورد نظر شما با موفقیت افزوده شد`,
        errorServer             : 'متاسفانه در برقراری ارتباط مشکلی بوجود آمده لطفا بعدا امتحان کنید'
    }
}

export const byteToMb = (byte: number) => {
    const toMb = 1048576;
    return byte / toMb;
}

export const required   =  (val: string):boolean =>{
    if(val && val.length) return true;
    return false
} 
export const minLength  =  (len: number) => (val: string) =>{
    if(val && (val.length >= len)) return true;
    return false;
} 
export const validEmail =  (val: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export const fileReader = (file: File, setSrc ) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', (e) => {
        const result = e.target.result;

        setSrc(result);
    })
    fileReader.readAsDataURL(file);
}