import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Create a single connection for all features
const connection = mongoose.createConnection(MONGODB_URI);

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
    await connection.asPromise();
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Graceful shutdown
export async function disconnectDB() {
  try {
    await connection.close();
    console.log('MongoDB connection closed successfully');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
}

// Export the connection for models to use
export { connection }; 