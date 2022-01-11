import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleSidebarButton } from '../utils/helpers/viewHelpers';
import { motion } from 'framer-motion';
import { headerVariants } from '../utils/configs/constants/animateVariants';


export const Header = () => (
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
            </div>
    </motion.div>
)