import { apiService } from './index';
import { endPoints } from '../constants/api';

/**
 * Vendor Profile Service
 * Handles all vendor profile-related API calls
 */
export const vendorService = {
  /**
   * Get vendor profile information
   * @returns {Promise} API response
   */
  getProfile: () => {
    return apiService.get(endPoints.vendor.profile);
  },

  /**
   * Update vendor profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} API response
   */
  updateProfile: (profileData) => {
    return apiService.put(endPoints.vendor.updateProfile, profileData);
  },

  /**
   * Upload vendor banner image
   * @param {FormData} bannerData - Banner image form data
   * @returns {Promise} API response
   */
  uploadBanner: (bannerData) => {
    return apiService.postFormData(endPoints.vendor.uploadBanner, bannerData);
  },

  /**
   * Upload vendor avatar/profile image
   * @param {FormData} avatarData - Avatar image form data
   * @returns {Promise} API response
   */
  uploadAvatar: (avatarData) => {
    return apiService.postFormData(endPoints.vendor.uploadAvatar, avatarData);
  },

  /**
   * Update business information
   * @param {Object} businessInfo - Business information
   * @returns {Promise} API response
   */
  updateBusinessInfo: (businessInfo) => {
    return apiService.put(endPoints.vendor.updateBusinessInfo, businessInfo);
  },

  /**
   * Get vendor categories
   * @returns {Promise} API response
   */
  getCategories: () => {
    return apiService.get(endPoints.vendor.getCategories);
  },

  /**
   * Update vendor categories
   * @param {Object} categories - Categories data
   * @param {Array} categories.categoryIds - Array of category IDs
   * @returns {Promise} API response
   */
  updateCategories: (categories) => {
    return apiService.put(endPoints.vendor.updateCategories, categories);
  },

  /**
   * Get vendor statistics/dashboard data
   * @param {Object} params - Query parameters (date range, etc.)
   * @returns {Promise} API response
   */
  getDashboardStats: (params = {}) => {
    return apiService.get('vendor/dashboard-stats', params);
  },

  /**
   * Get vendor verification status
   * @returns {Promise} API response
   */
  getVerificationStatus: () => {
    return apiService.get('vendor/verification-status');
  },

  /**
   * Submit verification documents
   * @param {FormData} documents - Verification documents
   * @returns {Promise} API response
   */
  submitVerificationDocuments: (documents) => {
    return apiService.postFormData('vendor/verification-documents', documents);
  },

  /**
   * Get vendor activity log
   * @param {Object} params - Query parameters (page, limit, etc.)
   * @returns {Promise} API response
   */
  getActivityLog: (params = {}) => {
    return apiService.get('vendor/activity-log', params);
  },
};

export default vendorService;
