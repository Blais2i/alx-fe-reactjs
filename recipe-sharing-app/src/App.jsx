// src/pages/Home.jsx
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';

const Home = () => (
  <div>
    <h1>Welcome to Recipe Sharing App</h1>
    <SearchBar />
    <RecipeList />
  </div>
);

export default Home;
