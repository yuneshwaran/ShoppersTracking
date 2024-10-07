// utils/axiosInstance.js

import axios from 'axios';
import { getToken } from './jwt';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
