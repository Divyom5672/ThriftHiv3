
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, CreditCard } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock order completion 
  const completeOrder = () => {
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      clearCart();
      navigate("/order-success");
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for shopping with ThriftFindsCorner.",
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-2xl font-serif font-bold md:text-3xl mb-8">Checkout</h1>
        
        <div className="grid gap-10 md:grid-cols-3">
          {/* Checkout form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last name" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="Street address" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="ZIP code" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="Country" defaultValue="United States" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Phone number" required />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input id="nameOnCard" placeholder="Name as it appears on card" required />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order summary */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {/* Order items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex justify-between">
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} x ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Order totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={completeOrder} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing Order..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" /> Complete Purchase
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Secure checkout notice */}
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>Secure checkout powered by Stripe</p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <Check className="h-3 w-3 text-green-600" />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
