
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Upload } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { mockCategories, mockBrands, mockConditions, mockSizes } from "@/data/mockData";
import { useListings } from "@/hooks/useListings";

const CreateListing = () => {
  const { user, isAuthenticated } = useAuth();
  const { createListing } = useListings();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use useEffect for navigation instead of rendering logic
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login", { state: { from: "/sell" } });
    }
  }, [isAuthenticated, user, navigate]);
  
  // Early return if still checking authentication
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Check if user is a seller
  if (!user.isSeller) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Seller Account Required</h1>
            <p className="mb-6 text-muted-foreground">
              You need a seller account to create listings. Please update your account to become a seller.
            </p>
            <Button onClick={() => navigate("/register", { state: { role: "seller" } })}>
              Update Account
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Handle image upload (mock)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...images];
      
      Array.from(e.target.files).forEach(file => {
        // In a real app, we would upload this file to a storage service
        // For demo, we'll create a placeholder URL
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      });
      
      setImages(newImages.slice(0, 5)); // Limit to 5 images
    }
  };
  
  // Remove an image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !description || !price || !category || !size || !brand || !condition) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your item",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting listing with data:", {
        title,
        description,
        price: parseFloat(price),
        category,
        size,
        brand,
        condition,
        images,
      });
      
      await createListing.mutateAsync({
        title,
        description,
        price: parseFloat(price),
        category,
        size,
        brand,
        condition: condition as 'new' | 'like new' | 'good' | 'fair',
        images,
      });
      
      navigate("/my-listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({
        title: "Failed to create listing",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Use our local state for loading indicator instead of accessing it from createListing
  const isLoading = isSubmitting || createListing.isPending;
  
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-2xl font-serif font-bold md:text-3xl mb-8">Create a Listing</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image upload section */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Upload Images</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Add up to 5 photos of your item. The first image will be the cover photo.
                </p>
                
                {/* Display uploaded images */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Product ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <span className="sr-only">Remove</span>
                        ✕
                      </Button>
                    </div>
                  ))}
                  
                  {/* Image upload button (only if < 5 images) */}
                  {images.length < 5 && (
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/30 hover:bg-muted transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="mt-2 text-sm text-muted-foreground">
                        Upload Image
                      </span>
                      <Input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </label>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPEG, PNG, GIF. Maximum file size: 5MB.
                </p>
              </CardContent>
            </Card>
            
            {/* Pricing and details */}
            <Card className="border-0 shadow-sm mt-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Pricing and Details</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="29.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">Size</Label>
                      <Select
                        value={size}
                        onValueChange={setSize}
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSizes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={condition}
                        onValueChange={setCondition}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockConditions.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select
                      value={brand}
                      onValueChange={setBrand}
                    >
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="other">Other</SelectItem>
                        {mockBrands.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Item description section */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Item Description</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage 90s Levi's Denim Jacket"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {title.length}/100
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail: condition, size, material, etc."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={8}
                      maxLength={1000}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {description.length}/1000
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Tips for a Great Listing</h3>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                      <li>Include relevant details like size, material, and color</li>
                      <li>Mention any flaws or imperfections</li>
                      <li>Provide measurements if applicable</li>
                      <li>Describe the style and how the item can be worn</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Listing..." : "Create Listing"}
                      {!isLoading && <PlusCircle className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Seller guidelines */}
            <Card className="border-0 shadow-sm mt-6 bg-muted/50">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-2">Seller Guidelines</h2>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>
                    Thank you for selling on ThriftFindsCorner! Please ensure your listing follows our community guidelines:
                  </p>
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>Use clear, well-lit photos that accurately represent your item</li>
                    <li>Describe any flaws or imperfections honestly</li>
                    <li>Set fair and competitive prices</li>
                    <li>Respond to buyer inquiries promptly</li>
                    <li>Ship items within 2 business days of purchase</li>
                  </ul>
                  <p>
                    Non-compliant listings may be removed. Read our full
                    seller policy for more information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateListing;
