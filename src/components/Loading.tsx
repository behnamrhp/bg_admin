import loader from "./../assets/images/loader.svg";
import { AnimatePresence, motion } from 'framer-motion';

const loadingVariants = {
    hidden : {
        opacity : 0,
    },
    visible : {
        opacity : 1,
        transition : {
            duration : .3,
            delay : .3
        }
    },
    exit : {
        opacity : 0,
        transition : {
          duration : .7
        }
      }
    
}
export const Loading = ({ isFullWidth,isVisible }:{isFullWidth : boolean, isVisible: boolean} ) => {

    return (
        <AnimatePresence exitBeforeEnter>
            {isVisible && (
            <motion.div
                id="global-loader"
                style={{
                    ...(isFullWidth && {width    : '100vw',
                                        height   : '100vh',
                                        position : 'fixed'
                                        }),
                }}
                variants = {loadingVariants}
                initial  = 'hidden'
                animate  = 'visible'
                exit='exit'
                >
                    <img src={loader} className="loader-img" alt="Loader" />
            </motion.div>
            )}
            
        </AnimatePresence>
    )
}