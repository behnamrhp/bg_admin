import { useCheckNotEmptyObject } from "../hooks/useCheckEmptyObject";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Layout } from '../pages/Layout/index';
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTemp } from '../utils/helpers/index';
import { booleanResult, userFetchResult } from '../utils/configs/types/api';
import { apiRoute } from '../utils/configs/constants/apiRoutes';
import { logOutUser } from './../redux/slices/userSlice';

export const PrivateRoute = () => {
    const Dispatch              = useAppDispatch()
    const user                  = useAppSelector(state => state.user.data) as userFetchResult;
    const [selUser, setSelUser] = useState(user);
    const checkEmptyUser        = useCheckNotEmptyObject(selUser);
    const [ isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    //set user data 
    useEffect(() => {
        setSelUser(user);
        
    },[user]);

    // check for valid saved user
    useEffect(() => {
        if(checkEmptyUser && isFirstLoad){
        
            (async () =>{
                const result = await fetchTemp<{token : string, id: number}, booleanResult>(apiRoute.checkAdmin, 'POST', {token : selUser.token, id : selUser.id}) as { result : boolean, error : string | boolean};
                if(!result || result.error){
                    Dispatch(logOutUser())
                } 
            })()

            setIsFirstLoad(false);
        } 
        
    },[selUser])

    return (!checkEmptyUser ? 
    <Navigate to='/login' />
     :
    <div className='main-content app-content h-100'>
        <Layout >
            <Outlet />
        </Layout>
    </div>
     ) 
    
}