import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PantryItem } from './models/pantry';

// Load environment variables
dotenv.config();

async function testPantryModel() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  console.log('Testing PantryItem model with MongoDB...');
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000
    });
    
    console.log('✅ Connected to MongoDB');

    // Create a test user ID (required for pantry items)
    const testUserId = new mongoose.Types.ObjectId();
    console.log('Created test user ID:', testUserId.toString());
    
    // Create a test pantry item
    const testItem = new PantryItem({
      userId: testUserId,
      name: 'Test Item',
      quantity: 1,
      unit: 'pcs',
      location: 'pantry',
      category: 'Other',
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });
    
    console.log('Created test pantry item:', testItem);
    
    // Save the test item
    const savedItem = await testItem.save();
    console.log('✅ Saved pantry item successfully:', savedItem._id.toString());
    
    // Try a pantry item with string quantity
    const weightItem = new PantryItem({
      userId: testUserId,
      name: 'Weight Test Item',
      quantity: 'by weight',
      unit: 'weight',
      location: 'pantry',
      category: 'Other',
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    
    const savedWeightItem = await weightItem.save();
    console.log('✅ Saved weight-based item successfully:', savedWeightItem._id.toString());
    
    // Try insertMany operation
    const itemsToInsert = [
      {
        userId: testUserId,
        name: 'Batch Item 1',
        quantity: 2,
        unit: 'pcs',
        location: 'pantry',
        category: 'Other',
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: testUserId,
        name: 'Batch Item 2',
        quantity: 'by weight',
        unit: 'weight',
        location: 'pantry',
        category: 'Other',
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      }
    ];
    
    console.log('Attempting insertMany operation...');
    const insertedItems = await PantryItem.insertMany(itemsToInsert);
    console.log('✅ insertMany operation successful, inserted', insertedItems.length, 'items');
    
    // Clean up - delete the test items
    await PantryItem.deleteMany({ userId: testUserId });
    console.log('✅ Deleted test items');
    
    // Close the connection
    await mongoose.disconnect();
    console.log('Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      console.log('\nValidation Error Details:');
      for (const field in error.errors) {
        console.log(`- ${field}: ${error.errors[field].message}`);
      }
    }
    
    // Close the connection
    try {
      await mongoose.disconnect();
      console.log('Connection closed');
    } catch (err) {
      console.error('Error closing connection:', err);
    }
  }
}

// Run the test
testPantryModel().catch(console.error); 