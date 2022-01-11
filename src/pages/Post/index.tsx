import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import thumb from './../../assets/images/backgrounds/01.png';
import { useGetPostQuery } from '../../redux/fetches/post';

export const Post = () => {
    const [page , setPage] = useState<number>(1);

    const {data, isLoading, isError, isSuccess} = useGetPostQuery(page);

    useEffect(() => {
     console.log(data);   
    })
    return(
        <>
            <div className="breadcrumb-header justify-content-between title-header">
                <div className="left-content">
                    <div>
                        <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">مدیریت پست ها</h2>
                    </div>
                </div>
            </div>
            
            <div className="container content-container">
                <div className="row">
                    <div className="col-12 row justify-content-end ps-4 add-content">
                        <button className="btn btn-block btn-primary col-12 col-sm-3 col-lg-2">
                            افزودن پست
                        </button>
                    </div>
                    <div className="row mt-3 content_scrollable">     

<<<<<<< HEAD
                            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 mt-4">
=======
                            <div className="col-xl-4 col-lg-4 mt-4">
>>>>>>> 698db325c7ccaa281e85aa01dc1111042111a0a3
                                <div className="img-thumbnail  mb-3">
                                    
                                        <img src={thumb} alt="thumb1" className="thumbimg  wd-100p" />
                                    
                                    <div className="caption">
                                        <h5>Thumbnail label</h5>
                                        <p className="post-details-caption">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente vero corrupti similique aut dignissimos reiciendis vitae incidunt? Est voluptatibus, labore, quibusdam blanditiis illum repudiandae doloremque aliquid placeat dicta ipsam odit!.</p>
                                        <div className=" d-flex w-100 justify-content-around mt-2">
                                            <a href="#" className="btn ripple btn-danger button-delete-post" role="button">
                                                <FontAwesomeIcon icon={faTrash} className="ms-2"/>
                                                حذف
                                            </a>
                                            <a href="#" className="btn ripple btn-primary button-delete-post " role="button">
                                                <FontAwesomeIcon icon={faPen} className="ms-2"/>
                                                ویرایش
                                            </a>
                                        </div>
                                        <div className="d-flex justify-content-end mt-2 w-100">
                                            <small>1400/7/20</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>

                </div>
            </div>
        </>
    )
}