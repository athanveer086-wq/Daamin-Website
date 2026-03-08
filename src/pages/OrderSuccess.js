import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { orderAPI } from '../utils/api';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const response = await orderAPI.getAll();
      const foundOrder = response.data.find(o => o.id === orderId);
      setOrder(foundOrder);
    } catch (error) {
      console.error('Error loading order:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="section-padding pt-32">
        <div className="container-custom max-w-2xl text-center">
          <CheckCircle className="mx-auto text-green-600 mb-6" size={80} />
          <h1 className="text-4xl font-bold text-primary mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order. We'll contact you shortly on WhatsApp/Email for confirmation.
          </p>
          {order && (
            <div className="bg-white rounded-xl p-6 shadow-md mb-8 text-left">
              <h3 className="font-bold text-primary mb-2">Order ID: {order.id}</h3>
              <p>Total: ₹{order.total}</p>
              <p>Status: <span className="capitalize">{order.order_status}</span></p>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <Link to="/shop" className="btn-primary">Continue Shopping</Link>
            <Link to="/my-orders" className="btn-secondary">View Orders</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
