import { useState, useEffect } from "react";
import { Search, Filter, ChefHat, Clock, Bookmark, Share2, ShoppingCart, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define types for recipe data
interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  missingIngredients: string[];
  cookingTime: number;
  difficulty: string;
  calories: number;
  instructions?: string[];
  servings?: number;
  sourceUrl?: string;
  diets?: string[];
  summary?: string;
}

const DIETARY_RESTRICTIONS = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "low-carb", label: "Low Carb" },
];

export default function Recipes() {
  const [activeTab, setActiveTab] = useState("suggested");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const { toast } = useToast();

  // Fetch recipes based on pantry items
  useEffect(() => {
    console.log('Initial fetch of recipes');
    fetchRecipes();
  }, []);

  // Refresh recipes when dietary restrictions change
  useEffect(() => {
    console.log('Dietary restrictions changed, fetching new recipes:', dietaryRestrictions);
    fetchRecipes();
  }, [dietaryRestrictions]);

  // Fetch recipe details when a recipe is selected
  useEffect(() => {
    if (selectedRecipe !== null) {
      fetchRecipeDetails(selectedRecipe);
    } else {
      setRecipeDetails(null);
    }
  }, [selectedRecipe]);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      const url = `/api/recipes/suggestions${dietaryRestrictions.length > 0 ? `?dietaryRestrictions=${dietaryRestrictions.join(',')}` : ''}`;
      console.log('Making API request to:', url);
      console.log('Current dietary restrictions:', dietaryRestrictions);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('API request failed:', data);
        throw new Error(data.message || 'Failed to fetch recipes');
      }

      const data = await response.json();
      console.log('API response received:', data);
      setRecipes(data.recipes);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch recipes",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecipeDetails = async (recipeId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      const response = await fetch(`/api/recipes/details/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch recipe details');
      }

      const data = await response.json();
      setRecipeDetails(data);
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch recipe details",
        variant: "destructive"
      });
    }
  };

  // Add effect to log when dietary restrictions change
  useEffect(() => {
    console.log('Dietary restrictions state changed:', dietaryRestrictions);
  }, [dietaryRestrictions]);

  // Add effect to log when recipes change
  useEffect(() => {
    console.log('Recipes state changed:', recipes);
  }, [recipes]);

  // Filter recipes based on search query and filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || recipe.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesTime = timeFilter === "all" || 
      (timeFilter === "quick" && recipe.cookingTime <= 15) ||
      (timeFilter === "medium" && recipe.cookingTime > 15 && recipe.cookingTime <= 30) ||
      (timeFilter === "long" && recipe.cookingTime > 30);
    
    console.log('Filtering recipe:', recipe.name, {
      matchesSearch,
      matchesDifficulty,
      matchesTime,
      searchQuery,
      difficultyFilter,
      timeFilter,
      dietaryRestrictions: recipe.diets
    });
    
    return matchesSearch && matchesDifficulty && matchesTime;
  });

  const toggleDietaryRestriction = (id: string) => {
    console.log('Toggling dietary restriction:', id);
    const newRestrictions = dietaryRestrictions.includes(id)
      ? dietaryRestrictions.filter(item => item !== id)
      : [...dietaryRestrictions, id];
    console.log('Setting new dietary restrictions:', newRestrictions);
    setDietaryRestrictions(newRestrictions);
  };

  const saveRecipe = (id: number) => {
    toast({
      title: "Recipe Saved",
      description: "This recipe has been added to your favorites.",
    });
  };

  const addMissingToShoppingList = (missingIngredients: string[]) => {
    toast({
      title: "Added to Shopping List",
      description: `${missingIngredients.length} items added to your shopping list.`,
    });
  };

  const shareRecipe = (id: number) => {
    toast({
      title: "Share Recipe",
      description: "Sharing functionality would be implemented in a real app.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Suggestions</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover recipes based on ingredients in your pantry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Recipe Filters</CardTitle>
                <CardDescription>
                  Customize your recipe recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Cooking Time</h3>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any time</SelectItem>
                      <SelectItem value="quick">Quick (≤ 15 mins)</SelectItem>
                      <SelectItem value="medium">Medium (15-30 mins)</SelectItem>
                      <SelectItem value="long">Long (&gt; 30 mins)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any difficulty</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Dietary Restrictions</h3>
                  <div className="space-y-3">
                    {DIETARY_RESTRICTIONS.map(restriction => {
                      const isChecked = dietaryRestrictions.includes(restriction.id);
                      console.log(`Rendering switch for ${restriction.id}, checked:`, isChecked);
                      return (
                        <div key={restriction.id} className="flex items-center space-x-3">
                          <Switch 
                            id={restriction.id}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              console.log(`Switch ${restriction.id} changed to:`, checked);
                              if (checked) {
                                setDietaryRestrictions(prev => [...prev, restriction.id]);
                              } else {
                                setDietaryRestrictions(prev => prev.filter(id => id !== restriction.id));
                              }
                            }}
                          />
                          <label
                            htmlFor={restriction.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {restriction.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Maximize Pantry Usage</h3>
                  <div className="flex items-center space-x-3">
                    <Switch id="use-pantry" defaultChecked />
                    <label
                      htmlFor="use-pantry"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Suggest recipes based on what I have
                    </label>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={fetchRecipes}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Refresh Recipes'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recipe Suggestions</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search recipes..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>
                  Smart recipe suggestions based on your pantry items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="suggested">Suggested</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTab} className="pt-6">
                    {isLoading ? (
                      <div className="text-center py-10 px-4">
                        <RefreshCw className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Loading recipes...</h3>
                      </div>
                    ) : error ? (
                      <div className="text-center py-10 px-4">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading recipes</h3>
                        <p className="mt-1 text-sm text-gray-500">{error}</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={fetchRecipes}
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : filteredRecipes.length === 0 ? (
                      <div className="col-span-full text-center py-10 px-4">
                        <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Try adjusting your filters or adding more items to your pantry
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredRecipes.map(recipe => (
                          <Card key={recipe.id} className={`overflow-hidden border ${selectedRecipe === recipe.id ? 'ring-2 ring-primary' : ''}`}>
                            <div className="aspect-video w-full relative">
                              <img 
                                src={recipe.image} 
                                alt={recipe.name} 
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://spoonacular.com/recipeImages/default-food.jpg'; 
                                }}
                              />
                              <div className="absolute top-2 right-2 flex space-x-1">
                                <Badge className="bg-white text-gray-700 hover:bg-gray-100">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {recipe.cookingTime} min
                                </Badge>
                                <Badge className="bg-white text-gray-700 hover:bg-gray-100">
                                  {recipe.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="pt-4">
                              <h3 className="text-lg font-semibold hover:text-primary cursor-pointer" onClick={() => setSelectedRecipe(recipe.id)}>
                                {recipe.name}
                              </h3>
                              {recipe.calories > 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                  {recipe.calories} calories per serving
                                </p>
                              )}
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">In Your Pantry:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {recipe.ingredients.map((ingredient, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-gray-50">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {recipe.missingIngredients.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-medium mb-2 flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
                                    Missing Ingredients:
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {recipe.missingIngredients.map((ingredient, idx) => (
                                      <Badge key={idx} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        {ingredient}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-between mt-6">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-gray-500 hover:text-primary"
                                  onClick={() => saveRecipe(recipe.id)}
                                >
                                  <Bookmark className="h-4 w-4 mr-1" />
                                  Save
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-gray-500 hover:text-primary"
                                  onClick={() => shareRecipe(recipe.id)}
                                >
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                                {recipe.missingIngredients.length > 0 && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-primary border-primary hover:bg-primary/10"
                                    onClick={() => addMissingToShoppingList(recipe.missingIngredients)}
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Add Missing
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {selectedRecipe !== null && recipeDetails && (
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/5">
                        <img 
                          src={recipeDetails.image} 
                          alt={recipeDetails.name} 
                          className="w-full rounded-lg object-cover aspect-square"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://spoonacular.com/recipeImages/default-food.jpg'; 
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold">{recipeDetails.name}</h2>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">{recipeDetails.cookingTime} min</span>
                          </div>
                          <div className="flex items-center">
                            <ChefHat className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">{recipeDetails.difficulty}</span>
                          </div>
                          {recipeDetails.calories > 0 && (
                            <div className="text-sm text-gray-500">{recipeDetails.calories} calories</div>
                          )}
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium">Description</h3>
                          {recipeDetails.summary ? (
                            <div
                              className="mt-2 text-gray-600"
                              dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
                            />
                          ) : (
                            <p className="mt-2 text-gray-600">
                              This delicious {recipeDetails.name.toLowerCase()} is perfect for a quick meal using ingredients you already have in your pantry.
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium">Ingredients</h3>
                          <ul className="mt-2 space-y-1">
                            {recipeDetails.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="flex items-center text-gray-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {recipeDetails.missingIngredients.length > 0 && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <div className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium text-yellow-800">Missing Ingredients</h4>
                                <p className="text-sm text-yellow-700 mt-1">
                                  You're missing {recipeDetails.missingIngredients.join(", ")}
                                </p>
                                <Button 
                                  size="sm" 
                                  className="mt-2 h-8 bg-yellow-500 hover:bg-yellow-600 text-white"
                                  onClick={() => addMissingToShoppingList(recipeDetails.missingIngredients)}
                                >
                                  <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                                  Add to Shopping List
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator className="my-8" />
                    
                    <div>
                      <h3 className="font-medium mb-4">Cooking Instructions</h3>
                      {recipeDetails.instructions && recipeDetails.instructions.length > 0 ? (
                        <ol className="space-y-4">
                          {recipeDetails.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-medium mr-3">{idx + 1}</span>
                              <p className="text-gray-600">{instruction}</p>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <ol className="space-y-4">
                          <li className="flex">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-medium mr-3">1</span>
                            <p className="text-gray-600">Prepare all the ingredients. Wash and chop the vegetables as needed.</p>
                          </li>
                          <li className="flex">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-medium mr-3">2</span>
                            <p className="text-gray-600">Heat olive oil in a pan over medium heat.</p>
                          </li>
                          <li className="flex">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-medium mr-3">3</span>
                            <p className="text-gray-600">Combine the ingredients according to the recipe and cook until ready.</p>
                          </li>
                          <li className="flex">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-medium mr-3">4</span>
                            <p className="text-gray-600">Season with salt and pepper to taste, and serve hot.</p>
                          </li>
                        </ol>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={() => saveRecipe(recipeDetails.id)}
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save Recipe
                      </Button>
                      {recipeDetails.sourceUrl && (
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => {
                            window.open(recipeDetails.sourceUrl, '_blank');
                          }}
                        >
                          <ChefHat className="h-4 w-4 mr-2" />
                          View Original Recipe
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}