
import axios from 'axios';

// Use Vite environment variable for API base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Always send cookies (for HTTP-only cookie auth)
    config.withCredentials = true;
    
    // Add token from localStorage if available
    const token = localStorage.getItem('vendorToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('vendorToken');
      localStorage.removeItem('vendorUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
