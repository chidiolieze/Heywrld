import { HeywrldLogo } from "@/components/ui/heywrld-logo";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <HeywrldLogo className="mb-4" />
            <p className="text-gray-400 mb-4">
              Bringing the finest quality farm produce and luxury perfumes directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Shop</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-secondary transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/shop/farm-produce">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Farm Produce</a>
                </Link>
              </li>
              <li>
                <Link href="/shop/perfumes">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Perfumes</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq">
                  <a className="text-gray-400 hover:text-secondary transition-colors">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Shipping Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Returns & Refunds</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-400 hover:text-secondary transition-colors">Terms & Conditions</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Commerce Street, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-2" />
                <a href="tel:+2348012345678" className="text-gray-400 hover:text-secondary transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-2" />
                <a href="mailto:info@heywrld.com" className="text-gray-400 hover:text-secondary transition-colors">
                  info@heywrld.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none bg-secondary hover:bg-secondary/90 text-foreground">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Heywrld Enterprise. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0">
              <img 
                src="https://cdn.flutterwave.com/assets/images/flutterwave-logo-col.svg" 
                alt="Flutterwave Secure Payment" 
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
