import axios from 'axios';
import { apiHeaders, requestType } from '../constants/api';

// Base URL configuration - can be overridden by environment variables
export const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1/';

/**
 * Generic API service function
 * @param {string} path - API endpoint path
 * @param {Object} params - Request parameters
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {boolean} isFormData - Whether the data is FormData
 * @param {Object} customHeaders - Additional headers to merge
 * @returns {Promise} - Axios response promise
 */
const api = async (path, params = null, method = requestType.GET, isFormData = false, customHeaders = {}) => {
  try {
    // Get vendor token from localStorage
    let vendorToken = localStorage.getItem('vendorToken');
    
    // Prepare headers
    const headers = {
      'Content-Type': isFormData ? apiHeaders.multipart_data : apiHeaders.application_json,
      ...customHeaders,
    };

    // Add authorization header if token exists
    if (vendorToken) {
      headers.Authorization = `Bearer ${vendorToken}`;
    }

    // Prepare axios options
    const options = {
      url: `${baseUrl}${path}`,
      method: method,
      headers: headers,
      timeout: 10000,
      withCredentials: true, // For cookie-based auth
    };

    // Add data based on method and format
    if (params && (method === requestType.POST || method === requestType.PUT || method === requestType.PATCH)) {
      if (isFormData) {
        options.data = params; // FormData should be sent as-is
      } else {
        options.data = JSON.stringify(params);
      }
    } else if (params && method === requestType.GET) {
      options.params = params; // GET parameters go in URL
    }

    console.log(`API Call: ${method.toUpperCase()} ${baseUrl}${path}`, {
      headers: options.headers,
      data: options.data || options.params,
    });

    const response = await axios(options);
    return response;

  } catch (error) {
    console.error(`API Error: ${method.toUpperCase()} ${baseUrl}${path}`, error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('vendorToken');
      localStorage.removeItem('vendorUser');
      
      // Dispatch logout action if Redux is available
      if (window.__REDUX_STORE__) {
        // This would need to be implemented with proper Redux action
        console.warn('Unauthorized access - user should be logged out');
      }
      
      // For now, redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      throw new Error('Session expired. Please login again.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('Access forbidden. You don\'t have permission to perform this action.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Resource not found.');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    // Return the error response for handling by calling component
    if (error.response) {
      return error.response;
    }
    
    throw error;
  }
};

/**
 * Helper functions for common API operations
 */
export const apiService = {
  // GET request
  get: (path, params, customHeaders) => api(path, params, requestType.GET, false, customHeaders),
  
  // POST request
  post: (path, params, customHeaders) => api(path, params, requestType.POST, false, customHeaders),
  
  // PUT request
  put: (path, params, customHeaders) => api(path, params, requestType.PUT, false, customHeaders),
  
  // PATCH request
  patch: (path, params, customHeaders) => api(path, params, requestType.PATCH, false, customHeaders),
  
  // DELETE request
  delete: (path, params, customHeaders) => api(path, params, requestType.DELETE, false, customHeaders),
  
  // POST with FormData
  postFormData: (path, formData, customHeaders) => api(path, formData, requestType.POST, true, customHeaders),
  
  // PUT with FormData
  putFormData: (path, formData, customHeaders) => api(path, formData, requestType.PUT, true, customHeaders),
};

export default api;
