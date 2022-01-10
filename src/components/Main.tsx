import React from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import { AnimatePresence} from 'framer-motion';
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Home } from '../pages/Home/index';
import { Slider } from "../pages/Slider";
import { useAppSelector } from "../redux/hooks";
import { useCheckNotEmptyObject } from '../hooks/useCheckEmptyObject';
import { Login } from '../pages/login/index';
import storage from 'redux-persist/lib/storage';
import { useEffect } from 'react';

export const Main =  () => {

// useEffect(() => {
//     storage.removeItem("persist:bg_d");

//     const result = storage.removeItem("persist:bg_d");
//     console.log(result);
// },[]);

    const location = useLocation();
    const user = useAppSelector(state => state.user.data);
    const checkEmptyUser = useCheckNotEmptyObject(user);
   

    return(
        <div className="App">
                {checkEmptyUser && (<Sidebar />) }
                    {checkEmptyUser && (<Header />) }
                    <AnimatePresence exitBeforeEnter>
                        <Routes location={location} key={location.key}>                
                            <Route path="/" element={<PrivateRoute />} >
                                <Route path="/home" element={<Home />} />
                                <Route path="/slider" element={<Slider />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                        </Routes>
                    </AnimatePresence>
        </div>
    )
}