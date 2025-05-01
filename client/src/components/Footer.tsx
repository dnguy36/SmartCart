import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="text-white text-2xl font-bold">SmartCart</div>
            <p className="text-gray-300 text-base">
              Making online shopping smarter, faster, and more convenient with our intelligent e-commerce platform.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-300 hover:text-white">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Contact
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-base text-gray-300">
                      123 Shopping St, San Francisco, CA
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-base text-gray-300">
                      +1 (555) 123-4567
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-base text-gray-300">
                      info@smartcart.com
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} SmartCart, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
