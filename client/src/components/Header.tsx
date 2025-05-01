import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(true);
  
  useEffect(() => {
    // Check if we're on the landing page or an app page
    setIsLandingPage(location === "/");
    
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-2" />
              <span className="text-primary font-bold text-2xl">SmartCart</span>
            </Link>
            
            {isLandingPage ? (
              // Landing page navigation
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="/" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a 
                  href="#features" 
                  className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  How It Works
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Pricing
                </a>
                <a 
                  href="#testimonials" 
                  className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Testimonials
                </a>
              </nav>
            ) : (
              // App navigation
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="/dashboard" className={`px-3 py-2 text-sm font-medium ${location === "/dashboard" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  Dashboard
                </Link>
                <Link href="/scanner" className={`px-3 py-2 text-sm font-medium ${location === "/scanner" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  Scanner
                </Link>
                <Link href="/pantry" className={`px-3 py-2 text-sm font-medium ${location === "/pantry" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  Pantry
                </Link>
                <Link href="/recipes" className={`px-3 py-2 text-sm font-medium ${location === "/recipes" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  Recipes
                </Link>
                <Link href="/prices" className={`px-3 py-2 text-sm font-medium ${location === "/prices" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  Prices
                </Link>
                <Link href="/analytics" className={`px-3 py-2 text-sm font-medium ${location === "/analytics" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  Analytics
                </Link>
              </nav>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLandingPage ? (
              // Landing page buttons
              <>
                <Link href="/auth">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90">
                    Try for Free
                  </Button>
                </Link>
              </>
            ) : (
              // App buttons - user is already signed in
              <Link href="/">
                <Button variant="ghost" className="text-gray-500 hover:text-primary">
                  Log Out
                </Button>
              </Link>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMobileMenu}
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLandingPage ? (
              // Landing page mobile navigation
              <>
                <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">
                  Home
                </a>
                <a 
                  href="#features" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  How It Works
                </a>
                <a 
                  href="#pricing" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  Pricing
                </a>
                <a 
                  href="#testimonials" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  Testimonials
                </a>
              </>
            ) : (
              // App mobile navigation
              <>
                <Link href="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/dashboard" ? "text-primary bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}>
                  Dashboard
                </Link>
                <Link href="/scanner" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/scanner" ? "text-primary bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}>
                  Scanner
                </Link>
                <Link href="/pantry" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/pantry" ? "text-primary bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}>
                  Pantry
                </Link>
                <Link href="/recipes" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/recipes" ? "text-primary bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}>
                  Recipes
                </Link>
                <Link href="/prices" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/prices" ? "text-primary bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}>
                  Prices
                </Link>
                <Link href="/analytics" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/analytics" ? "text-primary bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}>
                  Analytics
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-5 pb-2">
              {isLandingPage ? (
                // Landing page mobile buttons
                <>
                  <Link href="/dashboard">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Try for Free
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                // App mobile buttons
                <Link href="/">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-500 hover:text-primary">
                    Log Out
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
