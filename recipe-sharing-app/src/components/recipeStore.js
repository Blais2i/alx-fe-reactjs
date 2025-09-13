// src/store/recipeStore.js
import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { id: Date.now(), ...newRecipe }] 
  })),
  setRecipes: (fetchedRecipes) => set({ recipes: fetchedRecipes })
}))

export default useRecipeStore;