import express, { type Request, Response, NextFunction } from "express";
import { createServer as createHttpServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
import { connectDB } from "./db/mongodb";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import receiptRoutes from "./routes/receipts";
import pantryRoutes from "./routes/pantry";
import recipeRoutes from "./routes/recipes";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Verify AWS credentials are loaded
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  console.error('AWS credentials not found in environment variables');
  process.exit(1);
}

// Verify MongoDB URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('MongoDB URI not found in environment variables');
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB directly using the reliable method from our test script
// This replaces the connectDB() call
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB!');
  
  // Continue with server initialization after successful connection
  startServer();
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  console.log('Please check your connection string and ensure your MongoDB Atlas cluster is accessible.');
  console.log('Current connection string format:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//USERNAME:PASSWORD@'));
  process.exit(1);
});

// Route intercept middleware - catch ALL auth requests
app.use((req, res, next) => {
  console.log(`[Route Intercept] ${req.method} ${req.path}`);
  
  // Intercept auth and login requests and route them to our MongoDB auth
  if (req.path.includes('/api/auth') || req.path.includes('/api/login')) {
    console.log('🚨 INTERCEPTING AUTH REQUEST:', req.method, req.path);
    // These will be handled by our authRoutes middleware
  }
  
  next();
});

// Debug route - Must be defined before other middleware
app.get('/api/debug/routes', (_req, res) => {
  console.log('Debugging routes...');
  const routes: {method: string, path: string}[] = [];
  
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          const method = Object.keys(handler.route.methods)[0].toUpperCase();
          routes.push({
            method,
            path: handler.route.path
          });
        }
      });
    }
  });
  
  console.log('Registered Routes:', routes);
  res.json({ routes });
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register auth routes FIRST
app.use('/api/auth', authRoutes);

// Register protected routes 
app.use('/api/protected', protectedRoutes);

// Register receipt routes
app.use('/api/receipts', receiptRoutes);

// Register pantry routes
app.use('/api/pantry', pantryRoutes);

// Register recipe routes
app.use('/api/recipes', recipeRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function startServer() {
  // Create and start the server
  (async () => {
    try {
      // Check for running instance
      console.log('Starting server...');
      
      // Register other routes from the original codebase
      await registerRoutes(app);
      
      // Error handling
      app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
    
        res.status(status).json({ message });
        throw err;
      });
    
      // Create HTTP server
      const server = createHttpServer(app);
    
      // importantly only setup vite in development and after
      // setting up all the other routes so the catch-all route
      // doesn't interfere with the other routes
      if (app.get("env") === "development") {
        await setupVite(app, server);
      } else {
        // Serve static files from the dist directory in production
        app.use(express.static(path.join(__dirname, '../../dist')));
        
        // Handle client-side routing
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../../dist/index.html'));
        });
      }
      
      // ALWAYS serve the app on port 5000
      // this serves both the API and the client.
      // It is the only port that is not firewalled.
      const port = process.env.PORT || 5000;
      server.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log('Environment:', app.get("env"));
      });
    } catch (error) {
      console.error('Error creating server:', error);
      process.exit(1);
    }
  })();
}
