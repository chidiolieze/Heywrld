import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { HeywrldLogo } from "@/components/ui/heywrld-logo";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  Package, 
  LogOut, 
  Menu, 
  X,
  Users,
  Settings
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-primary-light">
            <Link href="/">
              <a>
                <HeywrldLogo size="sm" />
              </a>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-colors ${
                      isActive(item.href)
                        ? "bg-primary-light text-white"
                        : "text-gray-300 hover:bg-primary-light hover:text-white"
                    }`}
                  >
                    <item.icon 
                      className={`mr-3 h-5 w-5 ${
                        isActive(item.href) ? "text-secondary" : "text-gray-300 group-hover:text-secondary"
                      }`} 
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-primary-light">
            <button
              onClick={logout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-primary-light hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white md:pl-2">
              Admin Dashboard
            </h1>
            
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
                    A
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white hidden md:block">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
