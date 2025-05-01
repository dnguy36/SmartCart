import { motion } from "framer-motion";
import { 
  Search, 
  ShoppingBag, 
  CreditCard, 
  Truck 
} from "lucide-react";

const steps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Browse Products",
    description: "Search through thousands of products across multiple stores."
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Add to Cart",
    description: "Add items to your cart with a single click or scan."
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Secure Checkout",
    description: "Pay securely using your preferred payment method."
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Fast Delivery",
    description: "Get your items delivered to your doorstep quickly."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How SmartCart Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Simplify your shopping in just a few steps
          </p>
        </div>
        
        <div className="mt-16">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block" />
            
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white relative z-10">
                      {step.icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-start">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Time-Saving</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Save hours each week by streamlining your shopping process.
                  </p>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Money-Saving</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our price comparison helps you find the best deals every time.
                  </p>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">User-Friendly</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Intuitive interface designed for shoppers of all ages and tech abilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
