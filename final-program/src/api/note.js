import axios from "axios";

// const geturl = "http://localhost:4000/note" || `${process.env.baseURL}/note`;
// const uploadurl = "http://localhost:4000/note" || `${process.env.baseURL}/note`;

const geturl = "/note";
const uploadurl = "/note";

const getitems = () => axios.get(geturl);
const createitem = (item) => axios.post(uploadurl, item);

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
