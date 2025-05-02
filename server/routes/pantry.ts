import express from 'express';
import { authenticateUser } from '../middleware/auth';
import { PantryItem } from '../models/pantry';
import mongoose from 'mongoose';
import { getRecommendedExpiryDate, getShelfLife } from '../data/shelfLife';
import { Request, Response } from 'express';

const router = express.Router();

// Add items to pantry
router.post('/items', authenticateUser, async (req, res) => {
  try {
    console.log('Received request to add items to pantry');
    const { items } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(items)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request format. Expected an array of items.' 
      });
    }

    console.log(`Processing ${items.length} items for user ${userId}`);
    
    // Validate each item before saving
    const validatedItems = items.map(item => {
      console.log(`Processing item: ${item.name}, quantity: ${item.quantity}, unit: ${item.unit}`);

      // Get a recommended expiry date if one wasn't provided
      let expiry = item.expiry;
      if (!expiry) {
        // Default location to use for shelf life calculation
        const location = item.location || 'refrigerator';
        expiry = getRecommendedExpiryDate(
          item.name, 
          location as 'refrigerator' | 'freezer' | 'pantry'
        );
      }

      // Get recommended category if one wasn't provided
      let category = item.category;
      if (!category || category === 'Other') {
        const shelfLife = getShelfLife(item.name);
        if (shelfLife && shelfLife.category) {
          category = shelfLife.category;
        } else {
          category = 'Other';
        }
      }

      return {
        userId: new mongoose.Types.ObjectId(userId),
        name: item.name,
        quantity: item.quantity,
        unit: item.unit || 'pcs',
        location: item.location || 'pantry',
        category: category,
        expiry: expiry,
        addedAt: new Date(),
        // Include storage tips if available
        tips: getShelfLife(item.name)?.tips
      };
    });

    // Save items one by one instead of bulk insert
    console.log('Saving items individually for better error handling');
    const savedItems = [];
    
    for (const item of validatedItems) {
      try {
        const newItem = new PantryItem(item);
        const savedItem = await newItem.save();
        savedItems.push(savedItem);
        console.log(`Saved item: ${item.name}`);
      } catch (itemError) {
        console.error(`Error saving item ${item.name}:`, itemError);
        // Continue with other items even if one fails
      }
    }

    console.log(`Successfully saved ${savedItems.length} of ${validatedItems.length} items`);
    
    if (savedItems.length === 0 && validatedItems.length > 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to add any items to pantry',
        error: 'No items could be saved'
      });
    }

    res.json({
      success: true,
      message: `Added ${savedItems.length} items to pantry successfully`,
      items: savedItems,
      partialSuccess: savedItems.length < validatedItems.length
    });
  } catch (error) {
    console.error('Error adding items to pantry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add items to pantry',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all pantry items for a user
router.get('/items', authenticateUser, async (req, res) => {
  try {
    const items = await PantryItem.find({ userId: req.user.id });
    res.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching pantry items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pantry items',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get shelf life information for an item
router.get('/shelf-life/:itemName', authenticateUser, async (req, res) => {
  try {
    const { itemName } = req.params;
    if (!itemName) {
      return res.status(400).json({
        success: false,
        message: 'Item name is required'
      });
    }
    
    const shelfLife = getShelfLife(itemName);
    
    if (!shelfLife) {
      return res.status(404).json({
        success: false,
        message: 'Shelf life information not found for this item'
      });
    }
    
    res.json({
      success: true,
      itemName,
      shelfLife
    });
  } catch (error) {
    console.error('Error getting shelf life information:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get shelf life information',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update a pantry item
router.put('/items/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, quantity, unit, location, category, expiry } = req.body;

    // Validate required fields
    if (!name || !quantity || !unit || !location || !category || !expiry) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate expiry date
    const expiryDate = new Date(expiry);
    if (isNaN(expiryDate.getTime())) {
      return res.status(400).json({ message: 'Invalid expiry date' });
    }

    // Update the item
    const updatedItem = await PantryItem.findByIdAndUpdate(
      id,
      {
        name,
        quantity,
        unit,
        location,
        category,
        expiry: expiryDate,
        userId: req.user._id
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating pantry item:', error);
    res.status(500).json({ message: 'Error updating pantry item' });
  }
});

// Delete a pantry item
router.delete('/items/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find and delete the item
    const deletedItem = await PantryItem.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting pantry item:', error);
    res.status(500).json({ message: 'Error deleting pantry item' });
  }
});

export default router; 