import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserDetails from './components/UserDetails';
import { githubService } from './services/githubAPI';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    setUser(null);

    try {
      // Using the required fetchUserData function
      const userData = await githubService.fetchUserData(username);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      setUser(null);
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
        <SearchBar onSearch={handleSearch} loading={loading} />
        <UserDetails user={user} error={error} loading={loading} />
      </main>
    </div>
  );
}

export default App;