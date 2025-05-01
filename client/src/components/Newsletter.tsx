import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Receipt, ShoppingBasket, Bell, Tag } from "lucide-react";

const benefitsList = [
  {
    icon: <Receipt className="h-5 w-5 text-primary" />,
    text: "Exclusive grocery saving tips"
  },
  {
    icon: <Tag className="h-5 w-5 text-primary" />,
    text: "Seasonal sale alerts"
  },
  {
    icon: <ShoppingBasket className="h-5 w-5 text-primary" />,
    text: "Recipe inspirations"
  },
  {
    icon: <Bell className="h-5 w-5 text-primary" />,
    text: "New feature announcements"
  }
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our grocery savings newsletter!",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 py-10 px-6 shadow-lg sm:py-12 sm:px-12 lg:flex lg:items-center lg:p-16 border border-primary/10">
          <motion.div 
            className="lg:w-0 lg:flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Get Grocery Saving Tips
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">
              Join our newsletter for exclusive grocery shopping tips, seasonal sales alerts, and easy recipe inspirations for your pantry items.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefitsList.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Subscribe to our newsletter</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 font-medium"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  🔒 We value your privacy. Read our{" "}
                  <a href="#" className="font-medium text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
                <div className="mt-3 text-xs text-gray-400">
                  One email per week. Unsubscribe anytime.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
