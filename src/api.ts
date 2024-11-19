import axios from "axios";
const api: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URI,
});

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;
