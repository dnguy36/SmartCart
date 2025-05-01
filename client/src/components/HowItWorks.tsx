import { motion } from "framer-motion";
import { 
  Scan, 
  ShoppingBasket, 
  Receipt, 
  ListChecks,
  ArrowRight,
  ArrowDown,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Download & Set Up",
    description: "Download the SmartCart app and create your account in less than 2 minutes."
  },
  {
    icon: <ShoppingBasket className="h-8 w-8" />,
    title: "Add Your Pantry Items",
    description: "Quickly scan your groceries or add them manually to build your digital pantry."
  },
  {
    icon: <ListChecks className="h-8 w-8" />,
    title: "Generate Smart Lists",
    description: "Let AI create your shopping list based on what you need and your preferences."
  },
  {
    icon: <Scan className="h-8 w-8" />,
    title: "Shop & Scan",
    description: "Take your list to the store, check off items, and scan receipts when done."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How SmartCart Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Simplify your grocery shopping in four easy steps
          </p>
        </div>
        
        <div className="mt-16">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block" />
            
            <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary text-white relative z-10 shadow-lg">
                      {step.icon}
                      <div className="absolute -top-2 -right-2 bg-white text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center text-lg border-2 border-primary">
                        {index + 1}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          className="mt-20 bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Shopping. Real Savings.
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                SmartCart users save an average of <span className="font-semibold text-primary">$125 per month</span> on groceries while reducing food waste by tracking expiration dates.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                      <Receipt className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Time-Saving</h4>
                    <p className="mt-1 text-base text-gray-600">
                      Save 2+ hours every week on grocery planning and shopping
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-secondary/10 text-secondary">
                      <ArrowDown className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Food Waste Reduction</h4>
                    <p className="mt-1 text-base text-gray-600">
                      Reduce household food waste by up to 40% with expiration tracking
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Easy to Adopt</h4>
                    <p className="mt-1 text-base text-gray-600">
                      Over 90% of users continue using SmartCart after the first month
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="px-8 py-3 text-md font-medium">
                  Try SmartCart Today
                </Button>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-primary/90 to-secondary/90 p-8 lg:p-12 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 text-white text-center flex flex-col h-full justify-center">
                <h3 className="text-3xl font-bold mb-6">What Our Users Say</h3>
                
                <div className="relative mb-8 px-8">
                  <div className="absolute top-0 left-0 text-6xl text-white/20">"</div>
                  <div className="text-lg italic pt-6">
                    SmartCart has transformed how I shop for groceries. I'm saving at least $200 a month, and I never forget items or find expired food in my fridge anymore!
                  </div>
                  <div className="mt-4 font-semibold">Sarah T.</div>
                  <div className="text-sm text-white/80">Working parent of two</div>
                </div>
                
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/40 first:bg-white"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
