
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MapPin, 
  ShoppingCart, 
  Star, 
  Truck 
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { getProductById, mockProducts } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(getProductById(id || ""));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get related products (same category, excluding current)
  const relatedProducts = product 
    ? mockProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Handle product not found
  useEffect(() => {
    if (!isLoading && !product) {
      navigate("/not-found");
    }
  }, [product, isLoading, navigate]);
  
  if (isLoading || !product) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted w-1/3 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-10 bg-muted w-2/3 rounded"></div>
                <div className="h-6 bg-muted w-1/4 rounded"></div>
                <div className="h-4 bg-muted w-full rounded"></div>
                <div className="h-4 bg-muted w-full rounded"></div>
                <div className="h-4 bg-muted w-3/4 rounded"></div>
                <div className="h-12 bg-muted w-full rounded mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Extract product details
  const {
    title,
    description,
    price,
    images,
    size,
    brand,
    condition,
    category,
    sellerId,
    sellerName,
    sellerAvatar,
    createdAt,
  } = product;
  
  // Get condition display style
  const getConditionStyle = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'like new':
        return 'bg-emerald-100 text-emerald-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${title} has been added to your cart.`,
    });
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/shop" className="hover:underline">Shop</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to={`/shop?category=${category}`} className="hover:underline capitalize">
              {category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="truncate max-w-[150px] sm:max-w-xs">{title}</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product images */}
          <div className="space-y-4">
            <Carousel>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${title} - view ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-20 h-20 rounded-md overflow-hidden border-2",
                      currentImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-2xl font-bold">{formattedPrice}</span>
                <Badge variant="secondary" className={cn("ml-2", getConditionStyle(condition))}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </Badge>
              </div>
            </div>
            
            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Ships from Los Angeles</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Free shipping</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Size:</span>
                <Badge variant="outline">{size}</Badge>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Brand:</span>
                <Badge variant="outline">{brand}</Badge>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Listed date */}
            <div className="text-sm text-muted-foreground">
              Listed on {formattedDate}
            </div>
            
            <Separator />
            
            {/* Seller info */}
            <div>
              <h3 className="font-medium mb-2">Seller</h3>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={sellerAvatar} alt={sellerName} />
                  <AvatarFallback>{sellerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{sellerName}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3" />
                    </div>
                    <span className="ml-1">(20 reviews)</span>
                  </div>
                </div>
                <Button variant="secondary" asChild size="sm" className="ml-auto">
                  <Link to={`/seller/${sellerId}`}>View Profile</Link>
                </Button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Shipping & Returns</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Orders ship within 2-3 business days</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Free standard shipping on all orders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Returns accepted within 14 days of delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold">You might also like</h2>
              <Button asChild variant="ghost" className="gap-1">
                <Link to={`/shop?category=${category}`}>
                  View more <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <Card key={product.id} className="border-0 shadow-sm overflow-hidden">
                  <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm font-medium hover:underline line-clamp-1"
                    >
                      {product.title}
                    </Link>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {product.size}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
