import { useState } from "react";
import { ShopLayout } from "@/components/layout/shop-layout";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { FilterIcon, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface ShopProps {
  params?: {
    category?: string;
  };
}

interface FilterState {
  categories: number[];
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
  onSale: boolean;
}

export default function Shop({ params }: ShopProps) {
  const [location] = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100000],
    inStock: false,
    featured: false,
    onSale: false,
  });
  
  // Extract category slug from URL if present
  const categorySlug = location.startsWith('/shop/') ? location.replace('/shop/', '') : undefined;
  
  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Find category ID based on slug
  const categoryId = categories?.find(cat => cat.slug === categorySlug)?.id;
  
  // Get category name for title
  const categoryName = categories?.find(cat => cat.slug === categorySlug)?.name;
  
  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
  };
  
  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: [0, 100000],
      inStock: false,
      featured: false,
      onSale: false,
    });
  };
  
  // Determine if any filters are active
  const hasActiveFilters = () => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 100000 ||
      activeFilters.inStock ||
      activeFilters.featured ||
      activeFilters.onSale
    );
  };
  
  return (
    <ShopLayout>
      {/* Hero Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryName ? `${categoryName}` : "All Products"}
          </h1>
          <p className="text-lg text-gray-100 max-w-3xl">
            {categorySlug === 'farm-produce' 
              ? "Fresh, high-quality farm produce delivered directly to your doorstep. From fruits to vegetables, we've got all your fresh food needs covered."
              : categorySlug === 'perfumes'
              ? "Discover our premium collection of luxury perfumes. Find the perfect scent to match your personality and make a lasting impression."
              : "Browse our selection of high-quality products. From farm-fresh produce to luxury perfumes, we offer only the best."}
          </p>
        </div>
      </section>
      
      {/* Shop Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container-custom">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="h-4 w-4" />
              Filters
              {hasActiveFilters() && (
                <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
            
            {hasActiveFilters() && (
              <Button
                variant="ghost"
                className="text-sm flex items-center gap-1"
                onClick={resetFilters}
              >
                <XCircle className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - shown by default on desktop, toggleable on mobile */}
            <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
              <ProductFilters 
                onFilterChange={handleFilterChange}
                className="sticky top-24"
              />
            </div>
            
            {/* Products */}
            <div className="flex-1">
              <ProductGrid categoryId={categoryId} />
            </div>
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
