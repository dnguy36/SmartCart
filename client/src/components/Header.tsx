import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-primary font-bold text-2xl">SmartCart</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="#features" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Testimonials
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="link" className="text-gray-500 hover:text-primary text-sm font-medium">
              Sign In
            </Button>
            <Button>
              Sign Up
            </Button>
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            <Link href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-primary">
              Testimonials
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </div>
              <div className="ml-3">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
