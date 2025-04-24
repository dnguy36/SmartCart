// Define core types for the application

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  unit?: string;
  purchaseDate: string;
  expiryDate?: string;
  location?: 'pantry' | 'refrigerator' | 'freezer' | 'other';
  consumed: boolean;
}

export interface Receipt {
  id: string;
  store: string;
  date: string;
  total: number;
  items: GroceryItem[];
  imageUrl?: string;
}

export interface Budget {
  id: string;
  amount: number;
  period: 'weekly' | 'monthly';
  startDate: string;
  categories: {
    [key: string]: number;
  };
}

export interface PantryItem extends GroceryItem {
  expiryDate: string;
  location: 'pantry' | 'refrigerator' | 'freezer' | 'other';
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    budgetAlerts: boolean;
    expiryAlerts: boolean;
    suggestionsEnabled: boolean;
  };
}

// Dummy data for development
export const mockGroceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Milk',
    price: 3.99,
    category: 'Dairy',
    quantity: 1,
    unit: 'gallon',
    purchaseDate: '2025-03-15',
    expiryDate: '2025-03-25',
    location: 'refrigerator',
    consumed: false
  },
  {
    id: '2',
    name: 'Bread',
    price: 2.49,
    category: 'Bakery',
    quantity: 1,
    unit: 'loaf',
    purchaseDate: '2025-03-15',
    expiryDate: '2025-03-22',
    location: 'pantry',
    consumed: false
  },
  {
    id: '3',
    name: 'Eggs',
    price: 4.99,
    category: 'Dairy',
    quantity: 12,
    unit: 'count',
    purchaseDate: '2025-03-15',
    expiryDate: '2025-04-10',
    location: 'refrigerator',
    consumed: false
  },
  {
    id: '4',
    name: 'Bananas',
    price: 1.29,
    category: 'Produce',
    quantity: 5,
    unit: 'count',
    purchaseDate: '2025-03-15',
    expiryDate: '2025-03-22',
    location: 'pantry',
    consumed: false
  },
  {
    id: '5',
    name: 'Chicken Breast',
    price: 8.99,
    category: 'Meat',
    quantity: 2,
    unit: 'lb',
    purchaseDate: '2025-03-15',
    expiryDate: '2025-03-20',
    location: 'freezer',
    consumed: false
  }
];

export const mockReceipts: Receipt[] = [
  {
    id: '1',
    store: 'Whole Foods',
    date: '2025-03-15',
    total: 42.86,
    items: mockGroceryItems.slice(0, 3),
    imageUrl: 'https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    store: 'Trader Joe\'s',
    date: '2025-03-10',
    total: 31.58,
    items: mockGroceryItems.slice(3),
    imageUrl: 'https://images.pexels.com/photos/4132336/pexels-photo-4132336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockBudget: Budget = {
  id: '1',
  amount: 400,
  period: 'monthly',
  startDate: '2025-03-01',
  categories: {
    'Produce': 100,
    'Meat': 100,
    'Dairy': 50,
    'Bakery': 50,
    'Other': 100
  }
};