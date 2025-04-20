import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Mock cart count - this would be managed by a cart context in a real app
  const cartItemCount = 2;
  // Mock authentication state - this would be managed by an auth context
  const isAuthenticated = false;
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-serif font-semibold text-primary tracking-tight">ThriftHiv3</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Categories <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/shop?category=tops">Tops</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?category=bottoms">Bottoms</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?category=dresses">Dresses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?category=outerwear">Outerwear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?category=accessories">Accessories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/sell" className="text-sm font-medium hover:text-primary transition-colors">
            Sell
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        {/* Search, Cart, and User Actions */}
        <div className="flex items-center gap-4">
          {/* Search (desktop) */}
          <form className="hidden md:flex relative w-full max-w-sm items-center">
            <Input type="search" placeholder="Search items..." className="rounded-full pr-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 rounded-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          
          {/* Cart */}
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  {cartItemCount}
                </Badge>}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          
          {/* User/Account */}
          {isAuthenticated ? <Button asChild variant="ghost" size="icon">
              <Link to="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button> : <Button asChild variant="ghost" size="sm">
              <Link to="/login">Login</Link>
            </Button>}
          
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetClose className="absolute right-4 top-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
              <div className="grid gap-6 py-6">
                <div className="space-y-3">
                  <h2 className="text-sm font-medium">
                    Navigation
                  </h2>
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    <Link to="/" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Home
                    </Link>
                    <Link to="/shop" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Shop
                    </Link>
                    <Link to="/sell" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Sell
                    </Link>
                    <Link to="/about" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                    {!isAuthenticated && <Link to="/login" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                        Login / Register
                      </Link>}
                    {isAuthenticated && <>
                        <Link to="/account" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                          My Account
                        </Link>
                        <Link to="/my-listings" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                          My Listings
                        </Link>
                      </>}
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-sm font-medium">
                    Categories
                  </h2>
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    <Link to="/shop?category=tops" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Tops
                    </Link>
                    <Link to="/shop?category=bottoms" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Bottoms
                    </Link>
                    <Link to="/shop?category=dresses" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Dresses
                    </Link>
                    <Link to="/shop?category=outerwear" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Outerwear
                    </Link>
                    <Link to="/shop?category=accessories" className="flex w-full items-center py-2 text-muted-foreground hover:text-foreground">
                      Accessories
                    </Link>
                  </div>
                </div>
                {/* Mobile Search */}
                <div className="space-y-3">
                  <h2 className="text-sm font-medium">
                    Search
                  </h2>
                  <form className="relative">
                    <Input type="search" placeholder="Search items..." className="rounded-full pr-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 rounded-full">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </form>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};
export default Navbar;