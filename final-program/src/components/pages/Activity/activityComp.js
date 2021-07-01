import React from 'react'
import {Button } from '../../Button'
import {Link} from 'react-router-dom'
import './activityComp.css'
function activityComp({
    title, time, location, description, status, src, buttonLabel, img, alt, imgStart}) {
    return (
        <>
            <div className='container'>
                <div className='row activityComp-row' style={{display:"flex",flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}>
                    <div className="col">
                        <div className="activityComp-text-wrapper">
                            <h1 className='activity_heading'>{title}</h1>
                            <ul className='activityComp__container'>
                                <li className= 'activityComp__containerItem'>{time}</li>
                                <li className= 'activityComp__containerItem'>{location}</li>
                                <li className= 'activityComp__containerItem'>{status}</li>
                            </ul>
                            <p className='activityComp-subtitle'>{description}</p>  
                            <Link to={src}>
                                <Button buttonSize='btn--wide' buttonColor='primary'>{buttonLabel}</Button>
                            </Link>                          
                        </div>
                    </div>
                    <div className='col'>
                        <div className='activityComp-img-wrapper'>
                            <img src={img} alt={alt} className="activityComp-img" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default activityComp
