import Avatar from './../assets/images/profile.png';
import logo   from './../assets/images/brand/logo.png';
import logo_dark from './../assets/images/brand/logo-white.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { pagesName } from '../utils/configs/constants/global';
import { useAppSelector } from '../redux/hooks';
import { userFetchResult } from '../utils/configs/types/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm,faEdit, faUsers } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { sidebarVariation } from '../utils/configs/constants/animateVariants';


export const Sidebar = () => {
    const user = useAppSelector(state => state.user.data) as userFetchResult;

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
                <NavLink title={pagesName.home} className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/home'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faHome} />    
                    <span className="side-menu__label">{pagesName.home}</span>
                </NavLink>
            </li>
            <li className="slide">
                <NavLink title={pagesName.sliders} className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/slider'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faFilm} />
                    <span className="side-menu__label">{pagesName.sliders}</span>
                </NavLink>
            </li>
            <li className="slide">
                <NavLink title={pagesName.posts} className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/post'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faEdit} />
                    <span className="side-menu__label">{pagesName.posts}</span>
                </NavLink>
            </li>
            <li className="slide pointer">
                <NavLink title={pagesName.users} className={({isActive}) => isActive ? 'active-sidebar-link side-menu__item d-flex flex-row align-items-center' : 'side-menu__item d-flex flex-row align-items-center'} to='/user'>
                    <FontAwesomeIcon className="header-icon ms-2" icon={faUsers} />
                    <span className="side-menu__label">{pagesName.users}</span>
                </NavLink>
            </li>
          
        </ul>
    </div>
</motion.aside>
)
}