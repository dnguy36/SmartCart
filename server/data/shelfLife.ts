/**
 * Database of typical shelf life for common grocery items
 * All durations are in days
 */

interface ShelfLifeInfo {
  refrigerator?: number;  // Days in refrigerator
  freezer?: number;       // Days in freezer
  pantry?: number;        // Days in pantry
  tips?: string;          // Storage tips
  category: string;       // Food category
}

// Map of food items to their shelf life information
const shelfLifeData: Record<string, ShelfLifeInfo> = {
  // Dairy products
  "MILK": { 
    refrigerator: 7, 
    freezer: 90, 
    category: "Dairy",
    tips: "Store in back of refrigerator, not in door"
  },
  "CHEESE": { 
    refrigerator: 14, 
    freezer: 180, 
    category: "Dairy",
    tips: "Hard cheeses last longer than soft cheeses"
  },
  "YOGURT": { 
    refrigerator: 14, 
    freezer: 60, 
    category: "Dairy" 
  },
  "BUTTER": { 
    refrigerator: 30, 
    freezer: 180, 
    category: "Dairy" 
  },
  "EGGS": { 
    refrigerator: 35, 
    freezer: 90, 
    category: "Dairy",
    tips: "Store in original carton, not in door"
  },

  // Meats
  "CHICKEN": { 
    refrigerator: 2, 
    freezer: 270, 
    category: "Meat",
    tips: "Store on bottom shelf of refrigerator"
  },
  "BEEF": { 
    refrigerator: 3, 
    freezer: 365, 
    category: "Meat" 
  },
  "GROUND BEEF": { 
    refrigerator: 2, 
    freezer: 120, 
    category: "Meat" 
  },
  "FISH": { 
    refrigerator: 2, 
    freezer: 180, 
    category: "Seafood",
    tips: "Use fresh fish quickly or freeze"
  },
  "BACON": { 
    refrigerator: 7, 
    freezer: 30, 
    category: "Meat" 
  },
  "PORK": { 
    refrigerator: 3, 
    freezer: 180, 
    category: "Meat" 
  },
  "SAUSAGE": { 
    refrigerator: 2, 
    freezer: 60, 
    category: "Meat" 
  },

  // Fruits
  "APPLE": { 
    refrigerator: 30, 
    pantry: 7, 
    category: "Produce" 
  },
  "BANANA": { 
    refrigerator: 7, 
    pantry: 5, 
    category: "Produce",
    tips: "Store at room temperature until ripe, then refrigerate"
  },
  "ORANGE": { 
    refrigerator: 21, 
    pantry: 7, 
    category: "Produce" 
  },
  "STRAWBERRY": { 
    refrigerator: 5, 
    freezer: 365, 
    category: "Produce",
    tips: "Don't wash until ready to eat"
  },
  "GRAPES": { 
    refrigerator: 7, 
    freezer: 365, 
    category: "Produce" 
  },
  "PEARS": { 
    refrigerator: 7, 
    pantry: 3, 
    category: "Produce" 
  },
  "AVOCADO": { 
    refrigerator: 7, 
    pantry: 3, 
    category: "Produce",
    tips: "Refrigerate only when ripe"
  },

  // Vegetables
  "LETTUCE": { 
    refrigerator: 7, 
    category: "Produce",
    tips: "Store in crisper drawer with paper towel"
  },
  "ONION": { 
    refrigerator: 30, 
    pantry: 30, 
    category: "Produce",
    tips: "Store in cool, dry place with good ventilation"
  },
  "POTATO": { 
    pantry: 90, 
    category: "Produce",
    tips: "Store in cool, dark place, not refrigerator"
  },
  "TOMATO": { 
    refrigerator: 7, 
    pantry: 5, 
    category: "Produce",
    tips: "Store at room temperature for best flavor"
  },
  "BELL PEPPER": { 
    refrigerator: 14, 
    freezer: 180, 
    category: "Produce" 
  },
  "BROCCOLI": { 
    refrigerator: 7, 
    freezer: 365, 
    category: "Produce" 
  },
  "CARROTS": { 
    refrigerator: 30, 
    freezer: 365, 
    category: "Produce",
    tips: "Remove greens before storing"
  },
  "CELERY": { 
    refrigerator: 14, 
    freezer: 180, 
    category: "Produce" 
  },
  "CUCUMBER": { 
    refrigerator: 7, 
    category: "Produce" 
  },
  "SPINACH": { 
    refrigerator: 5, 
    freezer: 365, 
    category: "Produce" 
  },
  "CHARD": { 
    refrigerator: 5, 
    freezer: 365, 
    category: "Produce" 
  },
  "CILANTRO": { 
    refrigerator: 7, 
    freezer: 180, 
    category: "Produce",
    tips: "Store with stems in water, like flowers"
  },

  // Bread and Bakery
  "BREAD": { 
    pantry: 7, 
    refrigerator: 14, 
    freezer: 90, 
    category: "Bakery",
    tips: "Freezes well, refrigeration can dry bread out"
  },
  "BAGEL": { 
    pantry: 5, 
    refrigerator: 7, 
    freezer: 90, 
    category: "Bakery" 
  },
  "CAKE": { 
    refrigerator: 7, 
    freezer: 180, 
    category: "Bakery" 
  },

  // Pantry items
  "RICE": { 
    pantry: 730, 
    category: "Grains",
    tips: "Store in airtight container"
  },
  "PASTA": { 
    pantry: 730, 
    category: "Pasta",
    tips: "Store in airtight container"
  },
  "CEREAL": { 
    pantry: 180, 
    category: "Breakfast",
    tips: "Keep box tightly closed or transfer to airtight container"
  },
  "FLOUR": { 
    pantry: 180, 
    freezer: 365, 
    category: "Baking",
    tips: "Store in airtight container"
  },
  "SUGAR": { 
    pantry: 730, 
    category: "Baking",
    tips: "Store in airtight container"
  },
  "NUTS": { 
    pantry: 90, 
    refrigerator: 180, 
    freezer: 365, 
    category: "Snacks",
    tips: "Refrigerate or freeze to prevent rancidity"
  },

  // Canned/Packaged goods
  "CANNED BEANS": { 
    pantry: 1095, 
    category: "Canned",
    tips: "Once opened, refrigerate and use within 3-4 days"
  },
  "CANNED SOUP": { 
    pantry: 1095, 
    category: "Canned",
    tips: "Once opened, refrigerate and use within 3-4 days"
  },
  "CANNED TUNA": { 
    pantry: 1095, 
    category: "Canned",
    tips: "Once opened, refrigerate and use within 3 days"
  },

  // Condiments
  "KETCHUP": { 
    pantry: 30, 
    refrigerator: 180, 
    category: "Condiments",
    tips: "Refrigerate after opening"
  },
  "MUSTARD": { 
    refrigerator: 365, 
    category: "Condiments",
    tips: "Refrigerate after opening"
  },
  "MAYONNAISE": { 
    refrigerator: 60, 
    category: "Condiments",
    tips: "Always refrigerate, even before opening"
  },
  "SOY SAUCE": { 
    pantry: 30, 
    refrigerator: 365, 
    category: "Condiments",
    tips: "Refrigerate after opening"
  },
  "OLIVE OIL": { 
    pantry: 540, 
    category: "Condiments",
    tips: "Store in cool, dark place"
  },
};

