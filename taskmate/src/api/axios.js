import axios from "axios";

export const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate instance for authentication requests
export const authApi = axios.create({
   baseURL: import.meta.env.VITE_API_URL,

   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
