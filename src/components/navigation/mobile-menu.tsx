import { Link, useLocation } from "wouter";
import { HeywrldLogo } from "@/components/ui/heywrld-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, ChevronDown, ChevronRight, ShoppingBag, User, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/theme-provider";
import { useAuth } from "@/context/auth-context";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <HeywrldLogo size="sm" />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-3 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <nav className="space-y-4">
          <Link href="/">
            <a className={`block py-2 text-base font-medium ${
              isActive('/') ? 'text-primary' : 'text-foreground'
            }`} onClick={onClose}>
              Home
            </a>
          </Link>
          
          <Link href="/shop">
            <a className={`block py-2 text-base font-medium ${
              isActive('/shop') ? 'text-primary' : 'text-foreground'
            }`} onClick={onClose}>
              Shop
            </a>
          </Link>
          
          <div>
            <button 
              className="flex items-center justify-between w-full py-2 text-base font-medium text-foreground"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              <span>Categories</span>
              {isCategoriesOpen ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
            
            {isCategoriesOpen && (
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-muted">
                <Link href="/shop/farm-produce">
                  <a className="block py-1 text-sm font-medium text-foreground" onClick={onClose}>
                    Farm Produce
                  </a>
                </Link>
                <Link href="/shop/perfumes">
                  <a className="block py-1 text-sm font-medium text-foreground" onClick={onClose}>
                    Perfumes
                  </a>
                </Link>
                <span className="block py-1 text-sm font-medium text-muted-foreground">
                  Clothes (Coming Soon)
                </span>
                <span className="block py-1 text-sm font-medium text-muted-foreground">
                  Gadgets (Coming Soon)
                </span>
              </div>
            )}
          </div>
          
          <Link href="/about">
            <a className={`block py-2 text-base font-medium ${
              isActive('/about') ? 'text-primary' : 'text-foreground'
            }`} onClick={onClose}>
              About
            </a>
          </Link>
          
          <Link href="/contact">
            <a className={`block py-2 text-base font-medium ${
              isActive('/contact') ? 'text-primary' : 'text-foreground'
            }`} onClick={onClose}>
              Contact
            </a>
          </Link>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <button onClick={toggleTheme} className="flex items-center space-x-2 text-foreground">
            {theme === 'light' ? (
              <>
                <Moon className="h-5 w-5" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="h-5 w-5" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Link href="/cart">
            <a className="flex items-center justify-center py-2 text-sm font-medium text-foreground border rounded-md" onClick={onClose}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart
            </a>
          </Link>
          
          {isAuthenticated ? (
            <Link href={user?.isAdmin ? "/admin" : "/account"}>
              <a className="flex items-center justify-center py-2 text-sm font-medium text-white bg-primary rounded-md" onClick={onClose}>
                <User className="h-4 w-4 mr-2" />
                {user?.isAdmin ? "Admin" : "Account"}
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a className="flex items-center justify-center py-2 text-sm font-medium text-white bg-primary rounded-md" onClick={onClose}>
                <User className="h-4 w-4 mr-2" />
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
