import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { useState, useEffect } from 'react';
import { useDeleteSliderMutation, useGetSliderQuery } from '../../redux/fetches/slider';
import { Loading } from '../../components/Loading';
import { baseUrl } from '../../utils/configs/constants/global';
import { sliderFetchResult } from '../../utils/configs/types/api';
import { EntityState } from '@reduxjs/toolkit';
import { Pagination } from '../../components/Pagination';
import { customSwal, staticMsgs } from '../../utils/helpers/viewHelpers';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AddSliderForm } from '../../components/AddSliderForm';
import { Alert } from '../../components/Alert';


const deleteSlider = async (e:React.MouseEvent<HTMLElement, MouseEvent>, deleteSliderDispatch) => {
    const alert_result = await customSwal({
        title : 'هشدار',
        text  : staticMsgs('اسلایدر').delete,
        icon  : "warning",
        showCancelButton: true,
    })
    if(!alert_result) return;
    const slider   = e.target as HTMLElement;
    const sliderId = slider.parentElement.dataset.id;

    await deleteSliderDispatch(sliderId);
}


const sliderItems = (sliders: EntityState<sliderFetchResult>, deleteSliderDispatch) => {

    return sliders.ids.map(id => {
        const item = sliders.entities[id];
        return (
            <figure  className="slider-item col-12 col-sm-6 col-md-4 col-lg-3 mt-2" key={ 'slider_' + item.id } data-id={item.id}>
                <img src={baseUrl + '/images/sliders/' + item.image} className='img-thumbnail' alt="thumbnail" />
                <figcaption  className="removeIconContainer pos-absolute pd-25 bg-black-5 text-danger pointer" onClick={(e) => deleteSlider(e, deleteSliderDispatch)}>
                    <FontAwesomeIcon icon={faTimes} />
                </figcaption>
            </figure> 
        )
    })
}
export const Slider = () => {
    const [ page, setPage ]                 = useState<number>(1);
    const [ isModalOpen , setModalOpen ]    = useState<boolean>(false);
    const { data , isLoading, isError } = useGetSliderQuery(page);
    const [ deleteSliderDispatch, deleteResult ] = useDeleteSliderMutation();

    useEffect(() => {
    console.log(data);

        if(data?.page.total_page === 1 && +page !== 1) setPage(1); 
    }
    ,[data]);

    return (
        <>
        <Modal
        centered
        isOpen={isModalOpen}
        toggle={() =>  setModalOpen(!isModalOpen) }
        >
            <ModalHeader toggle={() =>  setModalOpen(!isModalOpen)}>
                افزودن اسلایدر
            </ModalHeader>
            <ModalBody>
                <AddSliderForm setModalOpen={setModalOpen}/>
            </ModalBody>
        </Modal>
        
        <Loading isFullWidth={false} isVisible={(isLoading || deleteResult.isLoading)} />
        {(deleteResult.isError || (deleteResult.data?.error)) &&  (<Alert type='danger' text={staticMsgs().errorServer} isFullWidth={true} isVisible={!!deleteResult.data?.error}/>) }
       
            <div className="breadcrumb-header justify-content-between title-header">
                <div className="left-content">
                    <div>
                        <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">مدیریت اسلاید ها</h2>
                    </div>
                </div>
            </div>
            {data && !isError && (
            <div className="container content-container">
                <div className="row">
                    <div className="col-12 row justify-content-end ps-4 add-content">
                        <button className="btn btn-block btn-primary col-12 col-sm-3 col-lg-2"
                        onClick={() =>  setModalOpen(!isModalOpen)}
                        >افزودن اسلایدر</button>
                    </div>
                    <div className="row mt-3 content_scrollable">

                    {sliderItems(data.data, deleteSliderDispatch)}    

                    </div>

                </div>
            </div>
        )}
                    {!isError && data && data.page && +data.page.total_page !== 1 && (<Pagination page={data.page} setPage={setPage} />)}

        </>
    )
}