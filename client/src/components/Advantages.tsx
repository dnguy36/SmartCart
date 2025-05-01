import { motion } from "framer-motion";
import { 
  Clock, 
  DollarSign, 
  Smartphone, 
  ShieldCheck 
} from "lucide-react";

const advantages = [
  {
    icon: <Clock className="h-12 w-12" />,
    title: "Save Time",
    description: "SmartCart reduces shopping time by up to 50% with quick scanning and intelligent list organization."
  },
  {
    icon: <DollarSign className="h-12 w-12" />,
    title: "Save Money",
    description: "Our price comparison engine finds the best deals, saving customers an average of 15% on their shopping bills."
  },
  {
    icon: <Smartphone className="h-12 w-12" />,
    title: "Shop Anywhere",
    description: "Use SmartCart on any device - browse at home and continue shopping on your mobile when in-store."
  },
  {
    icon: <ShieldCheck className="h-12 w-12" />,
    title: "Shop Securely",
    description: "End-to-end encryption and secure payment processing protect your personal and financial information."
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
                The Smart Way to Shop Online
              </motion.h3>
              <motion.p 
                className="mt-3 max-w-3xl text-lg text-gray-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                SmartCart is designed to make online shopping intuitive and efficient. 
                Our platform learns from your shopping habits to provide personalized 
                recommendations and streamline your shopping experience.
              </motion.p>
              
              <motion.div 
                className="mt-8 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Personalized shopping recommendations</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Automated price tracking for items in your wishlist</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Smart reordering for frequently purchased items</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Real-time inventory updates from partner stores</span>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <motion.div 
                className="relative mx-auto rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img 
                  className="w-full" 
                  src="https://source.unsplash.com/random/?online,shopping,app" 
                  alt="SmartCart mobile application interface"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
