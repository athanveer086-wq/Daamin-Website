import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productAPI } from '../utils/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" data-testid="shop-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-secondary/30" data-testid="shop-hero">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" data-testid="shop-page-title">
              Ayurvedic Medicines & Products
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="shop-page-subtitle">
              Authentic herbal formulations for holistic healing. All products are quality-tested and prepared using traditional methods.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="shop-search-input"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding" data-testid="products-grid-section">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-16" data-testid="products-loading">
              <p className="text-lg text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16" data-testid="no-products">
              <p className="text-lg text-muted-foreground">
                {searchQuery ? 'No products found matching your search' : 'No products available yet. Check back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_30px_rgba(45,80,22,0.15)] transition-all duration-300 group"
                  data-testid={`product-card-${index}`}
                >
                  <Link to={`/shop/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-secondary/20">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-testid={`product-image-${index}`}
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-accent font-medium uppercase" data-testid={`product-category-${index}`}>
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold text-primary mt-1 mb-2" data-testid={`product-name-${index}`}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`product-description-${index}`}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary" data-testid={`product-price-${index}`}>
                          ₹{product.price}
                        </span>
                        <button
                          className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                          data-testid={`product-view-btn-${index}`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;