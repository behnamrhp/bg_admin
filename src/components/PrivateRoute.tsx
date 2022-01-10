import { useCheckNotEmptyObject } from "../hooks/useCheckEmptyObject";
import { Login } from '../pages/login';
import { useAppSelector } from '../redux/hooks';
import { Layout } from '../pages/Layout/index';
import { Outlet } from "react-router-dom";

/**
 * @todo add async check user token exist but remove cache
 */
export const PrivateRoute = () => {
    const user = useAppSelector(state => state.user.data);
    const checkEmptyUser = useCheckNotEmptyObject(user);

    return (!checkEmptyUser ? 
    <Login />
     :
    <div className='main-content app-content h-100'>
        <Layout >
            <Outlet />
        </Layout>
    </div>
     ) 
    
}