// src/components/RecipeDetails.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  // 1. Get the recipeId from the URL parameter
  const { recipeId } = useParams();
  // 2. Convert the URL parameter (string) to a number for comparison
  const numericRecipeId = Number(recipeId);
  // 3. Find the recipe in the store
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === numericRecipeId)
  );

  // 4. Local state to manage whether we are in "edit mode" or "view mode"
  const [isEditing, setIsEditing] = useState(false);

  // 5. If the recipe isn't found, show a message
  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  // 6. Render the component
  return (
    <div>
      <Link to="/">← Back to All Recipes</Link>

      {isEditing ? (
        // If we are editing, show the form
        <EditRecipeForm
          recipeId={numericRecipeId}
          onCancel={() => setIsEditing(false)} // Clicking cancel exits edit mode
        />
      ) : (
        // If we are viewing, show the details and action buttons
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <br />
          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
          {' '}
          <DeleteRecipeButton recipeId={numericRecipeId} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;