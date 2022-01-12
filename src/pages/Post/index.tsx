import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import { useGetPostQuery } from '../../redux/fetches/post';
import { Loading } from '../../components/Loading';
import { Pagination } from '../../components/Pagination';
import { baseUrl } from '../../utils/configs/constants/global';
import {  Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AddPostForm } from '../../components/AddPostForm';

export const Post = () => {
    const [page , setPage] = useState<number>(1);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const {data, isLoading, isError} = useGetPostQuery(page);


    //render post items
    const PostItems = () => {
        return data.data.ids.map((id:number) => {
            const post = data.data.entities[id];
            return (
            <div className="col-xl-4 col-lg-4 mt-4" key={'post_' + post.id} data-id={post.id}>
                <div className="img-thumbnail  mb-3">
                    
                        <img src={baseUrl + '/images/posts/' + post.image} alt="thumb1" className="thumbimg  wd-100p" />
                    
                    <div className="caption">
                        <h5>{post.subject}</h5>
                        <p className="post-details-caption">{post.content}</p>
                        <div className=" d-flex w-100 justify-content-around mt-2">
                            <button  className="btn ripple btn-danger button-delete-post" role="button">
                                <FontAwesomeIcon icon={faTrash} className="ms-2"/>
                                حذف
                            </button>
                            <button className="btn ripple btn-primary button-delete-post " role="button">
                                <FontAwesomeIcon icon={faPen} className="ms-2"/>
                                ویرایش
                            </button>
                        </div>
                        <div className="d-flex justify-content-end mt-2 w-100">
                            <small>{post.dateTime}</small>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    }

    useEffect(() => {
        if(data?.page.total_page === 1 && +page !== 1) setPage(1); 
    }, [data])
    return(
        <>
        <Modal 
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        >
            <ModalHeader 
            toggle={() => setIsModalOpen(!isModalOpen)}
            >
                افزودن پست
            </ModalHeader>

            <ModalBody>
               <AddPostForm />
            </ModalBody>
        </Modal>

            <Loading isFullWidth={false} isVisible={(isLoading)} />
            <div className="breadcrumb-header justify-content-between title-header">
                <div className="left-content">
                    <div>
                        <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">مدیریت پست ها</h2>
                    </div>
                </div>
            </div>
            
            {data && !data.error && !isError &&  (<div className="container content-container">
                <div className="row">
                    <div className="col-12 row justify-content-end ps-4 add-content">
            
                        <button className="btn btn-block btn-primary col-12 col-sm-3 col-lg-2" onClick={() => setIsModalOpen(!isModalOpen)}>
                            افزودن پست
                        </button>
                    </div>
                    <div className="row mt-3 content_scrollable">     

                        {PostItems()}

                    </div>
                    {data.page && +data.page.total_page !== 1 && (<Pagination page={data.page} setPage={setPage} />)}

                </div>
            </div>)}
        </>
    )
}