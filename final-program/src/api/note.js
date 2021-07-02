import axios from "axios";

const geturl = "http://localhost:4000/note" || `${process.env.baseURL}/note`;
const uploadurl = "http://localhost:4000/note" || `${process.env.baseURL}/note`;

// let url = "";
// if (process.env.NODE_ENV === "development") {
//   url = "http://localhost:4000/";
// } else {
//   url = "https://ntu-webprograming-project.herokuapp.com/";
// }
let url = "https://ntu-webprograming-project.herokuapp.com/";
const getitems = () => axios.get(url + "note");
const createitem = (item) => axios.post(url + "note", item);

// const getitems = () => axios.get(geturl);
// const createitem = (item) => axios.post(uploadurl, item);

export const getItems = async () => {
  try {
    const { data } = await getitems();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createItem = async (todo) => {
  try {
    const { data } = await createitem(todo);

    return data;
  } catch (error) {
    console.log(error);
  }
};
