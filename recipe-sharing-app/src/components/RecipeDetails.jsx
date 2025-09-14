// src/components/RecipeDetails.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const numericRecipeId = Number(recipeId);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === numericRecipeId)
  );

  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <div>
      <Link to="/">← Back to All Recipes</Link>

      {isEditing ? (
        <EditRecipeForm
          recipeId={numericRecipeId}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <p><strong>ID:</strong> {recipe.id}</p>

          <button onClick={toggleFavorite} style={{ marginRight: '10px' }}>
            {isFavorite ? '★ Unfavorite' : '☆ Add to Favorites'}
          </button>

          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>{' '}
          <DeleteRecipeButton recipeId={numericRecipeId} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
