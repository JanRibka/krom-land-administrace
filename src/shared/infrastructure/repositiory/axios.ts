import axios from "axios";

export default axios.create({});

export const axiosPrivate = axios.create({
  baseURL: process.env.PUBLIC_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
