import { ShopLayout } from "@/components/layout/shop-layout";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { Testimonials } from "@/components/home/testimonials";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Shield, Gift } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <ShopLayout>
      <Hero />
      
      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Shopping</h3>
              <p className="text-muted-foreground">Browse and order quality products with just a few clicks.</p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable delivery to your doorstep across Nigeria.</p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Safe and secure payment options powered by Flutterwave.</p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
              <p className="text-muted-foreground">Premium farm produce and luxury perfumes guaranteed.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Categories />
      
      <FeaturedProducts />
      
      {/* Promo Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Fresh Farm Produce Direct to Your Table</h2>
              <p className="text-lg mb-6 text-gray-100">
                Enjoy the freshness of farm products delivered straight to your home. Our produce is sourced directly from trusted farmers.
              </p>
              <Link href="/shop/farm-produce">
                <a>
                  <Button className="bg-white text-primary hover:bg-gray-100">Shop Farm Produce</Button>
                </a>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594492707146-3d4b13a908d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" 
                alt="Fresh farm produce" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Perfumes Promo */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1595425964071-2c1ec6994007?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" 
                alt="Luxury perfumes" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Luxury Perfumes For Every Occasion</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Discover our collection of premium fragrances that leave a lasting impression. From subtle everyday scents to bold statement perfumes.
              </p>
              <Link href="/shop/perfumes">
                <a>
                  <Button className="bg-primary text-white hover:bg-primary/90">Shop Perfumes</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* Call to Action */}
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Ready to Experience Quality Products?</h2>
          <p className="text-lg mb-8 text-gray-800 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Heywrld Enterprise for premium farm produce and luxury perfumes.
          </p>
          <Link href="/shop">
            <a>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Start Shopping Now
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </ShopLayout>
  );
}
