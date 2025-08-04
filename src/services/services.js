/**
 * Main Services Export File
 * Central place to import all services from
 */

// Core API service
export { default as api, apiService, baseUrl } from './index';

// Feature-specific services
export { authService } from './authService';
export { vendorService } from './vendorService';
export { listingService } from './listingService';
export { bookingService } from './bookingService';

// Import additional services as they are created
// export { stockService } from './stockService';
// export { analyticsService } from './analyticsService';
// export { billingService } from './billingService';
// export { chatService } from './chatService';
// export { notificationService } from './notificationService';

/**
 * Usage Examples:
 * 
 * // Import specific services
 * import { authService, vendorService } from '../services/services';
 * 
 * // Use the services
 * const loginResponse = await authService.login({ email, password });
 * const profile = await vendorService.getProfile();
 * 
 * // Import core API for custom calls
 * import { api, apiService } from '../services/services';
 * 
 * // Make custom API calls
 * const customResponse = await api('custom/endpoint', data, 'POST');
 * const getResponse = await apiService.get('custom/endpoint', params);
 */
