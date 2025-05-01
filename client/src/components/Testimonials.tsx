import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Busy Mom",
    image: "https://source.unsplash.com/random/?woman,portrait",
    stars: 5,
    quote: "SmartCart has completely transformed my grocery shopping experience. I save so much time with the smart lists and price comparison features. It's a life-saver for busy parents!"
  },
  {
    name: "Michael Chen",
    role: "Tech Professional",
    image: "https://source.unsplash.com/random/?man,asian",
    stars: 4,
    quote: "As someone who values efficiency, I appreciate how SmartCart streamlines my shopping. The mobile scanning feature is particularly useful when I'm browsing in physical stores."
  },
  {
    name: "Emily Rodriguez",
    role: "College Student",
    image: "https://source.unsplash.com/random/?woman,young",
    stars: 5,
    quote: "The price comparison feature has saved me so much money as a student on a tight budget. I can easily find the best deals across multiple stores without spending hours searching."
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
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Join thousands of happy shoppers who love using SmartCart
          </p>
        </div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-100"
              variants={item}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full object-cover" 
                    src={testimonial.image} 
                    alt={`${testimonial.name} avatar`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <div className="mt-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.stars ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 italic">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-lg font-medium text-gray-500">
                Trusted by over 10,000 shoppers
              </span>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-8 sm:space-x-12 lg:space-x-20">
            <div className="flex items-center opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-lg font-semibold text-gray-500">Whole Foods</span>
            </div>
            <div className="flex items-center opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-lg font-semibold text-gray-500">Target</span>
            </div>
            <div className="flex items-center opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-lg font-semibold text-gray-500">Walmart</span>
            </div>
            <div className="flex items-center opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-lg font-semibold text-gray-500">Kroger</span>
            </div>
            <div className="flex items-center opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-lg font-semibold text-gray-500">Costco</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
