import React from 'react'
import UniComp from './menuComp'
import {homeObjOne, homeObjTwo} from './Data'



function UniMenu() {
    return (
        <>
            <UniComp {...homeObjOne} />
            <UniComp {...homeObjTwo} />
        </>
    )
}

export default UniMenu
