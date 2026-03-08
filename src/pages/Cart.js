import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const shippingCharges = getCartTotal() >= 500 ? 0 : 50;
  const total = getCartTotal() + shippingCharges;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen" data-testid="cart-page">
        <Navbar />
        <div className="section-padding pt-32">
          <div className="container-custom text-center py-16">
            <ShoppingBag className="mx-auto text-muted-foreground mb-4" size={64} />
            <h2 className="text-2xl font-bold text-primary mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8">Add some Ayurvedic products to get started!</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Continue Shopping <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="cart-page">
      <Navbar />

      <section className="section-padding pt-32" data-testid="cart-section">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-primary mb-8" data-testid="cart-title">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.product_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(45,80,22,0.08)] flex gap-4"
                  data-testid={`cart-item-${index}`}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    data-testid={`cart-item-image-${index}`}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-1" data-testid={`cart-item-name-${index}`}>{item.name}</h3>
                    <p className="text-xl font-bold text-primary" data-testid={`cart-item-price-${index}`}>₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-red-600 hover:text-red-800"
                      data-testid={`cart-item-remove-${index}`}
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        data-testid={`cart-item-decrease-${index}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium" data-testid={`cart-item-quantity-${index}`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        data-testid={`cart-item-increase-${index}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)] sticky top-32">
                <h3 className="text-xl font-bold text-primary mb-4" data-testid="cart-summary-title">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between" data-testid="cart-subtotal">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between" data-testid="cart-shipping">
                    <span>Shipping</span>
                    <span className="font-medium">{shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}</span>
                  </div>
                  {getCartTotal() < 500 && (
                    <p className="text-sm text-muted-foreground">Add ₹{500 - getCartTotal()} more for free shipping!</p>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg font-bold" data-testid="cart-total">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-3 font-medium transition-all block text-center"
                  data-testid="cart-checkout-btn"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="w-full text-center text-primary hover:text-accent font-medium mt-4 block"
                  data-testid="cart-continue-shopping"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;