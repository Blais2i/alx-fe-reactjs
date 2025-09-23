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
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for error handling
githubAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || 'Unknown error occurred';
      
      switch (status) {
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        case 404:
          throw new Error('Resource not found.');
        case 422:
          throw new Error('Validation failed. Please check your input.');
        case 500:
        case 502:
        case 503:
          throw new Error('GitHub API is currently unavailable. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${message}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Unable to connect to GitHub API. Please check your internet connection.');
    } else {
      // Something else happened
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

// API service functions
export const githubService = {
  /**
   * Search for GitHub users by username, email, or full name
   * @param {string} query - Search query
   * @param {number} perPage - Number of results per page (default: 30, max: 100)
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Search results
   */
  searchUsers: async (query, perPage = 30, page = 1) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    if (perPage > 100) {
      throw new Error('perPage cannot exceed 100');
    }

    try {
      const response = await githubAPI.get(`/search/users`, {
        params: {
          q: query.trim(),
          per_page: perPage,
          page: page,
          sort: 'joined', // Sort by join date
          order: 'desc' // Most recent first
        }
      });
      return response.data;
    } catch (error) {
      throw error; // Error is already handled by interceptor
    }
  },

  /**
   * Get detailed information about a specific user
   * @param {string} username - GitHub username
   * @returns {Promise} User details
   */
  getUser: async (username) => {
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
   * Get user's repositories
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of repositories per page (default: 10, max: 100)
   * @param {number} page - Page number (default: 1)
   * @param {string} sort - Sort field (pushed, created, updated, full_name, default: updated)
   * @param {string} direction - Sort direction (asc, desc, default: desc)
   * @returns {Promise} User's repositories
   */
  getUserRepos: async (username, perPage = 10, page = 1, sort = 'updated', direction = 'desc') => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    if (perPage > 100) {
      throw new Error('perPage cannot exceed 100');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}/repos`, {
        params: {
          per_page: perPage,
          page: page,
          sort: sort,
          direction: direction
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's followers
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of followers per page (default: 30, max: 100)
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} User's followers
   */
  getUserFollowers: async (username, perPage = 30, page = 1) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}/followers`, {
        params: {
          per_page: perPage,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get users that the specified user is following
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of users per page (default: 30, max: 100)
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Users being followed
   */
  getUserFollowing: async (username, perPage = 30, page = 1) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}/following`, {
        params: {
          per_page: perPage,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get rate limit status
   * @returns {Promise} Rate limit information
   */
  getRateLimit: async () => {
    try {
      const response = await githubAPI.get('/rate_limit');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's organizations
   * @param {string} username - GitHub username
   * @returns {Promise} User's organizations
   */
  getUserOrgs: async (username) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}/orgs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's starred repositories
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of starred repos per page (default: 30, max: 100)
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} User's starred repositories
   */
  getUserStarredRepos: async (username, perPage = 30, page = 1) => {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/users/${username.trim()}/starred`, {
        params: {
          per_page: perPage,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search repositories (bonus function)
   * @param {string} query - Search query
   * @param {number} perPage - Number of results per page (default: 30, max: 100)
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Search results
   */
  searchRepos: async (query, perPage = 30, page = 1) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    try {
      const response = await githubAPI.get(`/search/repositories`, {
        params: {
          q: query.trim(),
          per_page: perPage,
          page: page,
          sort: 'stars',
          order: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Utility functions
export const githubUtils = {
  /**
   * Format user data for display
   * @param {Object} user - Raw user data from API
   * @returns {Object} Formatted user data
   */
  formatUser: (user) => {
    return {
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      name: user.name || '',
      bio: user.bio || '',
      company: user.company || '',
      blog: user.blog || '',
      location: user.location || '',
      email: user.email || '',
      twitter_username: user.twitter_username || '',
      public_repos: user.public_repos || 0,
      public_gists: user.public_gists || 0,
      followers: user.followers || 0,
      following: user.following || 0,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  },

  /**
   * Format repository data for display
   * @param {Object} repo - Raw repository data from API
   * @returns {Object} Formatted repository data
   */
  formatRepo: (repo) => {
    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description || '',
      language: repo.language || '',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      open_issues_count: repo.open_issues_count || 0,
      size: repo.size || 0,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      owner: {
        login: repo.owner?.login,
        avatar_url: repo.owner?.avatar_url,
        html_url: repo.owner?.html_url
      }
    };
  },

  /**
   * Check if rate limit is exceeded
   * @param {Object} rateLimit - Rate limit data from getRateLimit()
   * @returns {boolean} True if rate limit is exceeded
   */
  isRateLimitExceeded: (rateLimit) => {
    return rateLimit.resources.core.remaining === 0;
  },

  /**
   * Get time until rate limit resets (in minutes)
   * @param {Object} rateLimit - Rate limit data from getRateLimit()
   * @returns {number} Minutes until reset
   */
  getMinutesUntilReset: (rateLimit) => {
    const resetTime = rateLimit.resources.core.reset * 1000; // Convert to milliseconds
    const now = Date.now();
    return Math.ceil((resetTime - now) / 60000); // Convert to minutes
  }
};

// Default export
export default githubService;