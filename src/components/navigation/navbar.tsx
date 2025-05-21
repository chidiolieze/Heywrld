import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { HeywrldLogo } from "@/components/ui/heywrld-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User,
  Sun,
  Moon
} from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-provider";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { items } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4"
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <a className="flex items-center">
                  <HeywrldLogo size="md" />
                </a>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/">
                  <a className={`text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    Home
                  </a>
                </Link>
                <Link href="/shop">
                  <a className={`text-sm font-medium ${isActive('/shop') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    Shop
                  </a>
                </Link>
                <div className="relative group">
                  <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer">
                    Categories
                  </span>
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                    <Link href="/shop/farm-produce">
                      <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                        Farm Produce
                      </a>
                    </Link>
                    <Link href="/shop/perfumes">
                      <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white">
                        Perfumes
                      </a>
                    </Link>
                    <Link href="/shop/clothes">
                      <a className="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary hover:text-white pointer-events-none">
                        Clothes (Coming Soon)
                      </a>
                    </Link>
                    <Link href="/shop/gadgets">
                      <a className="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary hover:text-white pointer-events-none">
                        Gadgets (Coming Soon)
                      </a>
                    </Link>
                  </div>
                </div>
                <Link href="/about">
                  <a className={`text-sm font-medium ${isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    About
                  </a>
                </Link>
                <Link href="/contact">
                  <a className={`text-sm font-medium ${isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    Contact
                  </a>
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-48 lg:w-64 pl-10 pr-3 py-2 h-9 text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:flex"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              
              <Link href="/cart">
                <a className="relative p-2">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute top-0 right-0 bg-secondary text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </a>
              </Link>
              
              {isAuthenticated ? (
                <Link href={user?.isAdmin ? "/admin" : "/account"}>
                  <a className="hidden md:flex p-2">
                    <User className="h-5 w-5" />
                  </a>
                </Link>
              ) : (
                <Link href="/login">
                  <a className="hidden md:block">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </a>
                </Link>
              )}
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
