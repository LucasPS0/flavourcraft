// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const generateRecipe = async (ingredients, dietaryPreferences) => {
  const response = await axios.post(`${API_URL}/recipes/create`, {
    ingredients,
    dietaryPreferences,
  });
  return response.data;
};

export const getRecipeSuggestions = async (ingredients, dietaryPreferences) => {
  const response = await axios.post(`${API_URL}/recipes/recommendations`, {
    ingredients,
    dietaryPreferences,
  });
  return response.data;
};
