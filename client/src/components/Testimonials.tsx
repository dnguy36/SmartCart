import { motion } from "framer-motion";
import { Star, ShoppingBag, Clock, DollarSign, ReceiptText, ShoppingCart } from "lucide-react";

const testimonials = [
  {
    name: "Rachel Davis",
    role: "Busy Parent",
    icon: <ShoppingBag className="h-8 w-8 text-primary" />,
    stars: 5,
    quote: "SmartCart has transformed my grocery shopping. The AI-generated lists and pantry tracking have cut my shopping time in half and reduced our food waste by at least 30%.",
    highlight: "Reduced food waste by 30%",
    savings: "$110 monthly savings"
  },
  {
    name: "James Wilson",
    role: "Budget-Conscious Shopper",
    icon: <DollarSign className="h-8 w-8 text-secondary" />,
    stars: 5,
    quote: "I'm saving over $200 a month with SmartCart's price tracking features. It automatically finds the best deals and tells me when prices drop on items I buy regularly.",
    highlight: "Price tracking across stores",
    savings: "$200+ monthly savings"
  },
  {
    name: "Michelle Park",
    role: "Working Professional",
    icon: <Clock className="h-8 w-8 text-primary" />,
    stars: 5,
    quote: "As someone who's always on the go, SmartCart's meal planning and automated shopping lists have been a game-changer. I can plan an entire week's meals in minutes.",
    highlight: "Saves 3+ hours weekly",
    savings: "Reduced food waste"
  },
  {
    name: "David Thompson",
    role: "Home Cook",
    icon: <ReceiptText className="h-8 w-8 text-secondary" />,
    stars: 4,
    quote: "The recipe suggestion feature based on what's in my pantry has made cooking much more creative and efficient. I've discovered new dishes and wasted far less food.",
    highlight: "Smart recipe suggestions",
    savings: "Less food waste"
  }
];

const statCards = [
  {
    icon: <ShoppingCart className="h-10 w-10 text-white" />,
    stat: "4.8",
    label: "Average rating from 5,000+ users",
    gradient: "from-primary to-primary/70"
  },
  {
    icon: <DollarSign className="h-10 w-10 text-white" />,
    stat: "$125",
    label: "Average monthly savings per household",
    gradient: "from-secondary to-secondary/70"
  },
  {
    icon: <Clock className="h-10 w-10 text-white" />,
    stat: "92%",
    label: "Of users report saving 2+ hours weekly",
    gradient: "from-primary to-primary/70"
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

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Users Love SmartCart
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            See how SmartCart is transforming grocery shopping for thousands of families
          </p>
        </div>
        
        {/* Stats section */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden bg-gradient-to-br ${stat.gradient}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="px-4 py-5 sm:p-6 text-center text-white">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold">{stat.stat}</div>
                <div className="mt-1 text-white/80 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-20">
          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                variants={item}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-50 rounded-lg p-3">
                      {testimonial.icon}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.stars ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {testimonial.highlight}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        {testimonial.savings}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Compatible stores */}
        <div className="mt-20">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-50 text-lg font-medium text-gray-500">
                Works with all major grocery stores
              </span>
            </div>
          </div>
          
          <motion.div 
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {['Whole Foods', 'Target', 'Walmart', 'Kroger', 'Costco'].map((store, i) => (
              <div key={i} className="flex items-center justify-center bg-white py-4 px-6 rounded-lg shadow-sm border border-gray-100">
                <span className="text-base font-semibold text-gray-500">{store}</span>
              </div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500">And 100+ more grocery retailers nationwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
