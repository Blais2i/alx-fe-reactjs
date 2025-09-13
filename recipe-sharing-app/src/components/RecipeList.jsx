// src/components/RecipeList.jsx
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  // Get just the 'recipes' array from the store
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {/* Check if there are recipes first */}
      {recipes.length === 0 ? (
        <p>No recipes yet. Be the first to add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;