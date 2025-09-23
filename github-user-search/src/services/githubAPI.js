import axios from 'axios';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with common configuration
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    })
  },
  timeout: 10000,
});

// Add response interceptor for error handling
githubAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Unknown error occurred';
      
      switch (status) {
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        case 404:
          throw new Error('User not found. Please check the username and try again.');
        case 422:
          throw new Error('Invalid username format.');
        case 500:
        case 502:
        case 503:
          throw new Error('GitHub API is currently unavailable. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to GitHub API. Please check your internet connection.');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

// API service functions
export const githubService = {
  /**
   * Fetch user data from GitHub API - REQUIRED FUNCTION
   * @param {string} username - GitHub username
   * @returns {Promise} User data
   */
  fetchUserData: async (username) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search for GitHub users (for future enhancement)
   * @param {string} query - Search query
   * @param {number} perPage - Number of results per page
   * @param {number} page - Page number
   * @returns {Promise} Search results
   */
  searchUsers: async (query, perPage = 30, page = 1) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/search/users`, {
        params: {
          q: query.trim(),
          per_page: perPage,
          page: page,
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's repositories
   * @param {string} username - GitHub username
   * @returns {Promise} User's repositories
   */
  getUserRepos: async (username) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}/repos`, {
        params: {
          per_page: 10,
          sort: 'updated',
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default githubService;