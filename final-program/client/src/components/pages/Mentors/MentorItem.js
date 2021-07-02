import React from 'react';
import { Link } from 'react-router-dom';
import {Button } from '../../Button'
function MentorItem(props) {
  return (
    <>
      <li className='mentors__item'>
        <div className='mentors__item__box' to={props.path}>
          <figure className='mentors__item__pic-wrap' data-category={props.label}>
            <img
              className='mentors__item__img'
              alt='Mentor Image'
              src={props.src}
            />
          </figure>
          <div className='mentors__item__info'>
            <h5 className='mentors__item__text'>{props.text}</h5>
          </div>
          <Link to='/reservation'>
                <Button buttonSize='btn--primary' buttonColor='primary'>預約</Button>
          </Link>
        </div>
        
      </li>
    </>
  );
}

export default MentorItem;