import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { newsletterSubscriptionSchema, contactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  console.log("Setting up original routes from routes.ts... (check for conflicts)");
  
  // Check for any existing auth routes in the original route setup
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route && (
        middleware.route.path.includes('/auth') || 
        middleware.route.path.includes('/login')
    )) {
      console.warn('⚠️ CONFLICTING AUTH ROUTE FOUND:', middleware.route.path);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route && (
            handler.route.path.includes('/auth') || 
            handler.route.path.includes('/login')
        )) {
          console.warn('⚠️ CONFLICTING AUTH ROUTE FOUND IN ROUTER:', handler.route.path);
        }
      });
    }
  });
  
  // Newsletter subscription route
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = newsletterSubscriptionSchema.parse(req.body);
      
      const subscriber = await storage.createNewsletterSubscription({
        email: validatedData.email,
        subscribedAt: new Date()
      });
      
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to the newsletter",
        data: subscriber
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      }
      
      console.error("Newsletter subscription error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });

  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message
      });
      
      res.status(201).json({
        success: true,
        message: "Your message has been sent successfully",
        data: submission
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      }
      
      console.error("Contact submission error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
