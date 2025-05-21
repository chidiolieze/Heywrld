import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { useLocation } from "wouter";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<User>;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [, navigate] = useLocation();
  
  // Load user from localStorage on initialization
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);
  
  const login = async (username: string, password: string): Promise<User> => {
    try {
      const response = await apiRequest("POST", "/api/auth/login", { username, password });
      const userData = await response.json();
      
      // Save user to state and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  
  const logout = () => {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem("user");
    
    // Redirect to home page
    navigate("/");
  };
  
  const register = async (userData: RegisterData): Promise<User> => {
    try {
      const response = await apiRequest("POST", "/api/auth/register", userData);
      const newUser = await response.json();
      
      // Automatically log in after registration
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
