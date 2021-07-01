import React from 'react';
import './Mentors.css';
import MentorItem from './MentorItem';

function Mentors() {
  return (
    <div className='mentors'>
      <h1 className='MentorPlans__heading'>輔導員介紹</h1>
      <div className='mentors__container'>
        <div className='mentors__wrapper'>
          <ul className='mentors__items'>
            <MentorItem
              src='images/image1.jpg'
              text='台灣大學 電機工程'
              label='國內考試'
              path='/reservation'
            />
            <MentorItem
              src='images/image2.jpeg'
              text='Stanford Economics'
              label='國外考試'
              path='/reservation'
            />
            <MentorItem
              src='images/image1.jpg'
              text='台灣大學 財務金融'
              label='國內考試'
              path='/reservation'
            />
            <MentorItem
              src='images/image2.jpeg'
              text='Purdue CompE'
              label='國外考試'
              path='/reservation'
            />
          </ul>
          <ul className='mentors__items'>
            <MentorItem
              src='images/image3.jpg'
              text='香港大學 Fintech'
              label='國內申請'
              path='/reservation'
            />
            <MentorItem
              src='images/image4.jpg'
              text='Northwestern Journalism'
              label='國外申請'
              path='/products'
            />
            <MentorItem
              src='images/image5.jpg'
              text='政治大學 大眾傳播'
              label='國內申請'
              path='/sign-up'
            />
            <MentorItem
              src='images/image5.jpg'
              text='南洋理工 電腦工程'
              label='國外申請'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Mentors;