import { 
  Brain, 
  ShoppingBasket, 
  BarChart, 
  Receipt, 
  Calendar, 
  Search,
  Sparkles,
  Clock,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";

const featureCategories = [
  {
    title: "Smart Shopping Experience",
    description: "AI-powered tools to streamline grocery planning and shopping",
    features: [
      {
        icon: <Brain className="h-10 w-10" />,
        title: "AI-Powered List Generation",
        description: "Intelligent shopping lists created based on your preferences, meal plans, and past purchases."
      },
      {
        icon: <Search className="h-10 w-10" />,
        title: "Real-Time Price Tracking",
        description: "Compare prices across multiple stores to find the best deals and maximize savings."
      },
      {
        icon: <Receipt className="h-10 w-10" />,
        title: "Smart Receipt Scanning",
        description: "Snap a photo of your receipt to automatically log purchases and track spending."
      }
    ]
  },
  {
    title: "Pantry Management",
    description: "Keep track of what you have and what you need",
    features: [
      {
        icon: <ShoppingBasket className="h-10 w-10" />,
        title: "Digital Inventory",
        description: "Maintain a digital record of all items in your pantry, fridge, and freezer."
      },
      {
        icon: <Calendar className="h-10 w-10" />,
        title: "Expiration Tracking",
        description: "Get notifications before items expire to reduce food waste and save money."
      },
      {
        icon: <Sparkles className="h-10 w-10" />,
        title: "Smart Recipe Suggestions",
        description: "Discover recipes based on ingredients you already have in your pantry."
      }
    ]
  },
  {
    title: "Budget Control",
    description: "Take control of your grocery spending",
    features: [
      {
        icon: <BarChart className="h-10 w-10" />,
        title: "Spending Analytics",
        description: "Visualize your grocery spending patterns and identify opportunities to save."
      },
      {
        icon: <Tag className="h-10 w-10" />,
        title: "Price History Tracking",
        description: "Track price fluctuations and get alerts when items on your list are at their lowest price."
      },
      {
        icon: <Clock className="h-10 w-10" />,
        title: "Monthly Budget Setting",
        description: "Set grocery budgets and receive alerts when you're approaching your limit."
      }
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Smart Features for Smart Shopping
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            SmartCart transforms your grocery shopping experience with intelligent features that save you time and money
          </p>
        </div>
        
        <div className="mt-16 space-y-24">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <div className="h-1 w-20 bg-primary rounded mb-4"></div>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>
              
              <motion.div 
                className="mt-8 lg:mt-0 lg:col-span-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {category.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                    variants={item}
                  >
                    <div className={`${categoryIndex === 0 ? 'text-primary' : categoryIndex === 1 ? 'text-secondary' : 'text-primary'} mb-4`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to simplify your grocery shopping?</h3>
            <div className="inline-flex bg-gradient-to-r from-primary to-secondary p-[1px] rounded-md">
              <button className="bg-white text-primary hover:bg-transparent hover:text-white transition-colors duration-300 rounded-md font-medium py-3 px-6">
                Get Started Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
