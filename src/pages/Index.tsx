import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Tag, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/products/ProductCard";
import { mockProducts } from "@/data/mockData";

const Index = () => {
  // Get featured products (first 4)
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full pt-12 md:pt-24 lg:pt-32 relative">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover Unique Style at <span className="text-primary">ThriftFindsCorner</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find one-of-a-kind pieces that express your personal style while contributing to sustainable fashion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sell">Start Selling</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold tracking-tight sm:text-3xl">
                Featured Finds
              </h2>
              <p className="text-muted-foreground">
                Handpicked treasures from our collection
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link to="/shop">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold tracking-tight sm:text-3xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Join our community of thrift enthusiasts in just a few simple steps
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-medium text-xl">Shop Unique Finds</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore our curated collections of pre-loved fashion pieces
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Tag className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-medium text-xl">Sell Your Items</h3>
                <p className="mt-2 text-muted-foreground">
                  List your pre-loved clothes and accessories in minutes
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-medium text-xl">Join Our Community</h3>
                <p className="mt-2 text-muted-foreground">
                  Connect with other fashion enthusiasts and thrifters
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Sustainable Fashion
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tighter md:text-4xl/tight">
                Ready to give your clothes a second life?
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands who are buying and selling pre-loved fashion. Create your seller account today and start listing your items.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/register">Create Seller Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Sustainable Fashion"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                ThriftFindsCorner Impact
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tighter md:text-4xl/tight">
                Making a Difference Together
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our growing community that's changing the way we think about fashion
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">25k+</div>
              <div className="text-muted-foreground">Items Sold</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">5k+</div>
              <div className="text-muted-foreground">Sellers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">30t+</div>
              <div className="text-muted-foreground">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
