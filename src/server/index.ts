import axios from "axios";


const request = axios.create({
  baseURL: "https://652cf602f9afa8ef4b26883c.mockapi.io/api/v1/",
  timeout: 10000,
});

export default request;