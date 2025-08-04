/**
 * HTTP Request Types
 */
export const requestType = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

/**
 * API Headers Configuration
 */
export const apiHeaders = {
  contentType: 'Content-Type',
  application_json: 'application/json',
  multipart_data: 'multipart/form-data',
  authorization: 'Authorization',
  language: 'Accept-Language',
  accept: 'Accept',
};

/**
 * API Endpoints
 * Organized by feature/module for better maintainability
 */
export const endPoints = {
  // Authentication endpoints
  auth: {
    login: 'vendor/login',
    register: 'vendor/register',
    logout: 'vendor/logout',
    refreshToken: 'vendor/refresh-token',
    sendOtp: 'vendor/send-otp',
    verifyOtp: 'vendor/verify-otp',
    forgotPassword: 'vendor/forgot-password',
    resetPassword: 'vendor/reset-password',
    changePassword: 'vendor/change-password',
  },

  // Vendor profile endpoints
  vendor: {
    profile: 'vendor/profile',
    updateProfile: 'vendor/profile',
    uploadBanner: 'vendor/banner',
    uploadAvatar: 'vendor/avatar',
    updateBusinessInfo: 'vendor/business-info',
    getCategories: 'vendor/categories',
    updateCategories: 'vendor/categories',
  },

  // Listing management endpoints
  listings: {
    all: 'vendor/listings',
    create: 'vendor/listings',
    update: (id) => `vendor/listings/${id}`,
    delete: (id) => `vendor/listings/${id}`,
    toggle: (id) => `vendor/listings/${id}/toggle`,
    uploadImages: (id) => `vendor/listings/${id}/images`,
    analytics: 'vendor/listings/analytics',
  },

  // Booking management endpoints
  bookings: {
    all: 'vendor/bookings',
    byId: (id) => `vendor/bookings/${id}`,
    accept: (id) => `vendor/bookings/${id}/accept`,
    reject: (id) => `vendor/bookings/${id}/reject`,
    complete: (id) => `vendor/bookings/${id}/complete`,
    cancel: (id) => `vendor/bookings/${id}/cancel`,
    calendar: 'vendor/bookings/calendar',
    analytics: 'vendor/bookings/analytics',
  },

  // Stock management endpoints
  stock: {
    all: 'vendor/stock',
    create: 'vendor/stock',
    update: (id) => `vendor/stock/${id}`,
    delete: (id) => `vendor/stock/${id}`,
    stockIn: 'vendor/stock/stock-in',
    stockOut: 'vendor/stock/stock-out',
    lowStock: 'vendor/stock/low-stock',
  },

  // Analytics and reporting endpoints
  analytics: {
    dashboard: 'vendor/analytics/dashboard',
    earnings: 'vendor/analytics/earnings',
    bookings: 'vendor/analytics/bookings',
    performance: 'vendor/analytics/performance',
    exportReport: 'vendor/analytics/export',
  },

  // Billing and payments endpoints
  billing: {
    invoices: 'vendor/billing/invoices',
    payments: 'vendor/billing/payments',
    generateInvoice: 'vendor/billing/generate-invoice',
    downloadInvoice: (id) => `vendor/billing/invoices/${id}/download`,
  },

  // Chat and communication endpoints
  chat: {
    conversations: 'vendor/chat/conversations',
    messages: (conversationId) => `vendor/chat/conversations/${conversationId}/messages`,
    sendMessage: (conversationId) => `vendor/chat/conversations/${conversationId}/messages`,
    markAsRead: (conversationId) => `vendor/chat/conversations/${conversationId}/read`,
  },

  // Notifications endpoints
  notifications: {
    all: 'vendor/notifications',
    markAsRead: (id) => `vendor/notifications/${id}/read`,
    markAllAsRead: 'vendor/notifications/read-all',
    settings: 'vendor/notifications/settings',
  },

  // Role management endpoints
  roles: {
    all: 'vendor/roles',
    create: 'vendor/roles',
    update: (id) => `vendor/roles/${id}`,
    delete: (id) => `vendor/roles/${id}`,
    permissions: 'vendor/roles/permissions',
  },

  // Staff management endpoints
  staff: {
    all: 'vendor/staff',
    create: 'vendor/staff',
    update: (id) => `vendor/staff/${id}`,
    delete: (id) => `vendor/staff/${id}`,
    roles: 'vendor/staff/roles',
  },

  // Tracking endpoints
  tracking: {
    orders: 'vendor/tracking/orders',
    updateStatus: (orderId) => `vendor/tracking/orders/${orderId}/status`,
    uploadProof: (orderId) => `vendor/tracking/orders/${orderId}/proof`,
  },

  // Settings endpoints
  settings: {
    general: 'vendor/settings/general',
    notifications: 'vendor/settings/notifications',
    security: 'vendor/settings/security',
    preferences: 'vendor/settings/preferences',
  },

  // File upload endpoints
  upload: {
    image: 'vendor/upload/image',
    document: 'vendor/upload/document',
    multiple: 'vendor/upload/multiple',
  },

  // General/Utility endpoints
  general: {
    categories: 'categories',
    subcategories: 'subcategories',
    locations: 'locations',
    currencies: 'currencies',
  },
};

/**
 * API Response Status Codes
 */
export const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Common API configurations
 */
export const apiConfig = {
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Error Messages
 */
export const errorMessages = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  FORBIDDEN: 'Access forbidden. You don\'t have permission.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};
