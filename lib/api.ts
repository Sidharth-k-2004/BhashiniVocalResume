// API Configuration
// This file centralizes all API calls to make it easy to switch between environments

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getApiUrl = (endpoint: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_URL}/${cleanEndpoint}`;
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

