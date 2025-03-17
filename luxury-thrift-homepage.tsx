import React from 'react';

const LuxuryThriftHomepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-yellow-400"></div>
            <span className="text-xl font-bold">LUXEFLIP</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-yellow-400 font-medium">HOME</a>
            <a href="#" className="hover:text-yellow-400 font-medium">SHOP</a>
            <a href="#" className="hover:text-yellow-400 font-medium">BRANDS</a>
            <a href="#" className="hover:text-yellow-400 font-medium">CATEGORIES</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm w-40"
              />
            </div>
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-xl">🛒</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden">
          <div className="md:w-1/2 bg-yellow-400 p-8 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">LUXURY BRANDS</h1>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">AT THRIFT PRICES</h1>
            <p className="mb-6 text-black">Authenticated designer items up to 70% off retail</p>
            <button className="bg-black text-white px-6 py-3 rounded-full w-40 hover:bg-gray-800 transition">
              SHOP NOW
            </button>
          </div>
          <div className="md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/400/320" alt="Luxury bags collection" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Bags', 'Clothing', 'Watches', 'Jewelry'].map((category) => (
            <div key={category} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-bold text-lg">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">NEW ARRIVALS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill().map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <img src="/api/placeholder/300/240" alt="Product" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-600">CHANEL</span>
                  <span className="text-sm text-gray-500">Very Good</span>
                </div>
                <h3 className="font-bold truncate">Classic Flap Bag</h3>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="font-bold text-lg">$2,450</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$4,900</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Brands */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">FEATURED BRANDS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Chanel', 'Louis Vuitton', 'Gucci', 'Prada'].map((brand) => (
            <div key={brand} className="bg-white border border-gray-200 rounded-lg flex items-center justify-center p-8">
              <h3 className="font-bold text-xl text-gray-800">{brand}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">WHY CHOOSE LUXEFLIP</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full mb-4 flex items-center justify-center text-2xl">✓</div>
            <h3 className="font-bold text-lg mb-2">Authenticity Guaranteed</h3>
            <p className="text-gray-600">Every item is authenticated by our expert team</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full mb-4 flex items-center justify-center text-2xl">🔍</div>
            <h3 className="font-bold text-lg mb-2">Quality Inspected</h3>
            <p className="text-gray-600">Our team carefully inspects each item's condition</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full mb-4 flex items-center justify-center text-2xl">💰</div>
            <h3 className="font-bold text-lg mb-2">Competitive Pricing</h3>
            <p className="text-gray-600">Get luxury items at a fraction of retail price</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">LUXEFLIP</h3>
              <p className="text-gray-400">The premier marketplace for authenticated luxury goods at thrift prices.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">SHOP</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400">New Arrivals</a></li>
                <li><a href="#" className="hover:text-yellow-400">Best Sellers</a></li>
                <li><a href="#" className="hover:text-yellow-400">Brands</a></li>
                <li><a href="#" className="hover:text-yellow-400">Categories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">ACCOUNT</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400">My Account</a></li>
                <li><a href="#" className="hover:text-yellow-400">Orders</a></li>
                <li><a href="#" className="hover:text-yellow-400">Wishlist</a></li>
                <li><a href="#" className="hover:text-yellow-400">Sell with Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">STAY CONNECTED</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400">
                  f
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400">
                  in
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400">
                  ig
                </a>
              </div>
              <div>
                <p className="text-gray-400">Subscribe to our newsletter</p>
                <div className="flex mt-2">
                  <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg bg-gray-800 text-white w-full" />
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-bold">→</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 LUXEFLIP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuxuryThriftHomepage;
