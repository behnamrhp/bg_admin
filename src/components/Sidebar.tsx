import Avatar from './../assets/images/profile.png';
import logo   from './../assets/images/brand/logo.png';
import logo_dark from './../assets/images/brand/logo-white.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { pagesName } from '../utils/configs/constants/global';
import { useAppSelector } from '../redux/hooks';
import { userFetchResult } from '../utils/configs/types/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm,faEdit, faUsers, faCaretLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { toggleSubItems } from '../utils/helpers/viewHelpers';
import { motion } from 'framer-motion';
import { sidebarVariation } from '../utils/configs/constants/animateVariants';


export const Sidebar = () => {
    const user = useAppSelector(state => state.user.data) as userFetchResult;
    const [isUserExpanded, setIsUserExpanded] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const isUserPage = location.pathname.split('/').some(item => item === 'user');
        if(isUserPage) toggleSubItems(isUserExpanded, setIsUserExpanded);
    }, [])

    return (
    <motion.aside className="app-sidebar sidebar-scroll"
    variants={sidebarVariation}
    initial='hidden'
    animate='visible'
    >
    <div className="main-sidebar-header active">
        <Link className="desktop-logo logo-light active" to="/">
            <img src={logo} className="main-logo" alt="logo"/>
        </Link>
        <Link className="desktop-logo logo-dark active" to="/">
            <img src={logo_dark} className="main-logo dark-theme" alt="logo"/>
        </Link>
    </div>
    <div className="main-sidemenu">
        <div className="app-sidebar__user clearfix">
            <div className="dropdown user-pro-body">
                {/* <div className="">
                    <img alt="user-img" className="avatar avatar-xl brround" src={Avatar} />
                </div> */}
                <div className="avatar bg-primary avatar-xl brround avatar-custom">
                    {user.firstname[0]}
                </div>
                <div className="user-info">
                    <h4 className="fw-semibold mt-3 mb-0">{user.firstname + ' ' + user.lastname}</h4>
                </div>
            </div>
        </div>
        <ul className="side-menu">
            <li className="slide">
                <NavLink className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/home'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faHome} />    
                    <span className="side-menu__label">{pagesName.home}</span>
                </NavLink>
            </li>
            <li className="slide">
                <NavLink className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/slider'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faFilm} />
                    <span className="side-menu__label">{pagesName.sliders}</span>
                </NavLink>
            </li>
            <li className="slide">
                <NavLink className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/post'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faEdit} />
                    <span className="side-menu__label">{pagesName.posts}</span>
                </NavLink>
            </li>
            <li className="slide pointer">
                <span id="userContainer" className={ "side-menu__item"} onClick={() => toggleSubItems( isUserExpanded, setIsUserExpanded)}>
                    <div className='d-flex justify-content-between align-items-center w-100'>
                        <div className="d-flex">
                            <FontAwesomeIcon className="header-icon ms-2" icon={faUsers} />
                            <span className="side-menu__label">{pagesName.users}</span>
                        </div>
                        
                        <FontAwesomeIcon className={isUserExpanded ? "rotate_180 f-small-c active angle header-icon " : "f-small-c angle header-icon"} icon={faChevronDown} />

                    </div>
                    
                    <ul className="slide-menu">
								<li>
                                    <NavLink className={({isActive}) => isActive ? "active-sidebar-link slide-item d-flex justify-content-start" : "d-flex justify-content-start slide-item"} to='user/skill'>
                                        <FontAwesomeIcon className="header-icon ms-2 small_list_style" icon={faCaretLeft} />
                                        {pagesName.skills}</NavLink>
                                </li>
								<li>
                                    <NavLink className={({isActive}) => isActive ? "active-sidebar-link slide-item d-flex justify-content-start" : "d-flex justify-content-start slide-item"} to='/user/habit'>
                                        <FontAwesomeIcon className="header-icon ms-2 small_list_style" icon={faCaretLeft} />
                                        {pagesName.habits}</NavLink>
                                </li>
								<li>
                                    <NavLink className={({isActive}) => isActive ? "active-sidebar-link slide-item d-flex justify-content-start" : "d-flex justify-content-start slide-item"} to='/user/habit-log'>
                                        <FontAwesomeIcon className="header-icon ms-2 small_list_style" icon={faCaretLeft} />
                                        {pagesName.habitLogs}</NavLink>
                                </li>
								<li>
                                    <NavLink className={({isActive}) => isActive ? "active-sidebar-link slide-item d-flex justify-content-start" : "d-flex justify-content-start slide-item"} to='/user/score'>
                                        <FontAwesomeIcon className="header-icon ms-2 small_list_style" icon={faCaretLeft} />
                                        {pagesName.userScors}</NavLink>
                                </li>
								<li>
                                    <NavLink className={({isActive}) => isActive ? "active-sidebar-link slide-item d-flex justify-content-start" : "d-flex justify-content-start slide-item"} to='/user/self-evaluation'>
                                        <FontAwesomeIcon className="header-icon ms-2 small_list_style" icon={faCaretLeft} />
                                        {pagesName.selfEvaluation}</NavLink>
                                </li>
					</ul>
                </span>
            </li>
          
        </ul>
    </div>
</motion.aside>
)
}