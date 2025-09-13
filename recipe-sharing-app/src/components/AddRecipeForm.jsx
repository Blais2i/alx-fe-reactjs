// src/components/AddRecipeForm.jsx
import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  // Get the 'addRecipe' action from the store
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  // Local component state for the form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the store action to add the new recipe
    addRecipe({ title, description });
    // Reset the form fields
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add a New Recipe</h2>
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
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;