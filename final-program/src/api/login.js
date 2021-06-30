import axios from "axios";
// const instance = axios.create({ baseURL: "http://localhost:4000/login" });
// const instance = axios.create({ baseURL: "https://ntu-webprograming-project.herokuapp.com/login" });
const instance = axios.create({ baseURL: "http://localhost:4000" || `${process.env.baseURL}` });

const loginAccount = async (name, password, memberType) => {
  const {
    data: { msg },
  } = await instance.post("/login/login_account", null, { params: { name, password, memberType } });

  // const {
  //   data: { msg },
  // } = await axios.post("login/login_account", null, { params: { name, password, memberType } });

  return msg;
};

const registerAccount = async (name, password, memberType, email, money) => {
  const {
    data: { msg },
  } = await instance.post("/login/register", null, { params: { name, password, memberType, email, money } });

  return msg;
};
export { loginAccount, registerAccount };
