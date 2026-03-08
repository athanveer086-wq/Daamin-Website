import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { orderAPI } from '../utils/api';

const MyOrders = () => {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await orderAPI.getCustomerOrders(email);
      setOrders(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">My Orders</h1>
          
          <form onSubmit={handleSearch} className="mb-8 flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to view orders"
              className="flex-1 px-4 py-3 border border-border rounded-md"
              required
            />
            <button type="submit" className="btn-primary">Search Orders</button>
          </form>

          {searched && orders.length === 0 && (
            <div className="text-center py-16">
              <Package className="mx-auto text-muted-foreground mb-4" size={64} />
              <p className="text-lg text-muted-foreground">No orders found for this email</p>
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-primary">Order #{order.id.slice(0, 8)}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{order.total}</p>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        order.order_status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.order_status}
                      </span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm"><strong>Items:</strong> {order.items.length} product(s)</p>
                    <p className="text-sm"><strong>Payment:</strong> {order.payment_method === 'cod' ? 'Cash on Delivery' : 'UPI'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
