import { apiService } from './index';
import { endPoints } from '../constants/api';

/**
 * Listing Management Service
 * Handles all listing-related API calls
 */
export const listingService = {
  /**
   * Get all vendor listings with optional filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status (active, inactive, pending)
   * @param {string} params.category - Filter by category
   * @param {string} params.search - Search term
   * @returns {Promise} API response
   */
  getAllListings: (params = {}) => {
    return apiService.get(endPoints.listings.all, params);
  },

  /**
   * Get single listing by ID
   * @param {string|number} listingId - Listing ID
   * @returns {Promise} API response
   */
  getListingById: (listingId) => {
    return apiService.get(`${endPoints.listings.all}/${listingId}`);
  },

  /**
   * Create new listing
   * @param {Object} listingData - Listing data
   * @returns {Promise} API response
   */
  createListing: (listingData) => {
    return apiService.post(endPoints.listings.create, listingData);
  },

  /**
   * Update existing listing
   * @param {string|number} listingId - Listing ID
   * @param {Object} listingData - Updated listing data
   * @returns {Promise} API response
   */
  updateListing: (listingId, listingData) => {
    return apiService.put(endPoints.listings.update(listingId), listingData);
  },

  /**
   * Delete listing
   * @param {string|number} listingId - Listing ID
   * @returns {Promise} API response
   */
  deleteListing: (listingId) => {
    return apiService.delete(endPoints.listings.delete(listingId));
  },

  /**
   * Toggle listing status (active/inactive)
   * @param {string|number} listingId - Listing ID
   * @param {Object} statusData - Status data
   * @param {boolean} statusData.isActive - New status
   * @returns {Promise} API response
   */
  toggleListingStatus: (listingId, statusData) => {
    return apiService.patch(endPoints.listings.toggle(listingId), statusData);
  },

  /**
   * Upload images for a listing
   * @param {string|number} listingId - Listing ID
   * @param {FormData} imageData - Image form data
   * @returns {Promise} API response
   */
  uploadListingImages: (listingId, imageData) => {
    return apiService.postFormData(endPoints.listings.uploadImages(listingId), imageData);
  },

  /**
   * Delete listing image
   * @param {string|number} listingId - Listing ID
   * @param {string|number} imageId - Image ID
   * @returns {Promise} API response
   */
  deleteListingImage: (listingId, imageId) => {
    return apiService.delete(`${endPoints.listings.uploadImages(listingId)}/${imageId}`);
  },

  /**
   * Get listing analytics
   * @param {Object} params - Query parameters
   * @param {string} params.dateRange - Date range (7d, 30d, 90d, etc.)
   * @param {string|number} params.listingId - Specific listing ID (optional)
   * @returns {Promise} API response
   */
  getListingAnalytics: (params = {}) => {
    return apiService.get(endPoints.listings.analytics, params);
  },

  /**
   * Get listing performance metrics
   * @param {string|number} listingId - Listing ID
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getListingPerformance: (listingId, params = {}) => {
    return apiService.get(`${endPoints.listings.all}/${listingId}/performance`, params);
  },

  /**
   * Duplicate listing
   * @param {string|number} listingId - Listing ID to duplicate
   * @param {Object} modifications - Modifications to apply to duplicated listing
   * @returns {Promise} API response
   */
  duplicateListing: (listingId, modifications = {}) => {
    return apiService.post(`${endPoints.listings.all}/${listingId}/duplicate`, modifications);
  },

  /**
   * Bulk update listings
   * @param {Array} listingIds - Array of listing IDs
   * @param {Object} updateData - Data to update
   * @returns {Promise} API response
   */
  bulkUpdateListings: (listingIds, updateData) => {
    return apiService.patch(`${endPoints.listings.all}/bulk-update`, {
      listingIds,
      ...updateData,
    });
  },

  /**
   * Get listing categories and subcategories
   * @returns {Promise} API response
   */
  getListingCategories: () => {
    return apiService.get(endPoints.general.categories);
  },

  /**
   * Get popular tags for listings
   * @returns {Promise} API response
   */
  getPopularTags: () => {
    return apiService.get('vendor/listings/popular-tags');
  },

  /**
   * Export listings data
   * @param {Object} filters - Export filters
   * @param {string} format - Export format (csv, xlsx, pdf)
   * @returns {Promise} API response
   */
  exportListings: (filters = {}, format = 'csv') => {
    return apiService.get('vendor/listings/export', { ...filters, format });
  },
};

export default listingService;
