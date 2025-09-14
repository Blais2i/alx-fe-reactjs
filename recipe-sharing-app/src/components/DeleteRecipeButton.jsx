// src/components/DeleteRecipeButton.jsx
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    // Simple confirmation before deleting
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
    }
  };

  return (
    <button onClick={handleDelete} style={{backgroundColor: '#ff4444', color: 'white'}}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;