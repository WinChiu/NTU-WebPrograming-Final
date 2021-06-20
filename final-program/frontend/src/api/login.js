import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/login" });

const loginAccount = async (name, password, memberType) => {
  const {
    data: { msg },
  } = await instance.post("/login_account", null, { params: { name, password, memberType } });
};

const registerAccount = async (name, password, memberType, email, money) => {
  const {
    data: { msg },
  } = await instance.post("/register", null, { params: { name, password, memberType, email, money } });

  return msg;
};
export { loginAccount, registerAccount };
