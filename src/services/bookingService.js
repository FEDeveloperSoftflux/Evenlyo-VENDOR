import { apiService } from './index';
import { endPoints } from '../constants/api';

/**
 * Booking Management Service
 * Handles all booking-related API calls
 */
export const bookingService = {
  /**
   * Get all bookings with optional filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status (pending, accepted, rejected, completed, cancelled)
   * @param {string} params.dateFrom - Start date filter
   * @param {string} params.dateTo - End date filter
   * @param {string} params.search - Search term
   * @returns {Promise} API response
   */
  getAllBookings: (params = {}) => {
    return apiService.get(endPoints.bookings.all, params);
  },

  /**
   * Get single booking by ID
   * @param {string|number} bookingId - Booking ID
   * @returns {Promise} API response
   */
  getBookingById: (bookingId) => {
    return apiService.get(endPoints.bookings.byId(bookingId));
  },

  /**
   * Accept a booking request
   * @param {string|number} bookingId - Booking ID
   * @param {Object} acceptanceData - Acceptance details
   * @param {string} acceptanceData.message - Optional message to client
   * @param {Array} acceptanceData.terms - Additional terms if any
   * @returns {Promise} API response
   */
  acceptBooking: (bookingId, acceptanceData = {}) => {
    return apiService.post(endPoints.bookings.accept(bookingId), acceptanceData);
  },

  /**
   * Reject a booking request
   * @param {string|number} bookingId - Booking ID
   * @param {Object} rejectionData - Rejection details
   * @param {string} rejectionData.reason - Reason for rejection
   * @param {string} rejectionData.message - Message to client
   * @returns {Promise} API response
   */
  rejectBooking: (bookingId, rejectionData) => {
    return apiService.post(endPoints.bookings.reject(bookingId), rejectionData);
  },

  /**
   * Mark booking as completed
   * @param {string|number} bookingId - Booking ID
   * @param {Object} completionData - Completion details
   * @param {Array} completionData.photos - Completion photos (optional)
   * @param {string} completionData.notes - Completion notes
   * @returns {Promise} API response
   */
  completeBooking: (bookingId, completionData = {}) => {
    return apiService.post(endPoints.bookings.complete(bookingId), completionData);
  },

  /**
   * Cancel a booking
   * @param {string|number} bookingId - Booking ID
   * @param {Object} cancellationData - Cancellation details
   * @param {string} cancellationData.reason - Reason for cancellation
   * @param {string} cancellationData.message - Message to client
   * @returns {Promise} API response
   */
  cancelBooking: (bookingId, cancellationData) => {
    return apiService.post(endPoints.bookings.cancel(bookingId), cancellationData);
  },

  /**
   * Get booking calendar data
   * @param {Object} params - Query parameters
   * @param {string} params.month - Month (YYYY-MM format)
   * @param {string} params.year - Year (YYYY format)
   * @param {string} params.view - Calendar view (month, week, day)
   * @returns {Promise} API response
   */
  getBookingCalendar: (params = {}) => {
    return apiService.get(endPoints.bookings.calendar, params);
  },

  /**
   * Get booking analytics
   * @param {Object} params - Query parameters
   * @param {string} params.dateRange - Date range (7d, 30d, 90d, 1y)
   * @param {string} params.groupBy - Group by (day, week, month)
   * @returns {Promise} API response
   */
  getBookingAnalytics: (params = {}) => {
    return apiService.get(endPoints.bookings.analytics, params);
  },

  /**
   * Update booking details
   * @param {string|number} bookingId - Booking ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} API response
   */
  updateBooking: (bookingId, updateData) => {
    return apiService.patch(endPoints.bookings.byId(bookingId), updateData);
  },

  /**
   * Add notes to a booking
   * @param {string|number} bookingId - Booking ID
   * @param {Object} noteData - Note data
   * @param {string} noteData.note - Note content
   * @param {boolean} noteData.isPrivate - Whether note is private to vendor
   * @returns {Promise} API response
   */
  addBookingNote: (bookingId, noteData) => {
    return apiService.post(`${endPoints.bookings.byId(bookingId)}/notes`, noteData);
  },

  /**
   * Upload booking-related files/photos
   * @param {string|number} bookingId - Booking ID
   * @param {FormData} fileData - File form data
   * @param {string} type - File type (contract, photos, invoice, etc.)
   * @returns {Promise} API response
   */
  uploadBookingFiles: (bookingId, fileData, type = 'photos') => {
    return apiService.postFormData(`${endPoints.bookings.byId(bookingId)}/files`, fileData, {
      'X-File-Type': type,
    });
  },

  /**
   * Get booking timeline/history
   * @param {string|number} bookingId - Booking ID
   * @returns {Promise} API response
   */
  getBookingTimeline: (bookingId) => {
    return apiService.get(`${endPoints.bookings.byId(bookingId)}/timeline`);
  },

  /**
   * Get upcoming bookings
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of bookings to fetch
   * @param {number} params.days - Number of days ahead to look
   * @returns {Promise} API response
   */
  getUpcomingBookings: (params = { limit: 10, days: 7 }) => {
    return apiService.get('vendor/bookings/upcoming', params);
  },

  /**
   * Get booking statistics summary
   * @param {Object} params - Query parameters
   * @param {string} params.period - Time period (today, week, month, year)
   * @returns {Promise} API response
   */
  getBookingStats: (params = {}) => {
    return apiService.get('vendor/bookings/stats', params);
  },

  /**
   * Export bookings data
   * @param {Object} filters - Export filters
   * @param {string} format - Export format (csv, xlsx, pdf)
   * @returns {Promise} API response
   */
  exportBookings: (filters = {}, format = 'csv') => {
    return apiService.get('vendor/bookings/export', { ...filters, format });
  },

  /**
   * Send message to booking client
   * @param {string|number} bookingId - Booking ID
   * @param {Object} messageData - Message data
   * @param {string} messageData.message - Message content
   * @param {Array} messageData.attachments - File attachments (optional)
   * @returns {Promise} API response
   */
  sendBookingMessage: (bookingId, messageData) => {
    return apiService.post(`${endPoints.bookings.byId(bookingId)}/messages`, messageData);
  },

  /**
   * Get booking messages/chat
   * @param {string|number} bookingId - Booking ID
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getBookingMessages: (bookingId, params = {}) => {
    return apiService.get(`${endPoints.bookings.byId(bookingId)}/messages`, params);
  },
};

export default bookingService;
