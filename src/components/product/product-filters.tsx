import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Category } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  categories: number[];
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
  onSale: boolean;
}

export function ProductFilters({ onFilterChange, className }: ProductFiltersProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100000],
    inStock: false,
    featured: false,
    onSale: false,
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    const updatedFilters = {
      ...filters,
      categories: updatedCategories
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handlePriceChange = (value: number[]) => {
    const updatedFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number]
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleCheckboxChange = (key: keyof Pick<FilterState, 'inStock' | 'featured' | 'onSale'>, checked: boolean) => {
    const updatedFilters = {
      ...filters,
      [key]: checked
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const resetFilters = () => {
    const defaultFilters: FilterState = {
      categories: [],
      priceRange: [0, 100000],
      inStock: false,
      featured: false,
      onSale: false,
    };
    
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  
  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["categories", "price", "availability"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories?.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                min={0}
                max={100000}
                step={1000}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">{formatCurrency(filters.priceRange[0])}</span>
                <span className="text-sm">{formatCurrency(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="in-stock" 
                  checked={filters.inStock}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange('inStock', checked as boolean)
                  }
                />
                <label 
                  htmlFor="in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  In Stock
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={filters.featured}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange('featured', checked as boolean)
                  }
                />
                <label 
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Featured Products
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="on-sale" 
                  checked={filters.onSale}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange('onSale', checked as boolean)
                  }
                />
                <label 
                  htmlFor="on-sale"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  On Sale
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  
  return (
    <>
      {/* Desktop filters */}
      <div className={`hidden md:block ${className}`}>
        {filterContent}
      </div>
      
      {/* Mobile filter button and drawer */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Mobile filter drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-lg">Filters</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {filterContent}
          </div>
          
          <div className="p-4 border-t">
            <Button 
              className="w-full bg-primary text-white"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
