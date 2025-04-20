
import { Product, User } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-123-4567',
    address: '123 Thrift St, Vintage City, VC 12345',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isSeller: true,
    createdAt: '2023-01-15T08:30:00.000Z',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-987-6543',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isSeller: false,
    createdAt: '2023-02-20T14:45:00.000Z',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '555-456-7890',
    address: '456 Vintage Ave, Retro Town, RT 67890',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isSeller: true,
    createdAt: '2023-03-10T11:15:00.000Z',
  },
];

// Mock products data
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket from the 90s in excellent condition. Perfect for layering in any season.',
    price: 45.99,
    images: [
      'https://images.unsplash.com/photo-1578681994506-b8f463449011',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    ],
    size: 'M',
    brand: 'Levi\'s',
    condition: 'good',
    category: 'outerwear',
    sellerId: '1',
    sellerName: 'Jane Smith',
    sellerAvatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-02-15T09:30:00.000Z',
    updatedAt: '2024-02-15T09:30:00.000Z',
  },
  {
    id: '2',
    title: 'Floral Maxi Dress',
    description: 'Beautiful floral maxi dress, perfect for summer. Has a small hidden pocket on the side.',
    price: 28.50,
    images: [
      'https://images.unsplash.com/photo-1623609163859-ca93c965b8a1',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
    ],
    size: 'S',
    brand: 'Free People',
    condition: 'like new',
    category: 'dresses',
    sellerId: '1',
    sellerName: 'Jane Smith',
    sellerAvatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-02-20T14:45:00.000Z',
    updatedAt: '2024-02-20T14:45:00.000Z',
  },
  {
    id: '3',
    title: 'Cashmere Sweater',
    description: 'Soft and warm cashmere sweater in excellent condition. Minimal pilling.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    ],
    size: 'L',
    brand: 'J.Crew',
    condition: 'good',
    category: 'tops',
    sellerId: '3',
    sellerName: 'Alex Johnson',
    sellerAvatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-02-25T10:15:00.000Z',
    updatedAt: '2024-02-25T10:15:00.000Z',
  },
  {
    id: '4',
    title: 'Vintage High-Waisted Jeans',
    description: 'Classic high-waisted jeans from the 80s. Great fit and super comfortable.',
    price: 34.99,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
    ],
    size: '28',
    brand: 'Wrangler',
    condition: 'good',
    category: 'bottoms',
    sellerId: '3',
    sellerName: 'Alex Johnson',
    sellerAvatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-03-01T16:20:00.000Z',
    updatedAt: '2024-03-01T16:20:00.000Z',
  },
  {
    id: '5',
    title: 'Leather Crossbody Bag',
    description: 'Genuine leather crossbody bag with adjustable strap. Spacious main compartment with inner pockets.',
    price: 52.00,
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e',
    ],
    size: 'One Size',
    brand: 'Coach',
    condition: 'like new',
    category: 'accessories',
    sellerId: '1',
    sellerName: 'Jane Smith',
    sellerAvatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-03-05T11:30:00.000Z',
    updatedAt: '2024-03-05T11:30:00.000Z',
  },
  {
    id: '6',
    title: 'Wool Peacoat',
    description: 'Classic wool peacoat in navy blue. Perfect for fall and winter. Fully lined with functioning pockets.',
    price: 65.99,
    images: [
      'https://images.unsplash.com/photo-1544923408-75c5cef46f14',
    ],
    size: 'M',
    brand: 'Gap',
    condition: 'good',
    category: 'outerwear',
    sellerId: '3',
    sellerName: 'Alex Johnson',
    sellerAvatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-03-10T13:45:00.000Z',
    updatedAt: '2024-03-10T13:45:00.000Z',
  },
  {
    id: '7',
    title: 'Vintage Graphic T-Shirt',
    description: 'Cool vintage band t-shirt from the 90s. Slight fading adds to the vintage look.',
    price: 18.50,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68',
    ],
    size: 'M',
    brand: 'Unknown',
    condition: 'fair',
    category: 'tops',
    sellerId: '1',
    sellerName: 'Jane Smith',
    sellerAvatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-03-15T09:20:00.000Z',
    updatedAt: '2024-03-15T09:20:00.000Z',
  },
  {
    id: '8',
    title: 'Suede Ankle Boots',
    description: 'Gorgeous suede ankle boots with small heel. Only worn a few times, in great condition.',
    price: 42.00,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    ],
    size: '8',
    brand: 'Steve Madden',
    condition: 'like new',
    category: 'shoes',
    sellerId: '3',
    sellerName: 'Alex Johnson',
    sellerAvatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-03-20T15:10:00.000Z',
    updatedAt: '2024-03-20T15:10:00.000Z',
  },
];

// Helper function to get products by filter
export const getFilteredProducts = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  size?: string[];
  brand?: string[];
  sortBy?: string;
  search?: string;
}) => {
  let filtered = [...mockProducts];
  
  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  // Apply price range filter
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(product => product.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice!);
  }
  
  // Apply condition filter
  if (filters.condition && filters.condition.length > 0) {
    filtered = filtered.filter(product => 
      filters.condition!.includes(product.condition as string)
    );
  }
  
  // Apply size filter
  if (filters.size && filters.size.length > 0) {
    filtered = filtered.filter(product => 
      filters.size!.includes(product.size)
    );
  }
  
  // Apply brand filter
  if (filters.brand && filters.brand.length > 0) {
    filtered = filtered.filter(product => 
      filters.brand!.includes(product.brand)
    );
  }
  
  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
  
  return filtered;
};

// Helper function to get a product by ID
export const getProductById = (id: string) => {
  return mockProducts.find(product => product.id === id);
};

// Helper function to get products by seller ID
export const getProductsBySeller = (sellerId: string) => {
  return mockProducts.filter(product => product.sellerId === sellerId);
};

// Mock categories with counts
export const mockCategories = [
  { id: 'tops', name: 'Tops', count: mockProducts.filter(p => p.category === 'tops').length },
  { id: 'bottoms', name: 'Bottoms', count: mockProducts.filter(p => p.category === 'bottoms').length },
  { id: 'dresses', name: 'Dresses', count: mockProducts.filter(p => p.category === 'dresses').length },
  { id: 'outerwear', name: 'Outerwear', count: mockProducts.filter(p => p.category === 'outerwear').length },
  { id: 'accessories', name: 'Accessories', count: mockProducts.filter(p => p.category === 'accessories').length },
  { id: 'shoes', name: 'Shoes', count: mockProducts.filter(p => p.category === 'shoes').length },
];

// Mock available sizes
export const mockSizes = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size',
  '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34',
  '6', '7', '8', '9', '10', '11',
];

// Mock available brands
export const mockBrands = [
  ...new Set(mockProducts.map(p => p.brand))
].sort();

// Mock conditions with display names
export const mockConditions = [
  { value: 'new', label: 'New' },
  { value: 'like new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
];
