import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Connection options with increased timeout
const connectionOptions: mongoose.ConnectOptions = {
  connectTimeoutMS: 30000,  // Increase timeout to 30 seconds
  socketTimeoutMS: 45000,   // Increase socket timeout to 45 seconds
  serverSelectionTimeoutMS: 30000, // Increase server selection timeout
  heartbeatFrequencyMS: 10000,     // Check server every 10 seconds
};

// Create a connection with options
const connection = mongoose.createConnection(MONGODB_URI, connectionOptions);

// Connection event handlers
connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Main connection function
export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connection.asPromise();
    console.log('MongoDB connection established successfully');
    
    // Test the connection with a simple operation
    if (connection.db) {
      const admin = connection.db.admin();
      const result = await admin.ping();
      console.log('MongoDB connection is working. Ping result:', result);
    }
    
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    console.log('Please check your connection string and ensure your MongoDB Atlas cluster is accessible.');
    console.log('Current connection string format:', MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//USERNAME:PASSWORD@'));
    
    // Don't exit the process here - let the application handle the error
    throw error;
  }
}

// Graceful shutdown
export async function disconnectDB() {
  try {
    await connection.close();
    console.log('MongoDB connection closed successfully');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

// Export the connection for models to use
export { connection }; 