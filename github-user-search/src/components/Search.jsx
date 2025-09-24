import { useState } from 'react';
import { githubService } from '../services/githubService';
import UserCard from './UserCard';

const Search = () => {
  const [searchType, setSearchType] = useState('basic');
  const [filters, setFilters] = useState({
    username: '',
    location: '',
    minRepos: '',
    minFollowers: '',
    language: '',
    sortBy: 'joined',
    sortOrder: 'desc'
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!filters.username.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);
    setCurrentPage(1);

    try {
      const userData = await githubService.fetchUserData(filters.username.trim());
      setResults({
        users: [userData],
        totalCount: 1,
        page: 1,
        perPage: 1
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e, page = 1) => {
    e?.preventDefault();
    
    const hasFilters = Object.values(filters).some(value => 
      value !== '' && value !== null && value !== undefined
    );
    
    if (!hasFilters) {
      setError('Please provide at least one search criteria');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const searchResults = await githubService.advancedSearch(filters, page, 9);
      setResults(searchResults);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (results && currentPage * 9 < results.totalCount) {
      handleAdvancedSearch(null, currentPage + 1);
    }
  };

  const handleReset = () => {
    setFilters({
      username: '',
      location: '',
      minRepos: '',
      minFollowers: '',
      language: '',
      sortBy: 'joined',
      sortOrder: 'desc'
    });
    setResults(null);
    setError('');
    setCurrentPage(1);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="App-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users with advanced filtering options</p>
      </div>

      <div className="search-container">
        {/* Search Type Toggle */}
        <div className="search-type-toggle">
          <div className="toggle-container">
            <button
              onClick={() => setSearchType('basic')}
              className={`toggle-btn ${searchType === 'basic' ? 'active' : ''}`}
            >
              Basic Search
            </button>
            <button
              onClick={() => setSearchType('advanced')}
              className={`toggle-btn ${searchType === 'advanced' ? 'active' : ''}`}
            >
              Advanced Search
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="card search-form">
          {searchType === 'basic' ? (
            <form onSubmit={handleBasicSearch} className="flex gap-4">
              <input
                type="text"
                value={filters.username}
                onChange={(e) => updateFilter('username', e.target.value)}
                placeholder="Enter GitHub username..."
                className="input-field"
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !filters.username.trim()}
              >
                {loading ? 'Searching...' : 'Search User'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdvancedSearch}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={filters.username}
                    onChange={(e) => updateFilter('username', e.target.value)}
                    placeholder="username in:login"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    placeholder="e.g., 'New York'"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Min Repositories</label>
                  <input
                    type="number"
                    value={filters.minRepos}
                    onChange={(e) => updateFilter('minRepos', e.target.value)}
                    placeholder="e.g., 10"
                    min="0"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Min Followers</label>
                  <input
                    type="number"
                    value={filters.minFollowers}
                    onChange={(e) => updateFilter('minFollowers', e.target.value)}
                    placeholder="e.g., 100"
                    min="0"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Programming Language</label>
                  <input
                    type="text"
                    value={filters.language}
                    onChange={(e) => updateFilter('language', e.target.value)}
                    placeholder="e.g., JavaScript"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="input-field"
                  >
                    <option value="joined">Join Date</option>
                    <option value="repositories">Repositories</option>
                    <option value="followers">Followers</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Advanced Search'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <div className="error-title">Search Error</div>
            <div className="error-desc">{error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="loading-spinner"></div>
            <div className="loading-text">Searching GitHub users...</div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="results-section">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Search Results</h2>
                <p className="text-gray-600">
                  Found {results.totalCount.toLocaleString()} user{results.totalCount !== 1 ? 's' : ''}
                  {results.totalCount > 1000 ? ' (first 1000 shown)' : ''}
                </p>
              </div>
              
              {results.totalCount > 9 && (
                <button
                  onClick={handleLoadMore}
                  disabled={loading || currentPage * 9 >= results.totalCount}
                  className="btn btn-primary"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              )}
            </div>

            <div className="results-grid">
              {results.users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {results.totalCount > 9 && (
              <div className="text-center text-gray-600 mt-6">
                Showing {Math.min(results.users.length, 9)} of{' '}
                {Math.min(results.totalCount, 1000)} results
                {currentPage > 1 && ` • Page ${currentPage}`}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !results && searchType === 'advanced' && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
            <p>Use the advanced filters above to find GitHub users</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;