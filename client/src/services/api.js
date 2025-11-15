import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.PROD) {
    // Production: Use your actual Render backend URL
    return 'https://feedback-system-1-1p21.onrender.com/api/feedback';
  } else {
    // Development: Use Vite proxy
    return '/api/feedback';
  }
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to add logging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const feedbackAPI = {
  // Submit new feedback
  submitFeedback: async (feedbackData) => {
    const response = await api.post('/', feedbackData);
    return response.data;
  },

  // Get all feedbacks with optional rating filter
  getFeedbacks: async (ratingFilter = null) => {
    const params = ratingFilter ? { rating: ratingFilter.join(',') } : {};
    const response = await api.get('/', { params });
    return response.data;
  },

  // Get feedback statistics
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },
};

export default api;
