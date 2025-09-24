import { useState, useEffect } from 'react';
import { githubService } from '../services/githubService';

const UserCard = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await githubService.fetchUserData(user.login);
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user.login]);

  if (loading) {
    return (
      <div className="user-card">
        <div className="user-header">
          <div className="user-avatar">
            <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#e5e7eb'}}></div>
          </div>
          <div className="user-info">
            <div style={{height: '20px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px', width: '120px'}}></div>
            <div style={{height: '16px', background: '#e5e7eb', borderRadius: '4px', width: '80px'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-card">
      <div className="user-header">
        <div className="user-avatar">
          <img src={user.avatar_url} alt={`${user.login} avatar`} />
        </div>
        <div className="user-info">
          <h3>{userDetails?.name || user.login}</h3>
          <p className="user-login">@{user.login}</p>
          {userDetails?.bio && (
            <p className="user-bio">{userDetails.bio}</p>
          )}
        </div>
      </div>

      <div className="user-stats">
        <span className="stat-badge">📊 {userDetails?.public_repos || 0} repos</span>
        <span className="stat-badge">👥 {userDetails?.followers || 0} followers</span>
        {userDetails?.location && (
          <span className="stat-badge">📍 {userDetails.location}</span>
        )}
      </div>

      <div className="user-meta">
        {userDetails?.company && (
          <div className="meta-item">
            <span>Company:</span>
            <strong>{userDetails.company}</strong>
          </div>
        )}
        
        {userDetails?.blog && (
          <div className="meta-item">
            <span>Website:</span>
            <a href={userDetails.blog} target="_blank" rel="noopener noreferrer">
              {userDetails.blog}
            </a>
          </div>
        )}
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-full text-center"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;