import { motion } from "framer-motion";
import { contentVariation } from "../../utils/configs/constants/animateVariants";


export const Layout  = ({ children }) => {
    
 
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