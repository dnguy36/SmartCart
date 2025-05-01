import { ArrowRight, ShoppingCart, Receipt, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 sm:px-6 lg:px-8">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block xl:inline">Smart Grocery</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary xl:inline"> Shopping Simplified</span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transform your grocery shopping experience with AI-powered lists, 
                pantry tracking, budget control, and intelligent receipt management.
                Save time, reduce waste, and stick to your budget.
              </motion.p>
              
              {/* Feature badges */}
              <motion.div 
                className="mt-6 flex flex-wrap gap-3 sm:justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  <Sparkles className="h-3 w-3 mr-1" /> AI-Powered Lists
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                  <ShoppingCart className="h-3 w-3 mr-1" /> Pantry Management
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  <Receipt className="h-3 w-3 mr-1" /> Receipt Scanning
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                  <TrendingUp className="h-3 w-3 mr-1" /> Budget Control
                </div>
              </motion.div>
              
              <motion.div
                className="mt-6 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full px-8 py-3 text-lg font-medium">
                    Try for Free
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-medium">
                    <span>Watch Demo</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
              
              {/* Social proof */}
              <motion.div
                className="mt-6 text-sm text-gray-500 flex items-center sm:justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex -space-x-1 overflow-hidden mr-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gradient-to-br ${i % 2 === 0 ? 'from-primary to-primary/70' : 'from-secondary to-secondary/70'}`} />
                  ))}
                </div>
                <span>Join <span className="font-medium text-gray-900">5,000+</span> shoppers saving time & money</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero visualization */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-br from-primary/90 to-secondary/90 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center overflow-hidden">
          <motion.div 
            className="relative w-4/5 h-4/5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Phone mockup with app UI */}
            <div className="absolute max-w-[280px] bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg p-4 overflow-hidden border border-white/20">
              <div className="w-40 h-1 bg-white/30 rounded-full mx-auto mb-4"></div>
              
              {/* App header */}
              <div className="pb-3 mb-3 border-b border-white/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5 text-white mr-2" />
                    <div className="text-white font-medium">SmartCart</div>
                  </div>
                  <div className="bg-primary/30 rounded-full h-8 w-8"></div>
                </div>
              </div>
              
              {/* Shopping list */}
              <div className="space-y-3 mb-4">
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded bg-primary/40 mr-3"></div>
                    <div className="text-white text-sm">Milk</div>
                  </div>
                  <div className="text-white/80 text-xs">$3.99</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded bg-primary/40 mr-3"></div>
                    <div className="text-white text-sm">Eggs</div>
                  </div>
                  <div className="text-white/80 text-xs">$2.49</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded bg-primary/40 mr-3"></div>
                    <div className="text-white text-sm">Bread</div>
                  </div>
                  <div className="text-white/80 text-xs">$3.29</div>
                </div>
              </div>
              
              {/* Budget indicator */}
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <div className="text-white text-xs">Monthly Budget</div>
                  <div className="text-white text-xs font-medium">$320.00/$500.00</div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Receipt scanning visualization */}
            <motion.div 
              className="absolute bottom-5 -right-10 bg-white/10 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 transform rotate-6"
              initial={{ opacity: 0, y: 20, rotate: 12 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-24 h-36 flex flex-col">
                <div className="text-white/80 text-xs mb-1">Receipt</div>
                <div className="flex-1 bg-white/20 rounded-md flex items-center justify-center">
                  <Receipt className="h-5 w-5 text-white/70" />
                </div>
                <div className="mt-2 w-full h-2 bg-white/30 rounded-full"></div>
                <div className="mt-1 w-3/4 h-2 bg-white/30 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
