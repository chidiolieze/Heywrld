import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Product } from "@shared/schema";
import { useState } from "react";

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'all' | 'farm' | 'perfumes'>('all');
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  const filteredProducts = products?.filter((product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'farm') return product.categoryId === 1;
    if (activeTab === 'perfumes') return product.categoryId === 2;
    return true;
  });
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="section-title">Featured Products</h2>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'farm'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('farm')}
            >
              Farm Produce
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'perfumes'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('perfumes')}
            >
              Perfumes
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts?.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/shop">
                <a>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    View All Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
