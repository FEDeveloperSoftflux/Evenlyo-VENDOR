# Services Architecture Documentation

## Overview

This services layer provides a comprehensive and organized approach to handle all API communications in the Evenlyo Vendor application. It's designed with scalability, maintainability, and developer experience in mind.

## Architecture Structure

```
src/services/
├── index.js              # Core API service and utilities
├── services.js           # Main export file for easy imports
├── authService.js        # Authentication-related API calls
├── vendorService.js      # Vendor profile management
├── listingService.js     # Listing management operations
├── bookingService.js     # Booking management operations
├── constants/
│   └── api.js           # API constants, endpoints, and configurations
└── README.md            # This documentation file
```

## Core Features

### 🔧 **Core API Service (`index.js`)**
- Generic API wrapper function
- Automatic token management
- Request/Response interceptors
- Error handling with specific status codes
- Support for both JSON and FormData
- Environment variable support
- Comprehensive logging

### 📋 **Constants Management (`constants/api.js`)**
- Organized endpoint definitions by feature
- HTTP method constants
- API headers configuration
- Status codes mapping
- Error messages
- API configuration settings

### 🔐 **Authentication Service (`authService.js`)**
- Login/Register/Logout
- OTP management
- Password reset functionality
- Session validation
- Token refresh

### 👤 **Vendor Service (`vendorService.js`)**
- Profile management
- Business information updates
- File uploads (banner, avatar)
- Category management
- Verification processes

### 📊 **Listing Service (`listingService.js`)**
- CRUD operations for listings
- Image management
- Status toggling
- Analytics and performance tracking
- Bulk operations
- Export functionality

### 📅 **Booking Service (`bookingService.js`)**
- Booking lifecycle management
- Calendar integration
- Analytics and reporting
- File uploads and messaging
- Status updates

## Usage Examples

### Basic Service Usage

```javascript
// Import specific services
import { authService, vendorService, listingService } from '../services/services';

// Authentication
const loginResponse = await authService.login({
  email: 'vendor@example.com',
  password: 'password123'
});

// Profile management
const profile = await vendorService.getProfile();
const updateResult = await vendorService.updateProfile({
  businessName: 'New Business Name',
  description: 'Updated description'
});

// Listing management
const listings = await listingService.getAllListings({
  page: 1,
  limit: 10,
  status: 'active'
});

const newListing = await listingService.createListing({
  title: 'New Event Service',
  description: 'Service description',
  price: 1000
});
```

### Custom API Calls

```javascript
// Import core API service for custom endpoints
import { api, apiService } from '../services/services';

// Using the generic api function
const customResponse = await api('custom/endpoint', data, 'POST');

// Using helper methods
const getData = await apiService.get('custom/endpoint', { param: 'value' });
const postData = await apiService.post('custom/endpoint', requestData);
const uploadFile = await apiService.postFormData('upload/endpoint', formData);
```

### Error Handling

```javascript
import { authService } from '../services/services';

try {
  const response = await authService.login(credentials);
  // Handle success
  console.log('Login successful:', response.data);
} catch (error) {
  // Handle different error types
  if (error.message === 'Session expired. Please login again.') {
    // Redirect to login
  } else if (error.message.includes('forbidden')) {
    // Handle permission error
  } else {
    // Handle other errors
    console.error('Login failed:', error.message);
  }
}
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_URL=https://your-api-base-url.com/api/v1/
```

### Token Storage

The services layer automatically manages vendor tokens:
- Stores tokens in `localStorage` as `vendorToken`
- Automatically adds Authorization headers
- Handles token expiration and cleanup

## API Response Structure

All services return the original axios response object:

```javascript
{
  data: {}, // Response data from server
  status: 200, // HTTP status code
  statusText: 'OK',
  headers: {},
  config: {} // Request configuration
}
```

## Error Handling

The services layer provides comprehensive error handling:

- **401 Unauthorized**: Automatic token cleanup and logout
- **403 Forbidden**: Permission denied errors
- **404 Not Found**: Resource not found
- **500+ Server Errors**: Server-side errors
- **Network Errors**: Connection issues

## Adding New Services

To add a new service module:

1. **Create the service file** (e.g., `stockService.js`):

```javascript
import { apiService } from './index';
import { endPoints } from '../constants/api';

export const stockService = {
  getAllItems: (params = {}) => {
    return apiService.get(endPoints.stock.all, params);
  },
  
  createItem: (itemData) => {
    return apiService.post(endPoints.stock.create, itemData);
  },
  
  // Add more methods...
};

export default stockService;
```

2. **Add endpoints to constants** (`constants/api.js`):

```javascript
export const endPoints = {
  // ... existing endpoints
  stock: {
    all: 'vendor/stock',
    create: 'vendor/stock',
    update: (id) => `vendor/stock/${id}`,
    delete: (id) => `vendor/stock/${id}`,
  },
};
```

3. **Export from main services file** (`services.js`):

```javascript
export { stockService } from './stockService';
```

## Best Practices

### 1. **Consistent Error Handling**
Always wrap service calls in try-catch blocks and handle errors appropriately.

### 2. **Parameter Validation**
Validate required parameters before making API calls:

```javascript
createListing: (listingData) => {
  if (!listingData || !listingData.title) {
    throw new Error('Listing title is required');
  }
  return apiService.post(endPoints.listings.create, listingData);
}
```

### 3. **Loading States**
Use loading states in components when making API calls:

```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    await vendorService.updateProfile(data);
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

### 4. **Data Transformation**
Transform data in services when needed:

```javascript
getFormattedListings: async (params) => {
  const response = await apiService.get(endPoints.listings.all, params);
  return {
    ...response,
    data: {
      ...response.data,
      listings: response.data.listings.map(listing => ({
        ...listing,
        formattedPrice: `$${listing.price.toLocaleString()}`
      }))
    }
  };
}
```

## Migration from Existing Code

If you have existing API calls, you can gradually migrate them:

1. **Replace direct axios calls** with service methods
2. **Update import statements** to use the new services
3. **Update error handling** to use the new error structure
4. **Test thoroughly** to ensure functionality remains the same

## Testing

Each service can be tested independently:

```javascript
// Example test
import { authService } from '../services/services';

describe('AuthService', () => {
  test('should login successfully', async () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const response = await authService.login(mockCredentials);
    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });
});
```

## Support and Maintenance

This services architecture is designed to be:
- **Scalable**: Easy to add new services and endpoints
- **Maintainable**: Clear separation of concerns
- **Flexible**: Supports various data formats and custom headers
- **Robust**: Comprehensive error handling and logging

For questions or issues, refer to the development team or create an issue in the project repository.
