import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { cn, getImageUrl } from "@/lib/utils";

export function Categories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const categoryImages = {
    "farm-produce": "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
    "perfumes": "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    "clothes": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "gadgets": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  };
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <h2 className="section-title text-center mb-10">Shop by Category</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-60 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories?.map((category) => {
              const isComingSoon = ['clothes', 'gadgets'].includes(category.slug);
              
              return (
                <div key={category.id} className="relative rounded-lg overflow-hidden group h-60">
                  <img
                    src={getImageUrl(category.imageUrl) || categoryImages[category.slug as keyof typeof categoryImages]}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    {isComingSoon ? (
                      <span className="text-white text-sm bg-secondary/70 px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    ) : (
                      <Link href={`/shop/${category.slug}`}>
                        <a className={cn(
                          "text-white text-sm border border-white rounded-full px-4 py-1",
                          "hover:bg-white hover:text-primary transition-colors"
                        )}>
                          Shop Now
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
