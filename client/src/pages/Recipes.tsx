import { useState } from "react";
import { Search, Filter, ChefHat, Clock, Bookmark, Share2, ShoppingCart, AlertCircle } from "lucide-react";
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

// Mock data for demonstration
const RECIPE_SUGGESTIONS = [
  { 
    id: 1, 
    name: "Spinach and Apple Salad", 
    ingredients: ["Spinach", "Apples", "Walnuts", "Olive Oil", "Balsamic Vinegar"], 
    missingIngredients: ["Walnuts"],
    cookingTime: 10,
    difficulty: "Easy",
    calories: 320,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  { 
    id: 2, 
    name: "Chicken and Rice Bowl", 
    ingredients: ["Chicken Breast", "Rice", "Spinach", "Olive Oil", "Garlic", "Salt", "Pepper"], 
    missingIngredients: [],
    cookingTime: 25,
    difficulty: "Medium",
    calories: 450,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  { 
    id: 3, 
    name: "Apple Cinnamon Oatmeal", 
    ingredients: ["Apples", "Oats", "Milk", "Cinnamon", "Honey"], 
    missingIngredients: ["Honey"],
    cookingTime: 15,
    difficulty: "Easy",
    calories: 280,
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  { 
    id: 4, 
    name: "Pasta with Spinach and Chicken", 
    ingredients: ["Pasta", "Chicken Breast", "Spinach", "Garlic", "Olive Oil", "Parmesan Cheese"], 
    missingIngredients: ["Parmesan Cheese", "Pasta"],
    cookingTime: 30,
    difficulty: "Medium",
    calories: 520,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
];

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
  const { toast } = useToast();

  // Filter recipes based on search query and filters
  const filteredRecipes = RECIPE_SUGGESTIONS.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (difficultyFilter === "all" || recipe.difficulty.toLowerCase() === difficultyFilter.toLowerCase()) &&
    (timeFilter === "all" || 
      (timeFilter === "quick" && recipe.cookingTime <= 15) ||
      (timeFilter === "medium" && recipe.cookingTime > 15 && recipe.cookingTime <= 30) ||
      (timeFilter === "long" && recipe.cookingTime > 30)
    )
  );

  const toggleDietaryRestriction = (id: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
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
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Recipe Suggestions</h1>
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
                    {DIETARY_RESTRICTIONS.map(restriction => (
                      <div key={restriction.id} className="flex items-center space-x-3">
                        <Switch 
                          id={restriction.id}
                          checked={dietaryRestrictions.includes(restriction.id)}
                          onCheckedChange={() => toggleDietaryRestriction(restriction.id)}
                        />
                        <label
                          htmlFor={restriction.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {restriction.label}
                        </label>
                      </div>
                    ))}
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

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Apply Filters
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredRecipes.length === 0 ? (
                        <div className="col-span-full text-center py-10 px-4">
                          <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters or adding more items to your pantry
                          </p>
                        </div>
                      ) : (
                        filteredRecipes.map(recipe => (
                          <Card key={recipe.id} className={`overflow-hidden border ${selectedRecipe === recipe.id ? 'ring-2 ring-primary' : ''}`}>
                            <div className="aspect-video w-full relative">
                              <img 
                                src={recipe.image} 
                                alt={recipe.name} 
                                className="object-cover w-full h-full"
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
                              <p className="text-sm text-gray-500 mt-2">
                                {recipe.calories} calories per serving
                              </p>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Main Ingredients:</h4>
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
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {selectedRecipe !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const recipe = RECIPE_SUGGESTIONS.find(r => r.id === selectedRecipe);
                    if (!recipe) return null;
                    
                    return (
                      <div>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-2/5">
                            <img 
                              src={recipe.image} 
                              alt={recipe.name} 
                              className="w-full rounded-lg object-cover aspect-square"
                            />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold">{recipe.name}</h2>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-sm text-gray-500">{recipe.cookingTime} min</span>
                              </div>
                              <div className="flex items-center">
                                <ChefHat className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-sm text-gray-500">{recipe.difficulty}</span>
                              </div>
                              <div className="text-sm text-gray-500">{recipe.calories} calories</div>
                            </div>
                            
                            <div className="mt-6">
                              <h3 className="font-medium">Description</h3>
                              <p className="mt-2 text-gray-600">
                                This delicious {recipe.name.toLowerCase()} is perfect for a quick meal using ingredients you already have in your pantry. It's nutritious, flavorful, and easy to prepare!
                              </p>
                            </div>
                            
                            <div className="mt-6">
                              <h3 className="font-medium">Ingredients</h3>
                              <ul className="mt-2 space-y-1">
                                {recipe.ingredients.map((ingredient, idx) => (
                                  <li key={idx} className="flex items-center text-gray-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                                    {ingredient}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {recipe.missingIngredients.length > 0 && (
                              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-start">
                                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                                  <div>
                                    <h4 className="text-sm font-medium text-yellow-800">Missing Ingredients</h4>
                                    <p className="text-sm text-yellow-700 mt-1">
                                      You're missing {recipe.missingIngredients.join(", ")}
                                    </p>
                                    <Button 
                                      size="sm" 
                                      className="mt-2 h-8 bg-yellow-500 hover:bg-yellow-600 text-white"
                                      onClick={() => addMissingToShoppingList(recipe.missingIngredients)}
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
                        </div>
                        
                        <div className="flex justify-between mt-8">
                          <Button 
                            variant="outline" 
                            className="border-primary text-primary hover:bg-primary/10"
                            onClick={() => saveRecipe(recipe.id)}
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save Recipe
                          </Button>
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => {
                              toast({
                                title: "Recipe Started",
                                description: "Good luck with your cooking!",
                              });
                            }}
                          >
                            <ChefHat className="h-4 w-4 mr-2" />
                            Start Cooking
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
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