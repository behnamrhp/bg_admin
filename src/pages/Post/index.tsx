import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import { useDeletePostMutation, useGetPostQuery } from '../../redux/fetches/post';
import { Loading } from '../../components/Loading';
import { Pagination } from '../../components/Pagination';
import { baseUrl } from '../../utils/configs/constants/global';
import {  Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AddPostForm } from '../../components/AddPostForm';
import { updatePostParams } from '../../utils/configs/types/global';
import { useAppSelector } from '../../redux/hooks';
import { userFetchResult } from '../../utils/configs/types/api';
import { customSwal, staticMsgs } from '../../utils/helpers/viewHelpers';
import { Alert } from '../../components/Alert';



export const Post = () => {
    const [page , setPage] = useState<number>(1);
    const [ isModalOpen, setModalOpen ] = useState<boolean>(false);
    const [ isUpdate, setIsUpdate ] = useState<boolean>();
    const [ updateParams, setUpdateParams ] = useState<null | updatePostParams>(null);
    const user = useAppSelector(state => state.user.data) as userFetchResult;

    const {data, isLoading, isError}                = useGetPostQuery(page);
    const [ deletePostDispatch, resultDeletePost ]  = useDeletePostMutation();

    const deletePost = async (id : number | string) => {
        const alert_result = await customSwal({
            title : 'هشدار',
            text  : staticMsgs('پست').delete,
            icon  : "warning",
            showCancelButton: true,
        })
        if(!alert_result) return;

        const params = {
            id,
            token : user.token
        }
    
        await deletePostDispatch(params);
    }


    //render post items
    const PostItems = () => {
        return data.data.ids.map((id:number) => {
            const post  = data.data.entities[id];
            const image = baseUrl + '/images/posts/' + post.image;
            return (
            <div className="col-xl-4 col-lg-4 mt-4" key={'post_' + post.id} data-id={post.id}>
                <div className="card post-img-thumbnail  mb-3">
                    
                        <img src={image} alt="thumb1" className="thumbimg  wd-100p" />
                    
                    <div className="caption">
                        <h5>{post.subject}</h5>
                        <p className="post-details-caption">{(post.content && post.content != 'undefined') ? post.content : ''}</p>
                        <div className=" d-flex w-100 justify-content-around mt-2">
                            <button  className="btn ripple btn-danger button-delete-post" role="button"
                            onClick={() => {
                                deletePost(id)
                            }}
                            >
                                <FontAwesomeIcon icon={faTrash} className="ms-2"/>
                                حذف
                            </button>
                            <button className="btn ripple btn-primary button-delete-post " role="button"
                            onClick={() => {
                                setModalOpen(!isModalOpen);
                                setIsUpdate(true);
                                setUpdateParams({
                                    id          : post.id,
                                    subject     : post.subject,
                                    content     : post.content,
                                    dateTime    : post.dateTime,
                                    image
                                });
                            }}
                            >
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
        centered
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!setModalOpen)}
        >
            <ModalHeader 
            toggle={() => setModalOpen(!setModalOpen)}
            >
                افزودن پست
            </ModalHeader>

            <ModalBody>
               <AddPostForm  setModalOpen={setModalOpen} updateParams={updateParams} isUpdate={isUpdate}/>
            </ModalBody>
        </Modal>

            <Loading isFullWidth={false} isVisible={(isLoading || resultDeletePost.isLoading)} />
            {(resultDeletePost.isError || (resultDeletePost.data?.error)) &&  (<Alert type='danger' text={staticMsgs().errorServer} isFullWidth={true} isVisible={!!resultDeletePost.data?.error}/>) }
        
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
            
                        <button className="btn btn-block btn-primary col-12 col-sm-3 col-lg-2" 
                        onClick={() => {
                                    setModalOpen(!isModalOpen)
                                    setIsUpdate(false);
                                    setUpdateParams(null);    
                                }
                            }>
                            افزودن پست
                        </button>
                    </div>
                    <div className="row mt-3 post-content_scrollable">     

                        {PostItems()}

                    </div>
                    {data.page && +data.page.total_page !== 1 && (<Pagination page={data.page} setPage={setPage} />)}

                </div>
            </div>)}
        </>
    )
}