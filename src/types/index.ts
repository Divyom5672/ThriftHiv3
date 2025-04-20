
// Types and interfaces for the thrift marketplace

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  isSeller: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  size: string;
  brand: string;
  condition: 'new' | 'like new' | 'good' | 'fair';
  category: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

export interface ProductFilters {
  category?: string;
  size?: string[];
  brand?: string[];
  condition?: ('new' | 'like new' | 'good' | 'fair')[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
