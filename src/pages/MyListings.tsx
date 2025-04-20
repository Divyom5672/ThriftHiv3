
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getProductsBySeller } from "@/data/mockData";
import { Product } from "@/types";

const MyListings = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [listings, setListings] = useState<Product[]>([]);
  const [soldListings, setSoldListings] = useState<Product[]>([]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login", { state: { from: "/my-listings" } });
    }
  }, [isAuthenticated, user, navigate]);
  
  // Check if user is a seller
  useEffect(() => {
    if (user && !user.isSeller) {
      navigate("/account");
    }
  }, [user, navigate]);
  
  // Load listings
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      
      // In a real app, we would fetch from an API
      // For demo, we'll use mock data
      const userListings = getProductsBySeller(user.id);
      
      // Simulate some sold listings
      const sold = userListings.slice(0, 1); // First item is "sold"
      const active = userListings.slice(1); // Rest are active
      
      setListings(active);
      setSoldListings(sold);
      
      // Simulate loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [user]);
  
  // Handle deleting a listing
  const handleDelete = (productId: string) => {
    // In a real app, we would call an API to delete
    setListings(listings.filter(item => item.id !== productId));
    
    toast({
      title: "Listing deleted",
      description: "Your listing has been successfully deleted.",
    });
  };
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-serif font-bold md:text-3xl">My Listings</h1>
            <p className="text-muted-foreground">
              Manage your listed items
            </p>
          </div>
          
          <Button asChild>
            <Link to="/sell">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Listing
            </Link>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active">
              Active ({listings.length})
            </TabsTrigger>
            <TabsTrigger value="sold">
              Sold ({soldListings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {isLoading ? (
              // Loading skeleton
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="overflow-hidden border-0 shadow-sm animate-pulse">
                    <div className="aspect-square bg-muted" />
                    <CardContent className="p-4">
                      <div className="h-6 w-3/4 bg-muted rounded" />
                      <div className="h-4 w-1/3 bg-muted rounded mt-2" />
                      <div className="h-10 w-full bg-muted rounded mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : listings.length === 0 ? (
              // Empty state
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No active listings</h3>
                <p className="text-muted-foreground mt-1 mb-6">
                  You don't have any active listings yet
                </p>
                <Button asChild>
                  <Link to="/sell">Create Your First Listing</Link>
                </Button>
              </div>
            ) : (
              // Listings grid
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map(item => (
                  <Card key={item.id} className="overflow-hidden border-0 shadow-sm">
                    <Link to={`/product/${item.id}`} className="block">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-medium hover:underline line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-lg font-bold">
                              ${item.price.toFixed(2)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {item.size}
                            </Badge>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <span className="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/edit-listing/${item.id}`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this listing. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          Listed on {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sold">
            {isLoading ? (
              // Loading skeleton
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2].map(i => (
                  <Card key={i} className="overflow-hidden border-0 shadow-sm animate-pulse">
                    <div className="aspect-square bg-muted" />
                    <CardContent className="p-4">
                      <div className="h-6 w-3/4 bg-muted rounded" />
                      <div className="h-4 w-1/3 bg-muted rounded mt-2" />
                      <div className="h-10 w-full bg-muted rounded mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : soldListings.length === 0 ? (
              // Empty state
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No sold items yet</h3>
                <p className="text-muted-foreground mt-1">
                  You haven't sold any items yet
                </p>
              </div>
            ) : (
              // Sold listings grid
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {soldListings.map(item => (
                  <Card key={item.id} className="overflow-hidden border-0 shadow-sm opacity-75">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                        <Badge className="bg-green-600 text-white text-base py-1 px-3">
                          Sold
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-lg font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {item.size}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Sold on {new Date().toLocaleDateString()}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/product/${item.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MyListings;
