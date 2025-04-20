import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/filters/ProductFilters";
import { useListings } from "@/hooks/useListings";
import { ProductFilters as FiltersType, SortOption } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { listings, isLoading } = useListings();
  
  // Initialize filters from URL params
  const initialFilters: FiltersType = {
    category: searchParams.get("category") || undefined,
    search: searchParams.get("search") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    condition: searchParams.getAll("condition") as any[] || undefined,
    size: searchParams.getAll("size") || undefined,
    brand: searchParams.getAll("brand") || undefined,
  };
  
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sortBy") as SortOption) || "newest"
  );
  
  // Update URL params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filters.category) newSearchParams.set("category", filters.category);
    if (filters.search) newSearchParams.set("search", filters.search);
    if (filters.minPrice !== undefined) newSearchParams.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) newSearchParams.set("maxPrice", filters.maxPrice.toString());
    if (sortBy) newSearchParams.set("sortBy", sortBy);
    
    // Handle arrays
    if (filters.condition && filters.condition.length > 0) {
      filters.condition.forEach((condition) => {
        newSearchParams.append("condition", condition);
      });
    }
    
    if (filters.size && filters.size.length > 0) {
      filters.size.forEach((size) => {
        newSearchParams.append("size", size);
      });
    }
    
    if (filters.brand && filters.brand.length > 0) {
      filters.brand.forEach((brand) => {
        newSearchParams.append("brand", brand);
      });
    }
    
    setSearchParams(newSearchParams);
  }, [filters, sortBy, setSearchParams]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };
  
  // Handle sort changes
  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({});
    setSortBy("newest");
  };
  
  // Get filtered products
  const filteredProducts = listings.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;
    if (filters.condition && filters.condition.length > 0 && 
        !filters.condition.includes(product.condition)) return false;
    if (filters.size && filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Debugging
  console.log("All listings:", listings);
  console.log("Filtered products:", filteredProducts);
  console.log("Sorted products:", sortedProducts);
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-2xl font-serif font-bold md:text-3xl">Shop</h1>
            <p className="text-muted-foreground">
              Find your perfect pre-loved item from our curated collection
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
              />
            </div>
            
            <div className="flex-1">
              {/* Mobile filters */}
              <div className="md:hidden mb-6">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </div>
              
              {/* Sort and results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? "Loading..." : `${sortedProducts.length} results`}
                </p>
                
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Sort by:</p>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Products grid */}
              <ProductGrid products={sortedProducts} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;
