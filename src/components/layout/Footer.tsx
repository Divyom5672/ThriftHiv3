import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="border-t bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and tagline */}
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-primary tracking-tight">ThriftHiv3</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Find unique preloved fashion pieces at affordable prices while contributing to sustainable fashion.
            </p>
          </div>
          
          {/* Shop Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop?category=tops" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bottoms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dresses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=outerwear" className="text-muted-foreground hover:text-foreground transition-colors">
                  Outerwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social and Newsletter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors">
                <Instagram size={16} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors">
                <Facebook size={16} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors">
                <Twitter size={16} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Stay up to date with the latest thrift finds</p>
              <form className="flex space-x-2">
                <input type="email" placeholder="Your email" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} ThriftFindsCorner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;