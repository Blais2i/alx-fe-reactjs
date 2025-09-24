import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 10000,
});

// Error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 404:
          throw new Error('User not found');
        case 403:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error('Failed to fetch user data');
      }
    } else if (error.request) {
      throw new Error('Network error');
    } else {
      throw new Error('Request error');
    }
  }
);

export const githubService = {
  /**
   * Fetch user data from GitHub API
   * @param {string} username - GitHub username
   * @returns {Promise} User data
   */
  fetchUserData: async (username) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await apiClient.get(`/users/${username.trim()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default githubService;