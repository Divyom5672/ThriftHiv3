
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle proceeding to checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // If not logged in, redirect to login with return path
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    
    // Mock checkout process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout");
    }, 800);
  };
  
  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="mt-6">
              <Link to="/shop">
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-2xl font-serif font-bold md:text-3xl mb-8">Your Cart</h1>
        
        <div className="grid gap-10 md:grid-cols-3">
          {/* Cart items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex space-x-4">
                {/* Product image */}
                <Link to={`/product/${item.productId}`} className="shrink-0">
                  <div className="aspect-square w-24 overflow-hidden rounded-md">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
                
                {/* Product details */}
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <Link to={`/product/${item.productId}`} className="font-medium hover:underline">
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.product.size}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Brand: {item.product.brand}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                        className="h-8 w-12 rounded-none border-x-0 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                    
                    {/* Remove button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                  
                  <Separator className="mt-4" />
                </div>
              </div>
            ))}
            
            {/* Clear cart button */}
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-3">
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
                  
                  {/* Promo code input */}
                  <div className="py-3">
                    <div className="relative">
                      <Input placeholder="Promo code" />
                      <Button 
                        className="absolute right-0 top-0 h-full rounded-l-none"
                        variant="secondary"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={handleCheckout} 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            {/* Secure checkout notice */}
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>Secure checkout powered by Stripe</p>
              <p className="mt-1">Free shipping on all orders</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
