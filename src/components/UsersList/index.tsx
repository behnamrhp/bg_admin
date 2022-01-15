import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { usersListPropTypes } from '../../utils/configs/types/global';
import { usersListFetchResult, userFetchResult } from '../../utils/configs/types/api';
import { EntityState } from '@reduxjs/toolkit';
import { Loading } from '../Loading';
import { useRef, useState, useEffect } from 'react';
import { useDelteUserMutation } from './../../redux/fetches/user';
import { useAppSelector } from '../../redux/hooks';
import { staticMsgs, customSwal } from '../../utils/helpers/viewHelpers';
import { Alert } from '../Alert';


export const UsersList = ({usersListData, usersListIsLoading, usersListIsError, selUser, setSelUser} : usersListPropTypes) => {
    const [ usersList, setUsersList ] = useState(usersListData.data);
    const searchRef = useRef<HTMLInputElement>();
    const admin = useAppSelector(state => state.user.data) as userFetchResult;

    const [ deleteUserDispatch, deleteUserResult ] = useDelteUserMutation();


    //alert for remove user
    const alertUserDelete = async (id : number) => {
        const alert_result = await customSwal({
            title : 'هشدار',
            text  : staticMsgs('کاربر').delete,
            icon  : "warning",
            showCancelButton: true,
        })
        if(!alert_result) return;
    
        await deleteUserDispatch({id : String(id), token: admin.token});
    }
    
    //render user list if deleted
    useEffect(() => {
        setUsersList(usersListData.data);
    },[usersListData])

    //users List render
    const userItems = (users : EntityState<usersListFetchResult> ) => {
        //for categorize users list
        let alphabetCat = null;
        
        return users.ids.map((id, i) => {
            const user = users.entities[id];
            if(!user) return null;
            return (
                <div key={`usersList_${user.id}`}>
    
                    {/* for categorize users list by first letter of names */}
                    {( (alphabetCat && alphabetCat !== user.firstname[0]) || !alphabetCat) && (<div className="main-contact-label" >
                        {alphabetCat = user.firstname[0]}
                    </div>)}
                    {/* /for categorize users list by first letter of names */}
    
                    <div className={+user.id === +selUser.id ? "main-contact-item selected" : "main-contact-item "} onClick={() => setSelUser(user)}>
                        { (user.image && user.image !== 'null' && user.image !== 'undefined') ?
                            (
                                <div className="main-img-user online">
                                        <img alt="user avatart" src={user.image}/>
                                </div>) 
                        :
                            (
                                <div className="avatar-min">
                                    {user.firstname[0]}
                                </div>
                            )
                        }
                        
                        <div className="main-contact-body">
                            <h6>{user.firstname + ' ' + user.lastname}</h6><span className="phone">{user.mobile}</span>
                        </div>
                        <button className="no-border-button main-contact-star remove-user-list" onClick={() => alertUserDelete(user.id)}>
                           <FontAwesomeIcon icon={faTrash}  />
                        </button>
                    </div>
                </div>
            )
        })
        
    }


    //change search input handler 
    const changeSearchHandler = () => {
        const value = searchRef.current.value;

        if( !value || typeof value === null )return  setUsersList(usersListData.data);

        const found_users = {
            ids: [],
            entities : {}
        }
        usersListData.data.ids.forEach(id => {
            const user = usersListData.data.entities[id];
            if(user.firstname.includes(value) || user.lastname.includes(value)){
                found_users.ids.push(id)
                found_users.entities[id] =  {...user}
                return true
            };
            return false
        });
        
        setUsersList(found_users);
    }

    return (
        <div className="main-content-left main-content-left-contacts">
                {(deleteUserResult.isError || (deleteUserResult.data?.error)) &&  (<Alert type='danger' text={staticMsgs().errorServer} isFullWidth={true} isVisible={!!deleteUserResult.data?.error}/>) }

                <div className="main-header-center mt-2 mx-2 d-lg-block">
                    <input onChange={changeSearchHandler} ref={searchRef} className="form-control" placeholder="کاربر مورد نظر را جستحو کنید ..." type="search" />
                    <button className="btn search-button">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>

			<div className="main-contacts-list" id="mainContactList">
				
                    {/* user item */}
                    <Loading isFullWidth={false} isVisible={(usersListIsLoading || deleteUserResult.isLoading)} />
                    { !usersListIsError && usersListData && !usersListData.error  && userItems(usersList)}
                    {/* /user item */}

			</div>
		</div>
    )
}