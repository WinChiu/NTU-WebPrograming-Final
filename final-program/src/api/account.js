import axios from "axios";
// const instance = axios.create({ baseURL: "http://localhost:4000/account" || `${process.env.baseURL}/account` });
let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:4000/";
} else {
  url = "https://ntu-webprograming-project.herokuapp.com/";
}

const instance = axios.create({ baseURL: url });

const fetchMemberData = async (name) => {
  const {
    data: { memberData },
  } = await instance.get(`account/memberData/${name}`);

  return memberData;
};

export { fetchMemberData };
