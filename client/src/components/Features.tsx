import { 
  ShoppingCart, 
  Smartphone, 
  Tag, 
  CreditCard, 
  Clock, 
  BarChart 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShoppingCart className="h-10 w-10" />,
    title: "Smart Shopping Lists",
    description: "Create intelligent shopping lists that organize items by store, aisle, and category."
  },
  {
    icon: <Tag className="h-10 w-10" />,
    title: "Price Comparison",
    description: "Automatically compare prices across multiple stores to find the best deals."
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile Scanning",
    description: "Scan products at home or in-store to add them instantly to your cart."
  },
  {
    icon: <CreditCard className="h-10 w-10" />,
    title: "Secure Checkout",
    description: "Complete your purchase securely with our integrated payment system."
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Delivery Scheduling",
    description: "Schedule deliveries for a time that works best for you."
  },
  {
    icon: <BarChart className="h-10 w-10" />,
    title: "Purchase Analytics",
    description: "Track your spending habits and discover ways to save more money."
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
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Everything you need for a smarter shopping experience
          </p>
        </div>
        
        <motion.div 
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
              variants={item}
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
