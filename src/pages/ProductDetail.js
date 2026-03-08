import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Package, Leaf, Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productAPI } from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const response = await productAPI.getOne(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Product not found</p>
          <Link to="/shop" className="text-primary hover:text-accent font-medium">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="section-padding pt-32">
        <div className="container-custom">
          <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium mb-8">
            <ArrowLeft size={20} /> Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <img src={product.image_url} alt={product.name} className="w-full rounded-2xl shadow-xl" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <span className="text-sm text-accent font-medium uppercase">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-6">₹{product.price}</p>

              <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  <Package size={20} /> Product Description
                </h3>
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
              </div>

              <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  <Leaf size={20} /> Ingredients
                </h3>
                <p className="text-foreground/80">{product.ingredients}</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-medium transition-all inline-flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} /> Add to Cart
              </button>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-foreground/80">
                  🚚 Free shipping on orders above ₹500 | ✅ Cash on Delivery available
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
