import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faSun,faMoon } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleSidebarButton } from '../utils/helpers/viewHelpers';
import { motion } from 'framer-motion';
import { headerVariants } from '../utils/configs/constants/animateVariants';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userFetchResult, booleanResult } from '../utils/configs/types/api';
import { fetchTemp } from './../utils/helpers/index';
import { isDarkModeReducer } from './../redux/slices/userSlice';

export const Header = () => {
    const Dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.data);
    const [isDarkMode, setIsDarkMode] = useState<"1" | "0">(user.is_dark_theme);

    const isDarkModeHandler = async () => {
        setIsDarkMode((isDarkMode == "1") ? "0" : "1");
        console.log(isDarkMode);
        const result = await fetchTemp<{token : string; isDark:"1" | "0"}, true>('admin/is-dark','POST',{token:user.token, isDark: isDarkMode})
        if(!result.error) Dispatch(isDarkModeReducer((isDarkMode == "1") ? "0" : "1"));
        console.log(isDarkMode);

    }



    useEffect(() => {
        if(isDarkMode == "1") document.body.classList.add('dark-theme');
        else document.body.classList.remove('dark-theme');
    }, [user.is_dark_theme])
    
    return (
    <motion.div className="main-header sticky side-header nav nav-item"
    variants={headerVariants}
    initial='hidden'
    animate='visible'   
    >
            <div className="container-fluid">
                <div className="main-header-left">
                    <div className="app-sidebar__toggle" data-bs-toggle="sidebar" onClick={toggleSidebarButton}>
                        <span className="open-toggle pointer">
                            <FontAwesomeIcon className="header-icon" icon={faBars} />
                        </span>
                        <span className="close-toggle pointer">
                            <FontAwesomeIcon className="header-icon" icon={faTimes} />
                        </span>
                    </div>
                    <div className="main-header-center mr-3 d-sm-none d-md-none d-lg-block">
                        <input className="form-control" placeholder="هر چیزی را جستجو کنید ..." type="search" />
                        <button className="btn search-button">
                            <FontAwesomeIcon className='d-none d-md-block' icon={faSearch}/>
                        </button>
                    </div>
                </div>

                <div className="ps-2">
                    <input type="checkbox" className="checkbox" checked={(isDarkMode == "1") ? true : false} id="checkbox" onChange={isDarkModeHandler}/>
                    <label htmlFor="checkbox" className="label pointer">
                        <FontAwesomeIcon icon={faMoon} />
                        <FontAwesomeIcon icon={faSun}  />
                        <div className='ball'></div>
                    </label>    
                </div>
            </div>

                
            
    </motion.div>
    )
}