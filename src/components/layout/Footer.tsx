import React from 'react';
import { ShoppingCart, Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShoppingCart size={24} className="text-emerald-600" />
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent">
              SmartCart
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>in 2025</span>
          </div>
          <p>© {new Date().getFullYear()} SmartCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;