import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:5001/api",
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate instance for authentication requests
export const authApi = axios.create({
  baseURL: "https://localhost:5001/api",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
