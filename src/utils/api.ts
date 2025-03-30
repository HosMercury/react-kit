import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
