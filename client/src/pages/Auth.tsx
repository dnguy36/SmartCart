import { useState } from "react";
import { useLocation } from "wouter";
import { 
  ShoppingCart, 
  User, 
  KeyRound, 
  Mail, 
  ArrowRight, 
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Validation for email and password
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to SmartCart!",
      });
      setLocation("/dashboard");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!isValidPassword(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Your account has been created!",
      });
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-2" />
              <span className="text-primary font-bold text-2xl">SmartCart</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {activeTab === "login" ? "Sign in to your account" : "Create a new account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {activeTab === "login" 
                ? "Welcome back! Sign in to access your SmartCart dashboard." 
                : "Join thousands of shoppers saving time and money with SmartCart."}
            </p>
          </div>

          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="you@example.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyRound className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          placeholder="••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="John Doe"
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="you@example.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyRound className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          placeholder="••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 6 characters
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary/90 to-secondary/90 flex flex-col justify-center p-12">
          <motion.div 
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold mb-6">
              Smart grocery shopping, simplified
            </h2>
            <p className="text-lg text-white/90 mb-8">
              SmartCart helps you shop smarter, save time, reduce waste, and stick to your budget with AI-powered tools.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
                <p className="ml-3 text-white/90">Smart receipt scanning with OCR technology</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
                <p className="ml-3 text-white/90">AI-powered recipe suggestions based on your pantry</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
                <p className="ml-3 text-white/90">Real-time price comparison across local stores</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
                <p className="ml-3 text-white/90">Food waste reduction through expiry tracking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}