/**
 * Get shelf life information for a food item
 * @param itemName The name of the food item
 * @param defaultDays Default shelf life in days if item not found
 * @returns ShelfLifeInfo object or null if not found
 */
export function getShelfLife(itemName: string, defaultDays: number = 7): ShelfLifeInfo | null {
  if (!itemName) return null;
  
  // Normalize item name for lookup (all caps, remove spaces)
  const normalizedName = itemName.toUpperCase();
  
  // Direct lookup
  if (shelfLifeData[normalizedName]) {
    return shelfLifeData[normalizedName];
  }
  
  // Try finding a partial match
  for (const [key, value] of Object.entries(shelfLifeData)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }
  
  // No match found
  return null;
}

/**
 * Get recommended expiry date based on item and storage location
 * @param itemName The name of the food item
 * @param location Storage location (refrigerator, freezer, or pantry)
 * @param defaultDays Default shelf life in days if item not found
 * @returns Recommended expiry date
 */
export function getRecommendedExpiryDate(
  itemName: string, 
  location: 'refrigerator' | 'freezer' | 'pantry' = 'refrigerator',
  defaultDays: number = 7
): Date {
  const today = new Date();
  const shelfLife = getShelfLife(itemName, defaultDays);
  
  let daysToAdd = defaultDays;
  
  if (shelfLife) {
    // Use the specified location's shelf life if available
    if (shelfLife[location]) {
      daysToAdd = shelfLife[location] as number;
    } 
    // Otherwise use the first available shelf life
    else if (shelfLife.refrigerator) {
      daysToAdd = shelfLife.refrigerator;
    } else if (shelfLife.freezer) {
      daysToAdd = shelfLife.freezer;
    } else if (shelfLife.pantry) {
      daysToAdd = shelfLife.pantry;
    }
  }
  
  // Calculate expiry date
  const expiryDate = new Date(today);
  expiryDate.setDate(today.getDate() + daysToAdd);
  
  return expiryDate;
}

export default shelfLifeData; 