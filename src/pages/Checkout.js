import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    shipping_address: '',
    city: '',
    state: '',
    pincode: '',
    payment_method: 'cod'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      const response = await orderAPI.create(orderData);
      clearCart();
      navigate(`/order-success/${response.data.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const shippingCharges = getCartTotal() >= 500 ? 0 : 50;
  const total = getCartTotal() + shippingCharges;

  return (
    <div className="min-h-screen" data-testid="checkout-page">
      <Navbar />

      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8" data-testid="checkout-title">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)]">
              <h2 className="text-2xl font-bold text-primary mb-6">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-input-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-input-pincode"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Full Address *</label>
                  <textarea
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-textarea-address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-input-city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="checkout-input-state"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)]">
              <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.product_id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{getCartTotal()}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}</span></div>
                  <div className="flex justify-between text-lg font-bold mt-2"><span>Total</span><span className="text-primary">₹{total}</span></div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="checkout-select-payment"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI (Pay after order confirmation)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-3 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                data-testid="checkout-submit-btn"
              >
                <Package size={20} /> {loading ? 'Placing Order...' : 'Place Order'}
              </button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                By placing order, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;