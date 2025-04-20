
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const {
    id,
    title,
    price,
    images,
    size,
    brand,
    condition,
    category,
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

  // Get the first image with fallback
  const imageUrl = images && images.length > 0 
    ? (images[0].startsWith('http') ? images[0] : '/placeholder.svg')
    : '/placeholder.svg';

  return (
    <div className={cn(
      "group flex flex-col rounded-lg border bg-card overflow-hidden transition-all hover:shadow-md",
      className
    )}>
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              // If image fails to load, use placeholder
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <div className="absolute bottom-2 left-2 space-x-1">
          <Badge variant="secondary" className={cn("text-xs", getConditionStyle(condition))}>
            {condition.charAt(0).toUpperCase() + condition.slice(1)}
          </Badge>
        </div>
      </div>
      
      {/* Product info */}
      <div className="flex flex-col p-4">
        <div className="space-y-1 text-sm">
          <h3 className="font-medium line-clamp-1">
            <Link to={`/product/${id}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-base font-bold">{formattedPrice}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {size}
              </Badge>
              {brand && (
                <Badge variant="outline" className="text-xs">
                  {brand}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button asChild variant="default" size="sm" className="w-full">
            <Link to={`/product/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
