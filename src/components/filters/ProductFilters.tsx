
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductFilters as FiltersType } from "@/types";
import { mockBrands, mockCategories, mockConditions, mockSizes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
  onReset: () => void;
}

const ProductFilters = ({
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) => {
  // Price range
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 100,
  ]);

  // Handle price change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    onFilterChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  // Handle size change
  const handleSizeChange = (size: string) => {
    const currentSizes = filters.size || [];
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    onFilterChange({
      ...filters,
      size: updatedSizes,
    });
  };

  // Handle brand change
  const handleBrandChange = (brand: string) => {
    const currentBrands = filters.brand || [];
    const updatedBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];

    onFilterChange({
      ...filters,
      brand: updatedBrands,
    });
  };

  // Handle condition change
  const handleConditionChange = (condition: string) => {
    const currentConditions = filters.condition || [];
    const updatedConditions = currentConditions.includes(condition as any)
      ? currentConditions.filter((c) => c !== condition)
      : [...currentConditions, condition as 'new' | 'like new' | 'good' | 'fair'];

    onFilterChange({
      ...filters,
      condition: updatedConditions,
    });
  };

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: event.target.value,
    });
  };

  // Handle reset
  const handleReset = () => {
    setPriceRange([0, 100]);
    onReset();
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.size && filters.size.length > 0) count++;
    if (filters.brand && filters.brand.length > 0) count++;
    if (filters.condition && filters.condition.length > 0) count++;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
    if (filters.search && filters.search.trim().length > 0) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10"
          value={filters.search || ""}
          onChange={handleSearchChange}
        />
      </div>

      {/* Mobile filters */}
      <div className="flex justify-between md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {countActiveFilters() > 0 && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                  {countActiveFilters()}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Categories */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Categories</h3>
                <div className="space-y-2">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={filters.category === category.id}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`mobile-category-${category.id}`} className="cursor-pointer">
                        {category.name} ({category.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Price Range</h3>
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  max={100}
                  step={1}
                  onValueChange={handlePriceChange}
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Conditions */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Condition</h3>
                <div className="space-y-2">
                  {mockConditions.map((condition) => (
                    <div key={condition.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-condition-${condition.value}`}
                        checked={filters.condition?.includes(condition.value as any)}
                        onCheckedChange={() => handleConditionChange(condition.value)}
                      />
                      <Label htmlFor={`mobile-condition-${condition.value}`} className="cursor-pointer">
                        {condition.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sizes */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {mockSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-size-${size}`}
                        checked={filters.size?.includes(size)}
                        onCheckedChange={() => handleSizeChange(size)}
                      />
                      <Label htmlFor={`mobile-size-${size}`} className="cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brands */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {mockBrands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-brand-${brand}`}
                        checked={filters.brand?.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={`mobile-brand-${brand}`} className="cursor-pointer">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <SheetFooter>
              <div className="flex space-x-2 w-full">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  Reset
                </Button>
                <SheetClose asChild>
                  <Button className="flex-1">Apply</Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* Active filters indicator and reset */}
        {countActiveFilters() > 0 && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
            Clear filters <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Filters</h2>
          {countActiveFilters() > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
              Clear all <X className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {/* Categories accordion */}
          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.category === category.id}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.name} ({category.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Price Range accordion */}
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 px-1">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={100}
                    step={1}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Condition accordion */}
            <AccordionItem value="condition">
              <AccordionTrigger>Condition</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {mockConditions.map((condition) => (
                    <div key={condition.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`condition-${condition.value}`}
                        checked={filters.condition?.includes(condition.value as any)}
                        onCheckedChange={() => handleConditionChange(condition.value)}
                      />
                      <Label htmlFor={`condition-${condition.value}`} className="cursor-pointer">
                        {condition.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Size accordion */}
            <AccordionItem value="size">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                  {mockSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={filters.size?.includes(size)}
                        onCheckedChange={() => handleSizeChange(size)}
                      />
                      <Label htmlFor={`size-${size}`} className="cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Brand accordion */}
            <AccordionItem value="brand">
              <AccordionTrigger>Brand</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {mockBrands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brand?.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
