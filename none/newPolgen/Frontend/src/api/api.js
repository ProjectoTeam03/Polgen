import axios from 'axios';
import { refreshAuthToken } from './auth';

// Create API instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your API base URL
    headers: {
     'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const sessionId = sessionStorage.getItem('sessionId');
  const authKey = `auth_${sessionId}`;
  const userData = JSON.parse(sessionStorage.getItem(authKey));

  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await refreshAuthToken();
      const sessionId = sessionStorage.getItem('sessionId');
      const authKey = `auth_${sessionId}`;
      const userData = JSON.parse(sessionStorage.getItem(authKey));

      originalRequest.headers.Authorization = `Bearer ${userData.token}`;
      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default API;

