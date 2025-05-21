import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";

export function CartSummary() {
  const { items, total } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  // Calculate values
  const subtotal = total;
  const shipping = total > 0 ? 1500 : 0; // Free shipping above 10,000
  const discount = 0; // Would be calculated based on coupon
  const grandTotal = subtotal + shipping - discount;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle coupon application logic here
    console.log("Applying coupon:", couponCode);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping > 0 ? formatCurrency(shipping) : "Free"}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        
        <form onSubmit={handleApplyCoupon} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button type="submit" variant="outline">Apply</Button>
        </form>
        
        <Separator />
        
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        {items.length > 0 ? (
          <Link href="/checkout">
            <a className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Link>
        ) : (
          <Link href="/shop">
            <a className="w-full">
              <Button className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </a>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
