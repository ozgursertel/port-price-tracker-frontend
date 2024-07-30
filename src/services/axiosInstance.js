import axios from 'axios';
import authHeader from './authHeader';

const axiosInstance = axios.create({
  baseURL: 'http://portpricetracker-env.eba-jtfkf2ms.us-east-1.elasticbeanstalk.com/v1/api', // Use correct base URL for your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const headers = authHeader();
    if (headers) {
      config.headers = { ...config.headers, ...headers };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
