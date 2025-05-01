import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to transform your shopping experience?
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-primary-foreground/90 lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of smart shoppers who are saving time and money with SmartCart.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex rounded-md shadow">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-primary font-semibold"
              >
                Sign Up For Free
              </Button>
            </div>
            <div className="ml-3 inline-flex">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white bg-primary/70 hover:bg-primary/60 border-primary-foreground/20"
              >
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
