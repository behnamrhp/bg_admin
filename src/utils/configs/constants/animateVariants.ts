const mainElementsDelayStart = .3

export const sidebarVariation = {
    hidden : {
        x : '100vw'
    },
    visible: {
        x : 0,
        transition: {
            type      : 'spring',
            stiffness : 30,
            delay : mainElementsDelayStart,
            duration : .6

        }
    }
}

export const headerVariants = {
    hidden : {
        y: '-100vh'
    },
    visible : {
        y           : 0,
        transition  : {
            delay : mainElementsDelayStart + .5,
            type: 'spring',
            stiffness: 30,
            duration : .6
        }
    }
}

export const contentVariation = {
    hidden : {
        x : '-100vw'
    },
    visible: {
        x : 0,
        transition: {
            type      : 'spring',
            stiffness :30,
            delay : mainElementsDelayStart ,
            duration : .6
        }
    },
    exit : {
        x : '-100vw'
    }
}