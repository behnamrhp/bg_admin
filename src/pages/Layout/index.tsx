import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { contentVariation } from "../../utils/configs/constants/animateVariants";


export const Layout  = ({ children }) => {
    const [ firstPage, setFirstPage ] = useState<boolean>(false);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === '/') setFirstPage(true);
    });

    if(firstPage) return <Navigate to='/home' />
          
    return (
    <div className="page">
        <motion.div className="container-fluid main-content-container-custom h-100"
       variants={contentVariation}
       initial='hidden'
       animate='visible'
       exit   = 'exit'
        >
            {children}
        </motion.div>
    </div>
)
}