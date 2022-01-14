import { useGetUserQuery } from "../../redux/fetches/user"
import { UserPresentation } from "./presentation"
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userFetchResult } from '../../utils/configs/types/api';
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const Users = () => {
	const user = useAppSelector(state => state.user.data) as userFetchResult ;
	
	const { data : usersListData , isLoading : usersListIsLoading, isError : usersListIsError } = useGetUserQuery(user.token ? user.token : skipToken);

    return (
    <>
		<UserPresentation usersListData={usersListData} usersListIsLoading={usersListIsLoading} usersListIsError={usersListIsError}/>
	</>    
    )   
}