import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardTitle 
} from "@/components/ui/card";
import { Product } from "@shared/schema";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency, getDiscountPercentage, getImageUrl } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const discountPercentage = getDiscountPercentage(product.price, product.discountPrice);
  const imageUrl = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : null;
  
  return (
    <Link href={`/product/${product.id}`}>
      <a className="block h-full">
        <Card className="product-card h-full flex flex-col">
          <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-t-lg">
            <img
              src={getImageUrl(imageUrl)}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.featured && (
              <div className="absolute top-2 left-2 bg-secondary text-foreground text-xs font-bold px-2 py-1 rounded">
                Featured
              </div>
            )}
            {discountPercentage && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discountPercentage}% OFF
              </div>
            )}
            <button
              className="absolute bottom-2 right-2 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toast({
                  title: "Added to wishlist",
                  description: `${product.name} has been added to your wishlist.`,
                });
              }}
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
          
          <CardContent className="flex-grow p-4">
            <div className="mb-2">
              <span className="text-xs text-muted-foreground">
                {product.categoryId === 1 ? "Farm Produce" : "Perfumes"}
              </span>
            </div>
            <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <span className="font-semibold text-lg">
                {formatCurrency(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="px-4 pb-4 pt-0">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
