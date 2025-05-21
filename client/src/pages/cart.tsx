import { ShopLayout } from "@/components/layout/shop-layout";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product/product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function Cart() {
  const { items, total } = useCart();
  
  const { data: featuredProducts } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  return (
    <ShopLayout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/shop">
              <a>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Continue Shopping
                </Button>
              </a>
            </Link>
            
            {/* Featured Products */}
            {featuredProducts && featuredProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Popular Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary />
              
              <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our customer service team is here to help you with any questions or concerns.
                </p>
                <Link href="/contact">
                  <a>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
