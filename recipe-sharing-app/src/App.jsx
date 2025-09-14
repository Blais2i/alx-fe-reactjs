// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import './App.css'

function App() {
  return (
    // 1. Wrap the entire app in the Router component
    <Router>
      <div className="App">
        <h1>🍳 Recipe Sharing App</h1>
        {/* 2. Define our routes using the Routes and Route components */}
        <Routes>
          {/* 3. Route for the home page */}
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          } />
          {/* 4. Dynamic route for individual recipe details */}
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App