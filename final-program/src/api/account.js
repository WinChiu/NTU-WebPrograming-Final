import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/account" || `${process.env.baseURL}/account` });
const fetchMemberData = async (name) => {
  const {
    data: { memberData },
  } = await instance.get(`memberData/${name}`);

  return memberData;
};

export { fetchMemberData };
