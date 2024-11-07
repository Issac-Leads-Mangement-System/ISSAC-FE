import axios from 'axios';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URI,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;