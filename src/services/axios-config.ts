import axios from "axios";

export const api = axios.create({
  baseURL: "http://o-complex.com:1337",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
