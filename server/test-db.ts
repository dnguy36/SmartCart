import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testDbConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  console.log('Testing MongoDB connection...');
  console.log('Connection string format:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//USERNAME:PASSWORD@'));
  
  try {
    // Use a very simple connection with increased timeout
    const connection = await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test a simple operation
    const adminDb = connection.connection.db.admin();
    const serverInfo = await adminDb.serverStatus();
    console.log('Server version:', serverInfo.version);
    console.log('Server uptime:', Math.round(serverInfo.uptime / 60), 'minutes');
    
    // List all collections
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name).join(', ') || 'No collections found');
    
    // Close the connection
    await connection.disconnect();
    console.log('Connection closed successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB!');
    console.error('Error details:', error);
    
    // Provide troubleshooting advice
    console.log('\n--- Troubleshooting suggestions ---');
    console.log('1. Check that your MongoDB Atlas cluster is running');
    console.log('2. Verify your username and password are correct');
    console.log('3. Make sure your IP address is whitelisted in MongoDB Atlas');
    console.log('4. Check network connectivity and firewall settings');
    console.log('5. Try updating your connection string format');
  }
}

// Run the test
testDbConnection().catch(console.error); 