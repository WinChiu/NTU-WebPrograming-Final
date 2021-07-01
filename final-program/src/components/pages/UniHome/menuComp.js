import React from 'react'
import {Button } from '../../Button'
import {Link} from 'react-router-dom'
import './menuComp.css'
function menuComp({
    lightBg, lightText, lightTextDesc, headline, description, src, src2, buttonColor, buttonLabel, buttonLabel2,
    img, alt, imgStart
}) {
    return (
        <>
            <div className={lightBg? 'menuComp-section':'menuComp-section darkBg'}>
                <div className='container'>
                    <div className='row menuComp-row'
                    style={{display:"flex",flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}>
                        <div className="col">
                            <div className="menuComp-text-wrapper">
                                <h1 className={lightText? 'menu_heading':'heading dark'}>{headline}</h1>
                                <p className={lightTextDesc? 'menuComp-subtitle':'menuComp-subtitle dark'}>
                                {description}</p>
                                <Link to={src}>
                                    <Button buttonSize='btn--wide' buttonColor={buttonColor}>{buttonLabel}</Button>
                                </Link>
                                <Link to={src2}>
                                    <Button buttonSize='btn--wide' buttonColor={buttonColor}>{buttonLabel2}</Button>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='menuComp-img-wrapper'>
                                <img src={img} alt={alt} className="menuComp-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default menuComp
