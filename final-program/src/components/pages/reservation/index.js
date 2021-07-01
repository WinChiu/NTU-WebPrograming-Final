import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import logic from './logic';
import InputField from './../../../components/form/textField';
import SelectBox from './../../../components/form/selectBox';
import PickerDate from './../../../components/form/calendar';
import json from './timeSlots.json';
import './style.css';

const { mentorName, postReservation } = logic;
const key = 'updatable';

// message alert
const openMessage = (msg) => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: msg, key, duration: 2 });
  }, 1000);
};
const Reservation = () => {
  const reserv = 0
  const [studentName, setStudentName] = useState();
  const [mentorName, setMentorName] = useState();
  const [bookDate, setBookDate] = useState();
  const [time, setTime] = useState();
  const [eventTitle, setEvent] = useState();
  const [date, pickDate] = useState();

  const clearState = () => {
    setStudentName('');
    setMentorName('');
    setBookDate('');
    setTime('');
  };
  useEffect(() => {
    if (reserv) {
      mentorName(reserv);
    }
  }, [reserv]);

  return (
    <div className="appointment">
      <div>
      <SelectBox
          value={eventTitle}
          setValue={(value) => setEvent(value)}
          placeholder="Pick the category"
          items={json.cat}
        />
        <InputField
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          placeholder="Insert Your Name Please"
          prefix
        />
        <InputField
          value={mentorName}
          onChange={(event) => setMentorName(event.target.value)}
          placeholder="Insert Mentor Please"
          prefix
        />
        <PickerDate
          value={bookDate}
          placeholder="Please Pick date "
          onChange={(date, dateString) => {
            pickDate(dateString);
            setBookDate(date, dateString);
          }}
        />
        <SelectBox
          value={time}
          setValue={(value) => setTime(value)}
          placeholder="Pick the time"
          items={json.time}
        />
        <Button
          className="book__btn"
          onClick={() =>
            postReservation(studentName, mentorName, date, time).then(
              (msg) => {
                openMessage(msg);
                clearState();
              }
            )
          }
        >
          Book Now
        </Button>
        <Button className="book__reset" onClick={() => clearState()}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
