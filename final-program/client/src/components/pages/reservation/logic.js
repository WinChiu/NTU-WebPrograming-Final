import axios from 'axios';

const logic = {
  postReservation: async (
    studentName,
        mentorName,
        bookDate,
        time,
        eventTitle,
        date,
  ) => {
    try {
      const { data } = await axios.post({ baseURL: "http://localhost:4000/reservation" || `${process.env.baseURL}/reservation` }, {
        studentName,
        mentorName,
        bookDate,
        time,
        eventTitle,
        date,
      });
      return data.message;
    } catch (e) {
      return '你已成功預約!';
    }
  },
};
export default logic;
