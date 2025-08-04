import { apiService } from './index';
import { endPoints, requestType } from '../constants/api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Vendor login
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - Vendor email
   * @param {string} credentials.password - Vendor password
   * @returns {Promise} API response
   */
  login: (credentials) => {
    return apiService.post(endPoints.auth.login, credentials);
  },

  /**
   * Vendor registration
   * @param {Object} vendorData - Registration data
   * @returns {Promise} API response
   */
  register: (vendorData) => {
    return apiService.post(endPoints.auth.register, vendorData);
  },

  /**
   * Vendor logout
   * @returns {Promise} API response
   */
  logout: () => {
    return apiService.post(endPoints.auth.logout);
  },

  /**
   * Refresh authentication token
   * @returns {Promise} API response
   */
  refreshToken: () => {
    return apiService.post(endPoints.auth.refreshToken);
  },

  /**
   * Send OTP for verification
   * @param {Object} data - OTP request data
   * @param {string} data.email - Email to send OTP to
   * @param {string} data.type - OTP type (registration, forgot_password, etc.)
   * @returns {Promise} API response
   */
  sendOtp: (data) => {
    return apiService.post(endPoints.auth.sendOtp, data);
  },

  /**
   * Verify OTP
   * @param {Object} data - OTP verification data
   * @param {string} data.email - Email
   * @param {string} data.otp - OTP code
   * @param {string} data.type - OTP type
   * @returns {Promise} API response
   */
  verifyOtp: (data) => {
    return apiService.post(endPoints.auth.verifyOtp, data);
  },

  /**
   * Initiate forgot password process
   * @param {Object} data - Forgot password data
   * @param {string} data.email - Vendor email
   * @returns {Promise} API response
   */
  forgotPassword: (data) => {
    return apiService.post(endPoints.auth.forgotPassword, data);
  },

  /**
   * Reset password with token
   * @param {Object} data - Reset password data
   * @param {string} data.token - Reset token
   * @param {string} data.newPassword - New password
   * @param {string} data.confirmPassword - Confirm new password
   * @returns {Promise} API response
   */
  resetPassword: (data) => {
    return apiService.post(endPoints.auth.resetPassword, data);
  },

  /**
   * Change password (for logged-in user)
   * @param {Object} data - Change password data
   * @param {string} data.currentPassword - Current password
   * @param {string} data.newPassword - New password
   * @param {string} data.confirmPassword - Confirm new password
   * @returns {Promise} API response
   */
  changePassword: (data) => {
    return apiService.post(endPoints.auth.changePassword, data);
  },

  /**
   * Validate current session
   * @returns {Promise} API response
   */
  validateSession: () => {
    return apiService.get('vendor/validate-session');
  },
};

export default authService;
