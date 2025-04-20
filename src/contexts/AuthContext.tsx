
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

// Default context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUserProfile: async () => {},
});

// Mock user data - in a real app, this would come from an API/database
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-123-4567',
    address: '123 Thrift St, Vintage City, VC 12345',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isSeller: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-987-6543',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isSeller: false,
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('thrift_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    // Simulate network delay
    setTimeout(checkAuth, 500);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login process
    // In a real app, this would make an API call to authenticate
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('thrift_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };
  
  const register = async (userData: Partial<User>, password: string) => {
    // Mock registration process
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userData.name || 'Anonymous User',
      email: userData.email || '',
      phone: userData.phone,
      address: userData.address,
      avatar: userData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      isSeller: userData.isSeller || false,
      createdAt: new Date().toISOString(),
    };
    
    // Add user to our mock database
    MOCK_USERS.push(newUser);
    
    // Login the user
    setUser(newUser);
    localStorage.setItem('thrift_user', JSON.stringify(newUser));
    
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('thrift_user');
  };
  
  const updateUserProfile = async (userData: Partial<User>) => {
    // Mock profile update
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('thrift_user', JSON.stringify(updatedUser));
      
      // Update in our mock database
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = updatedUser;
      }
    }
    
    setIsLoading(false);
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
