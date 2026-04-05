// API Configuration
// This file centralizes all API calls to make it easy to switch between environments

// Default to the hosted backend so deployed frontends point to Render backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bhashinivocalresume-backend.onrender.com';

export const getApiUrl = (endpoint: string) => {
  // Remove leading slash from endpoint to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Remove trailing slash from API_URL to avoid double slashes
  const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  return `${cleanApiUrl}/${cleanEndpoint}`;
};

// Export the base URL for direct use
export const API_BASE_URL = API_URL;

// Helper function for API calls with credentials
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = getApiUrl(endpoint);
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
};

