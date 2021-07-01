import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000" || `${process.env.baseURL}` });
const fetchMemberData = async (name) => {
  const {
    data: { memberData },
  } = await axios.get(`/account/memberData/${name}`);

  return memberData;
};

export { fetchMemberData };
