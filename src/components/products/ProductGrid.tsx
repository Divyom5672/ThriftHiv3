
import { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  // Show loading skeleton when products are loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-card overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded"></div>
              <div className="h-4 w-1/2 bg-muted rounded"></div>
              <div className="h-8 w-full bg-muted rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show empty state if no products
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="font-medium text-lg">No products found</h3>
        <p className="text-muted-foreground mt-1">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  // Show products grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
