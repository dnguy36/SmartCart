import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function checkCollections() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  console.log('Connecting to MongoDB to check collections...');
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Get database
    const db = mongoose.connection.db;
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('Collections in database:');
    for (const collection of collections) {
      console.log(`- ${collection.name}`);
    }
    
    // Check for pantry items
    if (collections.some(c => c.name === 'pantryitems')) {
      console.log('\nChecking pantry items:');
      const pantryItems = await db.collection('pantryitems').find({}).toArray();
      console.log(`Found ${pantryItems.length} items in pantry collection`);
      
      if (pantryItems.length > 0) {
        console.log('Sample items:');
        pantryItems.slice(0, 3).forEach((item, i) => {
          console.log(`Item ${i+1}: ${JSON.stringify(item, null, 2)}`);
        });
      }
    } else {
      console.log('\nNo pantry collection found. It will be created when you add items.');
    }
    
    // Check for users
    if (collections.some(c => c.name === 'users')) {
      console.log('\nChecking users:');
      const users = await db.collection('users').find({}).toArray();
      console.log(`Found ${users.length} users in database`);
      
      if (users.length > 0) {
        // Show users without exposing sensitive data
        console.log('User IDs:');
        users.forEach(user => {
          console.log(`- User ID: ${user._id}, Email: ${user.email}`);
        });
      }
    }
    
    // Check for receipts
    if (collections.some(c => c.name === 'receipts')) {
      console.log('\nChecking receipts:');
      const receipts = await db.collection('receipts').find({}).toArray();
      console.log(`Found ${receipts.length} receipts in database`);
      
      if (receipts.length > 0) {
        console.log('Sample receipt data:');
        console.log(JSON.stringify(receipts[0], null, 2));
      }
    }
    
    // Close the connection
    await mongoose.disconnect();
    console.log('\nConnection closed successfully');
    
  } catch (error) {
    console.error('Error checking collections:', error);
    
    // Close the connection
    try {
      await mongoose.disconnect();
    } catch (err) {
      console.error('Error closing connection:', err);
    }
  }
}

// Run the check
checkCollections().catch(console.error); 