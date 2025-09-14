// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Be the first to add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
            {/* Link to the detailed view using the recipe's ID */}
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;