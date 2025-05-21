import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart, CartItem, Product } from "@shared/schema";

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>(() => {
    // Load cart from localStorage on initialization
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
    }
    return { items: [], total: 0 };
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculate total
  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => {
      const price = item.product.discountPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const addItem = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevCart.items.findIndex(item => item.productId === product.id);
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item to cart
        updatedItems = [
          ...prevCart.items,
          {
            productId: product.id,
            quantity,
            product
          }
        ];
      }
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart;
      }
      
      const updatedItems = prevCart.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };

  const removeItem = (productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(item => item.productId !== productId);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        total: cart.total,
        addItem,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
