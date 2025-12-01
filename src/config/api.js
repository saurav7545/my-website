// Backend API Configuration
// Change the API_BASE_URL to your backend URL

// Default backend URL (can be overridden by environment variable)
const DEFAULT_API_URL = 'https://backend1-2agm.onrender.com';

// Get API URL from environment variable or use default
// To change the backend URL:
// 1. Create a .env file in the root directory
// 2. Add: REACT_APP_API_URL=https://your-backend-url.com
// 3. Restart the development server
export const API_BASE_URL = (
  process.env.REACT_APP_API_URL ?? DEFAULT_API_URL
).replace(/\/$/, '');

// Helper function to get backend base URL (without /api)
export const getBackendBaseURL = () => {
  const fallback = API_BASE_URL.replace(/\/api\/?$/, '');
  if (typeof window === 'undefined') return fallback;
  try {
    const resolved = new URL(API_BASE_URL, window.location.origin);
    return resolved.origin.replace(/\/$/, '');
  } catch {
    return fallback;
  }
};

// Log the API URL in development (for debugging)
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 API Base URL:', API_BASE_URL);
}

