import { CartItem as CartItemType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { Link } from "wouter";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCart();
  
  const imageUrl = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0]
    : null;
  
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  const itemPrice = product.discountPrice || product.price;
  const itemTotal = itemPrice * quantity;
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden mb-4 sm:mb-0 sm:mr-4">
            <Link href={`/product/${product.id}`}>
              <a>
                <img
                  src={getImageUrl(imageUrl)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </a>
            </Link>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between">
              <div>
                <Link href={`/product/${product.id}`}>
                  <a className="text-lg font-medium hover:text-primary">
                    {product.name}
                  </a>
                </Link>
                <p className="text-sm text-muted-foreground mb-2">
                  SKU: {product.sku}
                </p>
              </div>
              
              <div className="text-right mt-2 sm:mt-0">
                <div className="font-medium">{formatCurrency(itemTotal)}</div>
                {quantity > 1 && (
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(itemPrice)} each
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={handleDecrease}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="h-8 px-4 flex items-center justify-center border-y border-input">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={handleIncrease}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={handleRemove}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
