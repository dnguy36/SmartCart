import express from 'express';
import { authenticateUser } from '../middleware/auth';
import { PantryItem } from '../models/pantry';
import mongoose from 'mongoose';

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
      return {
        userId: new mongoose.Types.ObjectId(userId),
        name: item.name,
        quantity: item.quantity,
        unit: item.unit || 'pcs',
        location: item.location || 'pantry',
        category: item.category || 'Other',
        expiry: item.expiry || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
        addedAt: new Date()
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

export default router; 