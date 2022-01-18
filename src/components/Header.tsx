import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faSun,faMoon, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleSidebarButton } from '../utils/helpers/viewHelpers';
import { motion } from 'framer-motion';
import { headerVariants } from '../utils/configs/constants/animateVariants';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTemp } from './../utils/helpers/index';
import { isDarkModeReducer, logOutUser } from './../redux/slices/userSlice';
import { userFetchResult } from '../utils/configs/types/api';

export const Header = () => {
    const Dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.data) as userFetchResult;
    const [isDarkMode, setIsDarkMode] = useState<"1" | "0">(user.is_dark_theme);

    const isDarkModeHandler = async () => {
        setIsDarkMode((isDarkMode == "1") ? "0" : "1");
    }


    const clickLogOutHandler = async () => {
        Dispatch(logOutUser());
    }

    useEffect(() => {
        
        Dispatch(isDarkModeReducer(isDarkMode));
        fetchTemp<{token : string; isDark:"1" | "0"}, true>('admin/is-dark','POST',{token:user.token, isDark: isDarkMode})

        if(isDarkMode == "1") document.body.classList.add('dark-theme');
        else document.body.classList.remove('dark-theme');
    }, [isDarkMode])
    
    return (
    <motion.div className="main-header sticky side-header nav nav-item"
    variants={headerVariants}
    initial='hidden'
    animate='visible'   
    >
            <div className="container-fluid">
                <div className="main-header-left">
                    <div className="app-sidebar__toggle mobile_toggle_sidebar_button" data-bs-toggle="sidebar" onClick={toggleSidebarButton}>
                        <span className="open-toggle pointer">
                            <FontAwesomeIcon className="header-icon" icon={faBars} />
                        </span>
                        <span className="close-toggle pointer">
                            <FontAwesomeIcon className="header-icon" icon={faTimes} />
                        </span>
                    </div>
                </div>

                <div className="ps-2 d-flex w-auto">
                    <div className="d-flex align-items-center">
                        <input type="checkbox" className="checkbox" checked={(isDarkMode == "1") ? true : false} id="checkbox" onChange={isDarkModeHandler}/>
                        <label htmlFor="checkbox" className="label pointer">
                            <FontAwesomeIcon icon={faSun}  />

                            <FontAwesomeIcon icon={faMoon} />
                            <div className='ball'></div>
                        </label>    
                    </div>
                    
                <button title='خروج' className='no-border-button side-menu__item d-flex flex-row align-items-center me-5' onClick={clickLogOutHandler}>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faSignOutAlt} />     
                </button>
                </div>
                
                
                
            </div>

                
            
    </motion.div>
    )
}