import { motion } from "framer-motion";
import { 
  Clock, 
  DollarSign, 
  Leaf, 
  ShoppingBasket, 
  PieChart,
  Refrigerator
} from "lucide-react";

const advantages = [
  {
    icon: <Clock className="h-12 w-12" />,
    title: "Save 3+ Hours Weekly",
    description: "SmartCart's AI-powered grocery lists and pantry tracking eliminate planning time and reduce store visits by automating your shopping routine."
  },
  {
    icon: <DollarSign className="h-12 w-12" />,
    title: "Reduce Grocery Costs",
    description: "Save up to 23% on groceries with price tracking across stores, budget controls, and alerts when your favorite items go on sale."
  },
  {
    icon: <Leaf className="h-12 w-12" />,
    title: "Minimize Food Waste",
    description: "Our pantry management with expiration tracking helps reduce household food waste by up to 40%, saving money while helping the environment."
  },
  {
    icon: <Refrigerator className="h-12 w-12" />,
    title: "Optimize Your Pantry",
    description: "Always know what's in your pantry, fridge, and freezer with digital inventory management that updates as you shop and cook."
  }
];

export default function Advantages() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose SmartCart
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience the advantages that make shopping better
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 text-primary">
                  {advantage.icon}
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900">{advantage.title}</h3>
                  <p className="mt-2 text-gray-600">{advantage.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <motion.h3 
                className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Smarter Grocery Management
              </motion.h3>
              <motion.p 
                className="mt-3 max-w-3xl text-lg text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                SmartCart revolutionizes how families shop for groceries by connecting your pantry, 
                shopping list, and budget in one intelligent system. Our AI learns your household's 
                patterns to predict needs before you run out of essentials.
              </motion.p>
              
              <motion.div 
                className="mt-8 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingBasket className="h-3.5 w-3.5" />
                  </div>
                  <span className="ml-3 text-base text-gray-600">AI-powered meal planning based on your pantry</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <span className="ml-3 text-base text-gray-600">Intelligent expiration tracking with timely reminders</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <PieChart className="h-3.5 w-3.5" />
                  </div>
                  <span className="ml-3 text-base text-gray-600">Budget optimization with category-based spending limits</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign className="h-3.5 w-3.5" />
                  </div>
                  <span className="ml-3 text-base text-gray-600">Store-specific deals and personalized savings alerts</span>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <motion.div 
                className="relative mx-auto rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="p-8 text-white h-full relative">
                  {/* Visual mockup of a grocery app screen */}
                  <div className="relative max-w-xs mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-5 overflow-hidden border border-white/20">
                    <div className="text-xl font-bold mb-4 text-white">Your Pantry</div>
                    
                    {/* Inventory cards */}
                    <div className="space-y-3 mb-6">
                      {[
                        { name: "Milk", qty: "2 gal", days: 5 },
                        { name: "Eggs", qty: "8 ct", days: 12 },
                        { name: "Apples", qty: "6 ct", days: 2 },
                        { name: "Bread", qty: "1 loaf", days: 1 }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-lg flex justify-between items-center ${
                            item.days <= 2 ? 'bg-white/20 border border-red-300/30' : 'bg-white/10'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                              {i % 2 === 0 ? 
                                <Refrigerator className="h-4 w-4 text-white/80" /> : 
                                <ShoppingBasket className="h-4 w-4 text-white/80" />
                              }
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-white/70">{item.qty}</div>
                            </div>
                          </div>
                          <div className={`text-xs rounded-full px-2 py-1 ${
                            item.days <= 2 ? 'bg-red-500/30 text-white' : 'bg-white/20 text-white/80'
                          }`}>
                            {item.days <= 2 ? `${item.days}d left!` : `${item.days}d left`}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add to shopping list button */}
                    <div className="bg-white/10 rounded-lg p-3 text-center border border-white/20">
                      <button className="text-sm font-medium bg-white/20 hover:bg-white/30 rounded-md w-full py-2 transition-colors">
                        Add Low Items to Shopping List
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-6"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
