import { useState } from 'react';
import { githubService } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const userData = await githubService.fetchUserData(username.trim());
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Display Results */}
      <div className="results">
        {loading && (
          <div className="message loading">
            Loading...
          </div>
        )}

        {error && (
          <div className="message error">
            Looks like we cant find the user
          </div>
        )}

        {user && (
          <div className="user-card">
            <div className="user-avatar">
              <img src={user.avatar_url} alt={`${user.login} avatar`} />
            </div>
            <div className="user-info">
              <h2 className="user-name">{user.name || user.login}</h2>
              <p className="user-login">@{user.login}</p>
              {user.bio && <p className="user-bio">{user.bio}</p>}
              <div className="user-stats">
                <span className="stat">Repos: {user.public_repos}</span>
                <span className="stat">Followers: {user.followers}</span>
                <span className="stat">Following: {user.following}</span>
              </div>
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;