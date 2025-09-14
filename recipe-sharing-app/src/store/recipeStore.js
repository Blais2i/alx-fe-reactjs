// src/store/recipeStore.js
import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { id: Date.now(), ...newRecipe }] 
  })),
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  setRecipes: (fetchedRecipes) => set({ recipes: fetchedRecipes })
}))

export default useRecipeStore;