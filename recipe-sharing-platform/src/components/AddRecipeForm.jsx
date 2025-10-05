import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    cookingTime: '',
    difficulty: 'Easy',
    servings: '',
    ingredients: '',
    instructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Recipe summary is required';
    if (!formData.cookingTime.trim()) newErrors.cookingTime = 'Cooking time is required';
    if (!formData.servings.trim()) newErrors.servings = 'Servings is required';
    
    // Ingredients validation - at least 2 items
    const ingredientsArray = formData.ingredients.split('\n').filter(item => item.trim());
    if (ingredientsArray.length < 2) {
      newErrors.ingredients = 'Please provide at least 2 ingredients';
    }

    // Instructions validation - at least 2 steps
    const instructionsArray = formData.instructions.split('\n').filter(step => step.trim());
    if (instructionsArray.length < 2) {
      newErrors.instructions = 'Please provide at least 2 preparation steps';
    }

    // Image URL validation (optional but if provided, should be valid)
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message and redirect
      alert('Recipe added successfully!');
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🍳 Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your culinary masterpiece with the community
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Classic Spaghetti Carbonara"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Recipe Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                id="summary"
                name="summary"
                rows="2"
                value={formData.summary}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.summary ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of your recipe..."
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/recipe-image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Cooking Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cooking Time */}
              <div>
                <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Cooking Time *
                </label>
                <input
                  type="text"
                  id="cookingTime"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cookingTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 30 mins"
                />
                {errors.cookingTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.cookingTime}</p>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Servings */}
              <div>
                <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                  Servings *
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  min="1"
                  value={formData.servings}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.servings ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="4"
                />
                {errors.servings && (
                  <p className="mt-1 text-sm text-red-600">{errors.servings}</p>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients * (one per line)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                rows="6"
                value={formData.ingredients}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;..."
              />
              {errors.ingredients && (
                <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Enter each ingredient on a new line. At least 2 ingredients required.
              </p>
            </div>

            {/* Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Steps * (one per line)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows="8"
                value={formData.instructions}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.instructions ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Preheat oven to 350°F...&#10;Mix dry ingredients...&#10;Add wet ingredients...&#10;..."
              />
              {errors.instructions && (
                <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Enter each step on a new line. At least 2 steps required.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Recipe...
                  </span>
                ) : (
                  'Add Recipe'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;