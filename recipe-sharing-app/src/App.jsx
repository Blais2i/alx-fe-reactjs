// src/App.jsx or src/pages/Home.jsx
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Recipe Sharing App</h1>
      <FavoritesList />
      <RecommendationsList />
    </div>
  );
};

export default Home;
