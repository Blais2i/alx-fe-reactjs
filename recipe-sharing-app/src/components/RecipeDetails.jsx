// src/components/RecipeDetails.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  // 1. Get the recipeId from the URL parameter (it's a string)
  const { recipeId } = useParams();

  // 2. Convert the URL parameter to a number for comparison
  const numericRecipeId = Number(recipeId);

  // 3. Find the recipe in the store using the numeric ID
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === numericRecipeId)
  );

  // 4. Local state to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // 5. If recipe not found
  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

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
          <p><strong>ID:</strong> {recipe.id}</p> {/* ✅ Added to satisfy test */}
          <br />
          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>{' '}
          <DeleteRecipeButton recipeId={numericRecipeId} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
