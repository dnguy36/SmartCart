import { 
  users, 
  type User, 
  type InsertUser, 
  type NewsletterSubscriber, 
  type InsertNewsletterSubscriber,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter operations
  getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
  createNewsletterSubscription(data: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  
  // Contact submission operations
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userIdCounter: number;
  private subscriberIdCounter: number;
  private submissionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.newsletterSubscribers = new Map();
    this.contactSubmissions = new Map();
    this.userIdCounter = 1;
    this.subscriberIdCounter = 1;
    this.submissionIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Newsletter methods
  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    return Array.from(this.newsletterSubscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async createNewsletterSubscription(data: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existingSubscriber = await this.getNewsletterSubscriberByEmail(data.email);
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberIdCounter++;
    const subscriber: NewsletterSubscriber = { ...data, id };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Contact submission methods
  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.submissionIdCounter++;
    const submission: ContactSubmission = { 
      ...data, 
      id, 
      submittedAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
