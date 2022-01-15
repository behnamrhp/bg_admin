import { useGetUserQuery } from "../../redux/fetches/user"
import { UserPresentation } from "./presentation"
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userFetchResult, usersListFetchResult } from '../../utils/configs/types/api';
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { userTab } from '../../utils/configs/constants/global';

export const Users = () => {
	const user = useAppSelector(state => state.user.data) as userFetchResult ;
	const { data : usersListData , isLoading : usersListIsLoading, isError : usersListIsError } = useGetUserQuery(user.token ? user.token : skipToken);
	const [ selUser, setSelUser ] = useState<usersListFetchResult>(usersListData?.data.entities[usersListData?.data.ids[0]]);
	const [ selTab, setSelTab ]   = useState<string>(userTab.skills);

	useEffect(() => {
		if(!selUser && usersListData && usersListData.data) setSelUser(usersListData.data.entities[usersListData?.data.ids[0]]);
	}, [usersListData]);
	
    return (
    <>
		<UserPresentation usersListData={usersListData} usersListIsLoading={usersListIsLoading} usersListIsError={usersListIsError} selUser={selUser} setSelUser={setSelUser} selTab={selTab} setSelTab={setSelTab}/>
	</>    
    )   
}