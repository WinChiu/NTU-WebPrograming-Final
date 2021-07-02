import axios from "axios";

// let url = "";
let url = "https://ntu-webprograming-project.herokuapp.com/";
// if (process.env.NODE_ENV === "development") {
//   url = "http://localhost:4000/";
// } else {
//   url = "https://ntu-webprograming-project.herokuapp.com/";
// }

// const instance = axios.create({ baseURL: "http://localhost:4000" || `${process.env.baseURL}` });
const instance = axios.create({ baseURL: url });


const loginAccount = async (name, password, memberType) => {
  console.log(process.env.NODE_ENV);
  const {
    data: { msg },
  } = await instance.post("login/login_account", null, { params: { name, password, memberType } });

  return msg;
};

const registerAccount = async (name, password, memberType, email, money) => {
  const {
    data: { msg },
  } = await instance.post("login/register", null, { params: { name, password, memberType, email, money } });

  return msg;
};
export { loginAccount, registerAccount };
