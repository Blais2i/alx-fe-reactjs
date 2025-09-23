const UserDetails = ({ user, error, loading }) => {
  if (loading) {
    return (
      <div className="user-details loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-details error">
        <div className="error-icon">⚠️</div>
        <h3>Looks like we can't find the user</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details initial">
        <div className="initial-icon">🔍</div>
        <h3>Search for a GitHub user</h3>
        <p>Enter a username above to get started</p>
      </div>
    );
  }

  return (
    <div className="user-details success">
      <div className="user-header">
        <div className="user-avatar">
          <img src={user.avatar_url} alt={`${user.login} avatar`} />
        </div>
        <div className="user-basic-info">
          <h2 className="user-name">{user.name || user.login}</h2>
          <p className="user-login">@{user.login}</p>
          {user.bio && <p className="user-bio">{user.bio}</p>}
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stat-item">
          <span className="stat-number">{user.public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="user-additional-info">
        {user.company && (
          <div className="info-item">
            <span className="info-label">Company:</span>
            <span className="info-value">{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className="info-item">
            <span className="info-label">Location:</span>
            <span className="info-value">{user.location}</span>
          </div>
        )}
        {user.blog && (
          <div className="info-item">
            <span className="info-label">Website:</span>
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="info-value">
              {user.blog}
            </a>
          </div>
        )}
        {user.twitter_username && (
          <div className="info-item">
            <span className="info-label">Twitter:</span>
            <a 
              href={`https://twitter.com/${user.twitter_username}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="info-value"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>

      <div className="user-actions">
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
  );
};

export default UserDetails;