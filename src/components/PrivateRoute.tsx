import { useCheckNotEmptyObject } from "../hooks/useCheckEmptyObject";
import { Login } from '../pages/login';
import { useAppSelector } from '../redux/hooks';
import { Layout } from '../pages/Layout/index';
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * @todo add async check user token exist but remove cache
 */
export const PrivateRoute = () => {
    const user = useAppSelector(state => state.user.data);
    const [selUser, setSelUser] = useState(user);
    const checkEmptyUser = useCheckNotEmptyObject(selUser);

    useEffect(() => {
        setSelUser(user);
    },[user]);

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