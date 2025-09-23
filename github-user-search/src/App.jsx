import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { githubService } from './services/githubAPI';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await githubService.searchUsers(query);
      setUsers(result.items || []);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users by username</p>
      </header>
      
      <main className="App-main">
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Searching...</div>}
        
        {error && (
          <div className="error">
            Error: {error}
          </div>
        )}
        
        <div className="results-container">
          {users.length > 0 ? (
            <div className="users-grid">
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            !loading && !error && (
              <div className="no-results">
                Enter a username to search for GitHub users
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default App;