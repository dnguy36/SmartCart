import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  ShoppingBag,
  AppleIcon,
  PlayCircle,
  HeartHandshake
} from "lucide-react";

const appFeatures = [
  "AI Shopping Lists",
  "Pantry Management",
  "Budget Control",
  "Receipt Scanning",
  "Price Tracking",
  "Meal Planning"
];

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Top section with app stores */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-md mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Download the SmartCart App</h3>
              <p className="text-gray-400">Take your grocery shopping experience to the next level with our mobile app</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="flex items-center px-5 py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                <AppleIcon className="h-7 w-7 text-white mr-2" />
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center px-5 py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                <PlayCircle className="h-7 w-7 text-white mr-2" />
                <div>
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-2" />
              <div className="text-white text-2xl font-bold">SmartCart</div>
            </div>
            <p className="text-gray-400 text-base">
              The smart way to manage your grocery shopping. Our AI-powered app helps you save time and money while reducing food waste.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Blog & Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center text-base text-gray-400 hover:text-primary">
                      <HeartHandshake className="h-4 w-4 mr-1" /> 
                      <span>Partner Stores</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Features
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {appFeatures.map((feature, index) => (
                    <li key={index}>
                      <Link href="#" className="text-base text-gray-400 hover:text-primary">
                        {feature}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Contact Support
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-primary">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Contact
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-400">
                      123 Grocery Lane<br />
                      San Francisco, CA 94107
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-400">
                      (555) 123-CART
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-400">
                      help@smartcart.com
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SmartCart, Inc. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Cookies
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
