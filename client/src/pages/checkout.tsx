import { useState } from "react";
import { ShopLayout } from "@/components/layout/shop-layout";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { PaymentMethods } from "@/components/checkout/payment-methods";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@shared/schema";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ChevronLeft, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const [location] = useLocation();
  const { items, total } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>(
    location.includes('/checkout/success') ? 'payment' : 'shipping'
  );
  
  // If the cart is empty and not on success page, redirect to cart
  if (items.length === 0 && !location.includes('/checkout/success')) {
    return (
      <ShopLayout>
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              You need to add some items to your cart before proceeding to checkout.
            </p>
            <Link href="/shop">
              <a>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Browse Products
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </ShopLayout>
    );
  }
  
  if (location.includes('/checkout/success')) {
    return (
      <ShopLayout>
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Successfully Placed!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. We'll send you a confirmation email with your order details shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <a>
                  <Button variant="outline">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </Button>
                </a>
              </Link>
              <Link href="/shop">
                <a>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Continue Shopping
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </ShopLayout>
    );
  }
  
  const OrderSummary = ({ items, total }: { items: CartItem[], total: number }) => (
    <div className="rounded-lg border bg-card text-card-foreground">
      <div className="p-6 flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        
        <div className="max-h-72 overflow-y-auto space-y-4 pr-2">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                <img
                  src={getImageUrl(Array.isArray(item.product.images) && item.product.images.length > 0 ? item.product.images[0] : null)}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                <p className="text-sm">{formatCurrency((item.product.discountPrice || item.product.price) * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{total > 10000 ? "Free" : formatCurrency(1500)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total > 10000 ? total : total + 1500)}</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <ShopLayout>
      <div className="container-custom py-12">
        <div className="flex items-center mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                step === 'shipping' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                1
              </div>
              <span className="hidden sm:inline">Shipping</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                2
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 'shipping' && (
              <>
                <CheckoutForm />
                <div className="flex justify-end mt-6">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setStep('payment')}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </>
            )}
            
            {step === 'payment' && (
              <>
                <PaymentMethods />
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setStep('shipping')}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Shipping
                  </Button>
                </div>
              </>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary items={items} total={total} />
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-4">
                By completing your purchase, you agree to our{' '}
                <Link href="/terms">
                  <a className="text-primary hover:underline">Terms of Service</a>
                </Link>{' '}
                and{' '}
                <Link href="/privacy">
                  <a className="text-primary hover:underline">Privacy Policy</a>
                </Link>.
              </p>
              <p>
                Need help?{' '}
                <Link href="/contact">
                  <a className="text-primary hover:underline">Contact our support team</a>
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
