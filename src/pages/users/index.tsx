import { useGetUserQuery } from "../../redux/fetches/user"
import { UserPresentation } from "./presentation"
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userFetchResult } from '../../utils/configs/types/api';
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const Users = () => {
	const user = useAppSelector(state => state.user.data) as userFetchResult ;

	const resultQuery = useGetUserQuery(user.token ? user.token : skipToken);

	useEffect(() => {
		console.log(resultQuery);		
	}, [resultQuery])
    return (
    <>
		<UserPresentation />
	</>    
    )   
}