import React from 'react'
import Activities from './activityComp.js'
import {homeObjOne, homeObjTwo } from './Data'

function Activity() {
    return (
        <>
            <Activities {...homeObjOne} />
            <Activities {...homeObjTwo} />
        </>
    )
}

export default Activity
