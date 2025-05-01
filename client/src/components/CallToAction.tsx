import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Clock, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    text: "Smart grocery lists that save time"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    text: "Pantry tracking to reduce food waste"
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    text: "Price tracking for budget-conscious shopping"
  }
];

export default function CallToAction() {
  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAtMzR2Nmg2di02aC02em0tMTIgMTJ2Nmg2di02aC02em0xMiAwdjZoNnYtNmgtNnptLTEyIDEydjZoNnYtNmgtNnptMCAxMnY2aDZ2LTZoLTZ6bTEyIDB2Nmg2di02aC02em0xMiAtMTJ2Nmg2di02aC02em0wIDEydjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side - text content */}
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-extrabold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Simplify Your Grocery Shopping Today
            </motion.h2>
            <motion.p 
              className="mt-4 text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join over 50,000 smart shoppers who save time and money every week with SmartCart's intelligent grocery management.
            </motion.p>
            
            <motion.ul 
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <p className="ml-3 text-base text-white/90">{benefit.text}</p>
                </li>
              ))}
            </motion.ul>
          </div>
          
          {/* Right side - signup form */}
          <motion.div 
            className="mt-12 lg:mt-0 sm:max-w-lg lg:max-w-none mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white shadow-xl rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Try SmartCart Free for 14 Days</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Button className="w-full py-6 text-lg">
                    Get Started — It's Free
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>No credit card required • Cancel anytime</p>
                <div className="flex items-center justify-center mt-4 space-x-1 text-xs">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Available on iOS and Android</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
