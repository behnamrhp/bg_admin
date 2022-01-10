import { AlertyTypes } from "../utils/configs/types/global";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const AlertVariant = {
    hidden : {
        x : '-100vw'
    },
    visible : { 
        x : 0,
        transition : {
            type      : 'spring',
            stiffness : 50,
            delay     : .3
        }
    },
    exit : {
        x : '-100vw'
    }
}
export function Alert({type, text, isFullWidth, isVisible}:AlertyTypes ){
    const [localCheck, setLocalCheck] = useState(true);
    return (
        <AnimatePresence>
            {(isVisible && localCheck) && (
                <motion.div className={`alert alert-solid-${type}`} role="alert" style={{
                    ...(isFullWidth && {
                        top       : "5px",
                        position  : 'fixed',
                    })
                }}
                variants = {AlertVariant}
                initial  = 'hidden'
                animate  = 'visible'
                exit     = 'exit'
                >
                    <button aria-label="Close" className="close" data-dismiss="alert" type="button" onClick={() => setLocalCheck(false)}>
                    <span aria-hidden="true">&times;</span></button>
                    {text}
                </motion.div>
            )}
        </AnimatePresence>
        
    )
}