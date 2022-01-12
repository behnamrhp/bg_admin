import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Reducers } from "../../utils/configs/constants";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginThunk } from "../../redux/slices/userSlice";
import { loginArg } from "../../utils/configs/types/global";
import { Navigate } from "react-router-dom";
import { useCheckNotEmptyObject } from "../../hooks/useCheckEmptyObject";
import { useState } from "react";
import { useEffect } from "react";
import { Loading } from "../../components/Loading";
import { AnimatePresence, motion } from 'framer-motion';
import { Alert } from "../../components/Alert";
import { required, validEmail, minLength } from "../../utils/helpers/viewHelpers";



/**
 * @todo add error handle messge
 */
export const LoginForm = () => {
    const Dispatch                          = useAppDispatch();
    let {data, error, isLoading}            = useAppSelector(state => state.user);
    //to disable button to mutilple click after clicked
    const [disableButton, setDisableButton] = useState<boolean>(false);
    //check users data existed 
    const checkNotEmptyUser                 = useCheckNotEmptyObject(data);
    //for check and show init parameters from user saved data with redux-persist
    const [isFirstLoad, setIsFirstLoad]     = useState<boolean>(true);

    const  loginSubmit = ({email, password}: loginArg) => {
        setDisableButton(true);
        setIsFirstLoad(false);    
        if(email && password) Dispatch(loginThunk({email, password}));
    }

    useEffect(() => {
        
        //to reEnable button after not logined
        if(!checkNotEmptyUser) setDisableButton(false)
        
    }, [data])

    

     //check login
     if(checkNotEmptyUser){
        return <Navigate to="/" />
    }

    return (
        <>
    {error && typeof error === 'string'  && !isFirstLoad && (
        <Alert isVisible={(error && !isFirstLoad)} isFullWidth={true} type='danger' text={(error === 'Network Error') ? 'اختلالی در اتصال بوجود آمده لطفا بعدا تلاش کنید' : error} />
    )}
    <Loading isFullWidth={true} isVisible={(isLoading && !isFirstLoad)}/>  

    <AnimatePresence exitBeforeEnter>
        {(!isLoading || isFirstLoad) && (
              <motion.div
              initial    = {{opacity : 0}}
              animate    = {{opacity : 1}}
              exit       = {{opacity : 0}}
              transition = {{delay : .3}}
              >
                  <LocalForm className="form" model={Reducers.user} onSubmit={(values => loginSubmit(values))}>
                      <div className="header w-100">
                          <h5>ورود</h5>
                      </div>
                      <div className="content">
                          <div className="input-group input-lg">
                              <Control.text model=".email"
                              type="text"
                              className="form-control h-auto"
                              placeholder="ایمیل خود را وارد کنید"
                              validators={{
                                  required,
                                  validEmail,
                                  
                              }} />
                              <span className="input-group-addon">
                                  <FontAwesomeIcon icon={faEnvelope} />
                              </span>
                          </div>
                          <Errors
                      className="text-danger mb-3"
                      model=".email"
                      show="touched"
                      messages={{
                          validEmail: "لطفا آدرس ایمیل خود را بصورت صحیح وارد کنید ",
                      }} />
                          <div className="input-group input-lg">
                              <Control.text  type="password"
                              model=".password"
                              placeholder="رمز عبور"
                              className="form-control h-auto"
                              validators={{
                                  required,
                                  minLength: minLength(6)
                              }} />
                              <span className="input-group-addon">
                                  <FontAwesomeIcon icon={faLock} />
                              </span>
                          </div>
                          <Errors 
                      className="text-danger"
                      model=".password"
                      show="touched"
                      messages={{
                          minLength: "پسورد خود را بصورت صحیح وارد کنید ",
                      }} />
                          <div className="footer text-center">
                              <button
                                  className={`btn l-cyan btn-round btn-lg btn-block waves-effect waves-light ${(checkNotEmptyUser || disableButton)? 'disabled' : ''}`}>ورود</button>
                          </div>
                      </div>
                  </LocalForm>
              </motion.div>
        )}
      
    </AnimatePresence>
    
  
        </>
        
    )
} 