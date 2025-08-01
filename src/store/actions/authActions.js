import { loginRequest, loginSuccess, loginFailure, logout } from '../slices/authSlice';

// Actual API call for vendor login
import api from '../api';

export const loginVendor = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  
  try {
    // Make an API call to the backend to verify user credentials
    const response = await api.post('/auth/login', credentials);
    
    // Extract the user data from the response
    const { user } = response.data;
    
    // Check if user is a vendor
    if (user.role !== 'vendor') {
      const errorMessage = 'Access denied. Only vendors can access this portal.';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
    
    // Store user data in localStorage (token is handled by cookies)
    localStorage.setItem('vendorUser', JSON.stringify(user));
    
    // Dispatch success action
    dispatch(loginSuccess({ user }));
    
    return { success: true, user };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const logoutVendor = () => async (dispatch) => {
  try {
    // Call logout endpoint to clear cookies
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Remove data from localStorage
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorUser');
    
    dispatch(logout());
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    // Check authentication status with the server
    const response = await api.get('/auth/me');
    const { user, vendor } = response.data;
    
    if (user && user.role === 'vendor') {
      const userData = { ...user, vendor };
      localStorage.setItem('vendorUser', JSON.stringify(userData));
      dispatch(loginSuccess({ user: userData }));
      return { success: true, user: userData };
    } else {
      // Not a vendor or not authenticated
      localStorage.removeItem('vendorUser');
      dispatch(logout());
      return { success: false };
    }
  } catch (error) {
    // Not authenticated or error occurred
    localStorage.removeItem('vendorUser');
    dispatch(logout());
    return { success: false };
  }
};

// Send OTP for vendor registration
export const sendOtpForVendorRegister = async (email) => {
  try {
    const response = await api.post('/auth/send-otp', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to send OTP';
    return { success: false, error: errorMessage };
  }
};

// Register vendor with OTP verification
export const registerVendorWithOtp = async (registrationData) => {
  try {
    const response = await api.post('/auth/verify-otp-register-vendor', registrationData);
    return { success: true, message: response.data.message, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    return { success: false, error: errorMessage };
  }
};

// Register vendor without OTP (direct registration)
export const registerVendor = async (registrationData) => {
  try {
    const response = await api.post('/auth/register-vendor', registrationData);
    return { success: true, message: response.data.message, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    return { success: false, error: errorMessage };
  }
};

// Send OTP for forgot password
export const sendOtpForForgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/send-otp-forgot', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to send OTP';
    return { success: false, error: errorMessage };
  }
};

// Verify OTP for forgot password
export const verifyOtpForForgotPassword = async (email, otp) => {
  try {
    const response = await api.post('/auth/verify-otp-forgot', { email, otp });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'OTP verification failed';
    return { success: false, error: errorMessage };
  }
};

// Reset password
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', { email, newPassword });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Password reset failed';
    return { success: false, error: errorMessage };
  }
};

// Check if email exists
export const checkEmailExists = async (email) => {
  try {
    const response = await api.post('/auth/check-email', { email });
    return { success: true, exists: response.data.exists };
  } catch (error) {
    return { success: false, error: 'Failed to check email' };
  }
};
