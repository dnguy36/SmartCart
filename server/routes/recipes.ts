import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import axios from 'axios';
import { PantryItem } from '../models/pantry.js';
import mongoose from 'mongoose';

// Define some type interfaces to fix linter errors
interface RecipeIngredient {
  id: number;
  name: string;
  amount?: number;
  unit?: string;
  original?: string;
}

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
  analyzedInstructions?: Array<{
    steps: Array<{
      step: string;
    }>;
  }>;
  diets?: string[];
  extendedIngredients?: RecipeIngredient[];
  summary?: string;
  nutrition?: {
    nutrients?: Array<{
      name: string;
      amount: number;
    }>;
  };
}

interface UsedMissedIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

interface RecipeWithIngredients {
  id: number;
  title: string;
  image: string;
  usedIngredients: UsedMissedIngredient[];
  missedIngredients: UsedMissedIngredient[];
}

const router = express.Router();
const SPOONACULAR_API_KEY = 'bc20414d5174426e97ac1586dde1f49d';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

// Cache to store API responses to reduce rate limit usage
const recipeCache = new Map();
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

// Get recipe suggestions based on pantry items
router.get('/suggestions', authenticateUser, async (req, res) => {
  try {
    // Get user id from authenticated request
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Get user's pantry items from database
    const pantryItems = await PantryItem.find({ userId: new mongoose.Types.ObjectId(userId.toString()) });
    
    if (!pantryItems || pantryItems.length === 0) {
      return res.status(200).json({ 
        message: 'No pantry items found. Add some items to get recipe suggestions.',
        recipes: []
      });
    }

    // Extract ingredient names from pantry items
    const ingredients = pantryItems.map(item => item.name.toLowerCase());
    
    // Create a cache key based on ingredients
    const cacheKey = `recipes:${ingredients.sort().join(',')}`;
    
    // Check if we have cached results
    if (recipeCache.has(cacheKey)) {
      const cachedData = recipeCache.get(cacheKey);
      // Check if cache is still valid
      if (cachedData.timestamp > Date.now() - CACHE_EXPIRY) {
        return res.status(200).json(cachedData.data);
      }
      // Cache expired, remove it
      recipeCache.delete(cacheKey);
    }

    // Make API request to Spoonacular
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/findByIngredients`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        ingredients: ingredients.join(','),
        number: 10, // Number of results to return
        ranking: 2, // Maximize used ingredients
        ignorePantry: false
      }
    });

    // If we got recipes, get more detailed information for each recipe
    const recipesWithDetails = [];
    if (response.data && response.data.length > 0) {
      // Get recipe IDs
      const recipeIds = response.data.map((recipe: RecipeWithIngredients) => recipe.id).join(',');
      
      // Get bulk information
      const detailsResponse = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/informationBulk`, {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          ids: recipeIds,
          includeNutrition: false
        }
      });

      // Format the response
      for (const recipe of response.data as RecipeWithIngredients[]) {
        const recipeDetails = detailsResponse.data.find((detail: SpoonacularRecipe) => detail.id === recipe.id);
        if (recipeDetails) {
          recipesWithDetails.push({
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            ingredients: recipe.usedIngredients.map((i: UsedMissedIngredient) => i.name),
            missingIngredients: recipe.missedIngredients.map((i: UsedMissedIngredient) => i.name),
            cookingTime: recipeDetails.readyInMinutes || 30,
            difficulty: determineDifficulty(recipeDetails.readyInMinutes, recipeDetails.extendedIngredients?.length || 0),
            calories: recipeDetails.nutrition?.nutrients?.find((n: { name: string, amount: number }) => n.name === 'Calories')?.amount || 0,
            instructions: recipeDetails.analyzedInstructions?.[0]?.steps?.map((step: { step: string }) => step.step) || [],
            servings: recipeDetails.servings || 4,
            sourceUrl: recipeDetails.sourceUrl || '',
            diets: recipeDetails.diets || [],
            summary: recipeDetails.summary || ''
          });
        }
      }
    }

    // Cache the results
    const resultData = {
      recipes: recipesWithDetails,
      pantryItems: ingredients
    };

    recipeCache.set(cacheKey, {
      data: resultData,
      timestamp: Date.now()
    });

    return res.status(200).json(resultData);
  } catch (error: unknown) {
    console.error('Error fetching recipe suggestions:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch recipe suggestions', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get detailed information for a specific recipe
router.get('/details/:id', authenticateUser, async (req, res) => {
  try {
    const recipeId = req.params.id;
    
    // Check if we have cached results
    const cacheKey = `recipe:${recipeId}`;
    if (recipeCache.has(cacheKey)) {
      const cachedData = recipeCache.get(cacheKey);
      // Check if cache is still valid
      if (cachedData.timestamp > Date.now() - CACHE_EXPIRY) {
        return res.status(200).json(cachedData.data);
      }
      // Cache expired, remove it
      recipeCache.delete(cacheKey);
    }

    // Make API request to Spoonacular
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/${recipeId}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        includeNutrition: true
      }
    });

    // Format the response
    const recipeDetails = {
      id: response.data.id,
      name: response.data.title,
      image: response.data.image,
      ingredients: response.data.extendedIngredients?.map((i: RecipeIngredient) => ({
        id: i.id,
        name: i.name,
        amount: i.amount,
        unit: i.unit,
        original: i.original
      })) || [],
      cookingTime: response.data.readyInMinutes || 30,
      difficulty: determineDifficulty(response.data.readyInMinutes, response.data.extendedIngredients?.length || 0),
      calories: response.data.nutrition?.nutrients?.find((n: { name: string, amount: number }) => n.name === 'Calories')?.amount || 0,
      instructions: response.data.analyzedInstructions?.[0]?.steps?.map((step: { step: string }) => step.step) || [],
      servings: response.data.servings || 4,
      sourceUrl: response.data.sourceUrl || '',
      diets: response.data.diets || [],
      summary: response.data.summary || ''
    };

    // Cache the results
    recipeCache.set(cacheKey, {
      data: recipeDetails,
      timestamp: Date.now()
    });

    return res.status(200).json(recipeDetails);
  } catch (error: unknown) {
    console.error('Error fetching recipe details:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch recipe details', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Helper function to determine recipe difficulty
function determineDifficulty(cookingTime?: number, ingredientCount?: number): string {
  if (!cookingTime || !ingredientCount) return 'Medium';
  
  if (cookingTime <= 15 && ingredientCount <= 5) {
    return 'Easy';
  } else if (cookingTime <= 30 && ingredientCount <= 10) {
    return 'Medium';
  } else {
    return 'Hard';
  }
}

export default router; 