
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

const OrderSuccess = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `TFC-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Redirect to home if accessed directly (no completed order)
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  
  return (
    <MainLayout>
      <div className="container py-12 max-w-lg">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 px-6 pb-0 text-center">
            <div className="flex justify-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <h1 className="mt-4 text-2xl font-serif font-bold">Order Confirmed!</h1>
            
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. We've received your order and will begin processing it right away.
            </p>
            
            <div className="mt-6 bg-muted/30 p-4 rounded-md text-left">
              <h3 className="font-medium">Order Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Order Number:</span> {orderNumber}
                </p>
                <p>
                  <span className="text-muted-foreground">Date:</span> {new Date().toLocaleDateString()}
                </p>
                <p>
                  <span className="text-muted-foreground">Payment Method:</span> Credit Card
                </p>
                <p>
                  <span className="text-muted-foreground">Expected Shipping:</span> 2-3 business days
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-left space-y-2">
              <h3 className="font-medium">What's Next?</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>You'll receive an order confirmation email shortly</li>
                <li>Sellers will prepare your items for shipping</li>
                <li>You'll be notified when your items are on the way</li>
                <li>Enjoy your sustainable fashion finds!</li>
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2 p-6">
            <Button asChild className="w-full">
              <Link to="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <div className="text-center text-xs text-muted-foreground mt-2">
              <p>
                Have questions?{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
