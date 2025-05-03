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

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

// Add check for API key
if (!SPOONACULAR_API_KEY) {
  console.warn('⚠️ SPOONACULAR_API_KEY not found in environment variables. Recipe API will not work correctly.');
}

// Rate limiting implementation for free plan (1 request per second)
const requestTimestamps: number[] = [];
const MIN_REQUEST_INTERVAL = 1000; // 1 second in milliseconds

// Helper function to manage rate limiting
const waitForRateLimit = async () => {
  const now = Date.now();
  
  // Remove timestamps older than 1 minute
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - 60000) {
    requestTimestamps.shift();
  }
  
  // If we have any recent requests, wait until we can make another
  if (requestTimestamps.length > 0) {
    const lastRequest = requestTimestamps[requestTimestamps.length - 1];
    const timeSinceLastRequest = now - lastRequest;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      console.log(`Rate limiting: Waiting ${waitTime}ms before next request`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  // Add current timestamp
  requestTimestamps.push(Date.now());
};

// Cache to store API responses to reduce rate limit usage
const recipeCache = new Map();
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

// Get recipe suggestions based on pantry items
router.get('/suggestions', authenticateUser, async (req, res) => {
  try {
    // Check for API key
    if (!SPOONACULAR_API_KEY) {
      return res.status(500).json({ 
        message: 'Recipe API not configured. Contact administrator.',
        recipes: []
      });
    }

    // Get user id from authenticated request
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Get dietary restrictions from query parameters
    const dietaryRestrictions = req.query.dietaryRestrictions 
      ? (req.query.dietaryRestrictions as string).split(',').map(r => r.trim())
      : [];
    
    console.log('Received dietary restrictions:', dietaryRestrictions);
    console.log('Raw query parameters:', req.query);

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
    
    // Create a cache key based on ingredients and dietary restrictions
    const cacheKey = `recipes:${ingredients.sort().join(',')}:${dietaryRestrictions.sort().join(',')}`;
    console.log('Cache key:', cacheKey);
    
    // Check if we have cached results
    if (recipeCache.has(cacheKey)) {
      const cachedData = recipeCache.get(cacheKey);
      // Check if cache is still valid
      if (cachedData.timestamp > Date.now() - CACHE_EXPIRY) {
        console.log('Returning cached results for key:', cacheKey);
        return res.status(200).json(cachedData.data);
      }
      // Cache expired, remove it
      recipeCache.delete(cacheKey);
    }

    // Clear any existing cache entries for these ingredients when dietary restrictions change
    if (dietaryRestrictions.length > 0) {
      const baseCacheKey = `recipes:${ingredients.sort().join(',')}`;
      Array.from(recipeCache.keys()).forEach(key => {
        if (key.startsWith(baseCacheKey)) {
          console.log('Clearing cache for key:', key);
          recipeCache.delete(key);
        }
      });
    }

    // Make API request to Spoonacular
    await waitForRateLimit();
    try {
      console.log('Making Spoonacular API request with params:', {
        ingredients: ingredients.join(','),
        dietaryRestrictions
      });

      const response = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/findByIngredients`, {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          ingredients: ingredients.join(','),
          number: 10, // Number of results to return
          ranking: 2, // Maximize used ingredients
          ignorePantry: false,
          addRecipeInformation: true, // Add recipe information to get dietary info
          fillIngredients: true,
          diet: dietaryRestrictions.join(',') // Add dietary restrictions to the API call
        }
      });

      // If we got recipes, get more detailed information for each recipe
      const recipesWithDetails = [];
      if (response.data && response.data.length > 0) {
        // Get recipe IDs
        const recipeIds = response.data.map((recipe: RecipeWithIngredients) => recipe.id).join(',');
        
        // Get bulk information
        await waitForRateLimit();
        try {
          const detailsResponse = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/informationBulk`, {
            params: {
              apiKey: SPOONACULAR_API_KEY,
              ids: recipeIds,
              includeNutrition: false,
              addRecipeInformation: true
            }
          });

          // Format the response
          for (const recipe of response.data as RecipeWithIngredients[]) {
            const recipeDetails = detailsResponse.data.find((detail: SpoonacularRecipe) => detail.id === recipe.id);
            if (recipeDetails) {
              // Only include recipes that match all selected dietary restrictions
              const matchesAllRestrictions = dietaryRestrictions.length === 0 || 
                dietaryRestrictions.every(restriction => {
                  // Convert restriction to lowercase for case-insensitive comparison
                  const lowerRestriction = restriction.toLowerCase();
                  
                  // Map our restriction IDs to Spoonacular's boolean flags
                  const restrictionMap: { [key: string]: string } = {
                    'vegetarian': 'vegetarian',
                    'vegan': 'vegan',
                    'gluten-free': 'glutenFree',
                    'dairy-free': 'dairyFree',
                    'low-carb': 'ketogenic' // Using ketogenic as a proxy for low-carb
                  };

                  const spoonacularFlag = restrictionMap[lowerRestriction];
                  if (!spoonacularFlag) {
                    console.log(`Unknown dietary restriction: ${lowerRestriction}`);
                    return false;
                  }

                  // Explicitly check for true value
                  const isMatch = recipeDetails[spoonacularFlag as keyof SpoonacularRecipe] === true;
                  console.log(`Checking restriction "${restriction}" against recipe "${recipeDetails.title}":`, {
                    spoonacularFlag,
                    isMatch,
                    recipeValue: recipeDetails[spoonacularFlag as keyof SpoonacularRecipe],
                    recipeTitle: recipeDetails.title
                  });

                  // For vegetarian/vegan, we need additional checks
                  if (restriction === 'vegetarian' || restriction === 'vegan') {
                    // Check if the recipe is explicitly marked as vegetarian/vegan
                    if (!isMatch) {
                      console.log(`Recipe "${recipeDetails.title}" is not ${restriction}`);
                      return false;
                    }

                    // Additional check for meat ingredients
                    const meatIngredients = [
                      'beef', 'pork', 'chicken', 'turkey', 'lamb', 'veal', 'meat',
                      'ox', 'tongue', 'liver', 'kidney', 'heart', 'sausage', 'bacon',
                      'ham', 'steak', 'ribs', 'ground beef', 'minced beef'
                    ];

                    const recipeIngredients = [
                      ...(recipe.usedIngredients || []),
                      ...(recipe.missedIngredients || [])
                    ].map(i => i.name.toLowerCase());

                    const hasMeat = recipeIngredients.some(ingredient => 
                      meatIngredients.some(meat => ingredient.includes(meat))
                    );

                    if (hasMeat) {
                      console.log(`Recipe "${recipeDetails.title}" contains meat ingredients:`, recipeIngredients);
                      return false;
                    }
                  }

                  return isMatch;
                });

              console.log('Recipe:', recipeDetails.title);
              console.log('Selected restrictions:', dietaryRestrictions);
              console.log('Matches restrictions:', matchesAllRestrictions);

              if (matchesAllRestrictions) {
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
        } catch (error: any) {
          if (error.response?.status === 402 || error.response?.data?.code === 1015) {
            return res.status(402).json({
              message: 'Daily API quota exceeded. Please try again tomorrow or upgrade your plan.',
              recipes: []
            });
          }
          throw error;
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

      console.log('Returning filtered recipes:', recipesWithDetails.length);
      return res.status(200).json(resultData);
    } catch (error: any) {
      if (error.response?.status === 402 || error.response?.data?.code === 1015) {
        return res.status(402).json({
          message: 'Daily API quota exceeded. Please try again tomorrow or upgrade your plan.',
          recipes: []
        });
      }
      throw error;
    }
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
    // Check for API key
    if (!SPOONACULAR_API_KEY) {
      return res.status(500).json({ 
        message: 'Recipe API not configured. Contact administrator.'
      });
    }
    
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
    await waitForRateLimit();
    try {
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
    } catch (error: any) {
      if (error.response?.status === 402 || error.response?.data?.code === 1015) {
        return res.status(402).json({
          message: 'Daily API quota exceeded. Please try again tomorrow or upgrade your plan.'
        });
      }
      throw error;
    }
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