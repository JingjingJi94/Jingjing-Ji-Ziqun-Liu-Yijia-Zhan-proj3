import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const logoutUser = () => API.post("/logout");
export const checkLoginStatus = () => API.get("/status");
