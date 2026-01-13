import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request Error:', error); 
    return Promise.reject(error);
  }
);

export default axiosInstance;
