import { useState } from "react";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useLocation } from "wouter";
import { toast } from "@/hooks/use-toast";

type PaymentMethod = "flutterwave" | "pod";

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("flutterwave");
  const [isProcessing, setIsProcessing] = useState(false);
  const { total, clearCart } = useCart();
  const [, navigate] = useLocation();
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === "flutterwave") {
        // In a real implementation, we'd integrate with Flutterwave here
        // For now, we'll simulate a successful payment after a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful payment
        handlePaymentSuccess();
      } else if (paymentMethod === "pod") {
        // For Payment on Delivery, we'd just create the order
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Order Confirmed",
          description: "Your payment on delivery order has been placed successfully.",
        });
        
        clearCart();
        navigate("/checkout/success");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
    
    clearCart();
    navigate("/checkout/success");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Payment Method</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
        >
          <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-3">
            <RadioGroupItem value="flutterwave" id="flutterwave" />
            <label htmlFor="flutterwave" className="flex flex-1 items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">Pay with Card/Bank Transfer</p>
                <p className="text-sm text-muted-foreground">Secure payment via Flutterwave</p>
              </div>
              <img 
                src="https://cdn.flutterwave.com/assets/images/flutterwave-logo-col.svg" 
                alt="Flutterwave" 
                className="h-8"
              />
            </label>
          </div>
          
          <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <RadioGroupItem value="pod" id="pod" />
            <label htmlFor="pod" className="flex flex-1 items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">Pay on Delivery</p>
                <p className="text-sm text-muted-foreground">Cash or POS on delivery</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </label>
          </div>
        </RadioGroup>
        
        <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Amount to Pay:</span>
            <span className="font-bold text-lg">₦{total.toLocaleString()}.00</span>
          </div>
          <p className="text-xs text-muted-foreground">
            By proceeding, you agree to our terms and conditions.
          </p>
        </div>
        
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₦${total.toLocaleString()}.00`
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
