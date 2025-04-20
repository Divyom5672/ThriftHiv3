
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Type for database clothing listings
type DbClothingListing = {
  id: string;
  brand: string | null;
  condition: string | null;
  created_at: string;
  description: string | null;
  images: string[];
  is_available: boolean | null;
  price: number;
  seller_id: string;
  size: string | null;
  title: string;
  type: "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories" | "other";
  updated_at: string;
};

// Function to map database record to Product type
const mapDbToProduct = (item: DbClothingListing): Product => {
  // Ensure images array is valid, if not provide a placeholder
  let productImages = [];
  
  if (Array.isArray(item.images) && item.images.length > 0) {
    productImages = item.images;
  } else {
    productImages = ['/placeholder.svg'];
  }
  
  return {
    id: item.id,
    title: item.title,
    description: item.description || "",
    price: item.price,
    images: productImages,
    size: item.size || "",
    brand: item.brand || "",
    condition: (item.condition as "new" | "like new" | "good" | "fair") || "good",
    category: item.type, // Map 'type' from DB to 'category' in Product
    sellerId: item.seller_id,
    sellerName: "Seller", // We'll update this when we implement seller profiles
    sellerAvatar: undefined,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
};

export const useListings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch all listings
  const { data: dbListings = [], isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      try {
        console.log("Fetching listings from Supabase...");
        const { data, error } = await supabase
          .from('clothing_listings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        console.log("Supabase data:", data);
        
        if (!data || data.length === 0) {
          console.log("No data from Supabase, returning mock listings");
          return getMockListings();
        }
        
        return data as DbClothingListing[];
      } catch (error) {
        console.log("Error fetching listings:", error);
        return getMockListings();
      }
    },
  });

  // Map DB listings to Product type
  const listings = dbListings.map(mapDbToProduct);

  // Create a new listing - fixed for mock authentication
  const createListing = useMutation({
    mutationFn: async (listing: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'sellerId' | 'sellerName' | 'sellerAvatar'>) => {
      if (!user) {
        throw new Error("You must be logged in to create a listing");
      }

      console.log("Creating listing for user:", user.id);
      
      // Use a mock UUID for development with mock auth
      // In a real app with Supabase Auth, user.id would already be a UUID
      // This is a temporary solution until real auth is implemented
      const sellerId = user.id.length < 36 ? "00000000-0000-0000-0000-000000000000" : user.id;
      console.log("Using seller ID:", sellerId);
      
      // Ensure type is one of the allowed values
      const validType = validateClothingType(listing.category);
      console.log("Using validated clothing type:", validType);

      // Log the data we're about to send to Supabase for debugging
      console.log("Attempting to insert listing with data:", {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        type: validType,
        brand: listing.brand,
        size: listing.size,
        condition: listing.condition,
        images: listing.images,
        is_available: true,
        seller_id: sellerId
      });

      try {
        const { data, error } = await supabase
          .from('clothing_listings')
          .insert({
            title: listing.title,
            description: listing.description,
            price: listing.price,
            type: validType,
            brand: listing.brand,
            size: listing.size,
            condition: listing.condition,
            images: listing.images,
            is_available: true,
            seller_id: sellerId // Use the properly formatted UUID
          })
          .select()
          .single();

        if (error) {
          console.error("Supabase error creating listing:", error);
          // Provide more detailed error message for RLS policy violations
          if (error.code === '42501' || error.message.includes('policy')) {
            throw new Error(`Row-level security policy violation: ${error.message}. This usually happens when you don't have permission to insert data or when the seller_id doesn't match the authenticated user.`);
          }
          throw new Error(error.message || "Failed to create listing");
        }
        
        console.log("Listing created successfully:", data);
        return data;
      } catch (error) {
        console.error("Error in createListing:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast({
        title: "Success!",
        description: "Your listing has been created.",
      });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create listing",
        variant: "destructive",
      });
    },
  });

  return {
    listings,
    isLoading,
    createListing,
  };
};

// Helper function to validate clothing type
const validateClothingType = (category: string): "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories" | "other" => {
  const validTypes = ["tops", "bottoms", "dresses", "outerwear", "shoes", "accessories", "other"];
  
  if (validTypes.includes(category)) {
    return category as "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories" | "other";
  }
  
  console.warn(`Invalid clothing type: ${category}. Defaulting to "other".`);
  return "other";
};

// Helper function to get mock listings with more realistic images
const getMockListings = (): DbClothingListing[] => {
  // Sample image URLs that work well for clothing items
  const sampleImages = [
    '/placeholder.svg',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f',
    'https://images.unsplash.com/photo-1577538928305-3807c3993047',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
  ];
  
  return [
    {
      id: '1',
      title: 'Vintage Levi\'s 501 Jeans',
      description: 'Classic straight fit denim in excellent condition',
      price: 89.99,
      type: 'bottoms',
      brand: 'Levi\'s',
      size: '32x34',
      condition: 'good',
      images: [sampleImages[1]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Nike Air Max Sneakers',
      description: 'Barely worn, great condition sneakers',
      price: 120.00,
      type: 'shoes',
      brand: 'Nike',
      size: '10',
      condition: 'like new',
      images: [sampleImages[2]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Cashmere Sweater',
      description: 'Luxurious pure cashmere sweater',
      price: 150.00,
      type: 'tops',
      brand: 'Ralph Lauren',
      size: 'M',
      condition: 'good',
      images: [sampleImages[3]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Leather Crossbody Bag',
      description: 'Genuine leather bag with adjustable strap',
      price: 75.00,
      type: 'accessories',
      brand: 'Coach',
      size: 'One Size',
      condition: 'good',
      images: [sampleImages[4]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Summer Floral Dress',
      description: 'Light and breezy floral print dress',
      price: 45.00,
      type: 'dresses',
      brand: 'Zara',
      size: 'S',
      condition: 'like new',
      images: [sampleImages[5]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Denim Jacket',
      description: 'Classic denim jacket with brass buttons',
      price: 65.00,
      type: 'outerwear',
      brand: 'Gap',
      size: 'L',
      condition: 'good',
      images: [sampleImages[0]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '7',
      title: 'Vintage Graphic T-Shirt',
      description: 'Rare band t-shirt from the 90s tour',
      price: 35.00,
      type: 'tops',
      brand: 'Band Merch',
      size: 'L',
      condition: 'good',
      images: [sampleImages[1]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '8',
      title: 'Designer Sunglasses',
      description: 'Authentic designer sunglasses with case',
      price: 95.00,
      type: 'accessories',
      brand: 'Ray-Ban',
      size: 'One Size',
      condition: 'like new',
      images: [sampleImages[2]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '9',
      title: 'Leather Ankle Boots',
      description: 'Genuine leather boots with minimal wear',
      price: 78.50,
      type: 'shoes',
      brand: 'Steve Madden',
      size: '8',
      condition: 'good',
      images: [sampleImages[3]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '10',
      title: 'Winter Parka with Fur Hood',
      description: 'Warm winter coat with faux fur trim',
      price: 125.00,
      type: 'outerwear',
      brand: 'North Face',
      size: 'M',
      condition: 'like new',
      images: [sampleImages[4]],
      is_available: true,
      seller_id: '123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};
