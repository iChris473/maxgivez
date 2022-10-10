import axios from "axios";

const BASE_URL = "https://maxigivez.herokuapp.com/api";
// const BASE_URL = "http://localhost:8500/api";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("user"))

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${user?.token}`}
});