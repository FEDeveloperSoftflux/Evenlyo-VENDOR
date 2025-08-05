import { loginRequest, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import api from '../api';

// Mock credentials for vendor login
const MOCK_VENDOR_CREDENTIALS = {
  email: 'hammad.abbasi211@gmail.com',
  password: 'password123'
};

export const loginVendor = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check mock credentials
    if (credentials.email === MOCK_VENDOR_CREDENTIALS.email &&
      credentials.password === MOCK_VENDOR_CREDENTIALS.password) {

      const user = {
        id: 1,
        email: credentials.email,
        name: 'Vendor User',
        role: 'vendor',
        vendor: {
          id: 1,
          businessName: 'Test Vendor Business',
          category: 'Entertainment',
          verified: true
        }
      };

      const token = 'mock-vendor-jwt-token';

      // Store user data in localStorage
      localStorage.setItem('vendorUser', JSON.stringify(user));
      localStorage.setItem('vendorToken', token);

      // Dispatch success action
      dispatch(loginSuccess({ user, token }));

      return { success: true, user };
    } else {
      const errorMessage = 'Invalid email or password';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }

  } catch (error) {
    const errorMessage = error.message || 'Login failed. Please try again.';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const logoutVendor = () => async (dispatch) => {
  try {
    // For mock auth, we don't need to call API
    // Just clear localStorage and dispatch logout
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorUser');

    dispatch(logout());

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Even if there's an error, still clear local data
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorUser');
    dispatch(logout());

    return { success: false, error: error.message };
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
    const response = await api.post('/auth/send-forgot-otp', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to send OTP';
    return { success: false, error: errorMessage };
  }
};

// Verify OTP for forgot password
export const verifyOtpForForgotPassword = async (email, otp) => {
  try {
    const response = await api.post('/auth/verify-forgot-otp', { email, otp });
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
