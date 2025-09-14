// src/components/EditRecipeForm.jsx
import { useState, useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = ({ recipeId, onCancel }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  // Local state to manage the form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // When the component loads or the recipe prop changes,
  // pre-fill the form with the current recipe data.
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the store action to update the recipe
    updateRecipe({ id: recipeId, title, description });
    // If an onCancel callback was provided (e.g., to close the form), call it.
    if (onCancel) onCancel();
  };

  // If the recipe isn't found (shouldn't happen), don't render the form.
  if (!recipe) return null;

  return (
    <div>
      <h3>Edit Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            required
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            required
          />
        </div>
        <button type="submit">Save Changes</button>
        {' '}
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditRecipeForm;