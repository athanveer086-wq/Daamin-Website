import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orderAPI } from '../../utils/api';

const AdminOrders = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, order_status, payment_status = null) => {
    try {
      await orderAPI.updateStatus(id, order_status, payment_status);
      loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png" alt="Logo" className="h-12 w-auto object-contain" style={{ maxWidth: '180px' }} />
            <div>
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <Link to="/admin" className="py-4 text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/admin/bookings" className="py-4 text-muted-foreground hover:text-primary transition-colors">Bookings</Link>
            <Link to="/admin/products" className="py-4 text-muted-foreground hover:text-primary transition-colors">Products</Link>
            <Link to="/admin/orders" className="py-4 border-b-2 border-primary text-primary font-medium">Orders</Link>
            <Link to="/admin/finance" className="py-4 text-muted-foreground hover:text-primary transition-colors">Finance</Link>
            <Link to="/admin/blog" className="py-4 text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link to="/admin/settings" className="py-4 text-muted-foreground hover:text-primary transition-colors">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors">View Website</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Manage Orders</h2>

        {loading ? (
          <div className="text-center py-16"><p>Loading orders...</p></div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center"><p>No orders yet</p></div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Address</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id} className="border-b hover:bg-secondary/20">
                      <td className="py-3 px-4">#{order.id.slice(0, 8)}</td>
                      <td className="py-3 px-4">{order.customer_name}</td>
                      <td className="py-3 px-4 text-sm">{order.email}<br/>{order.phone}</td>
                      <td className="py-3 px-4 text-sm max-w-xs">{order.shipping_address}, {order.city}</td>
                      <td className="py-3 px-4">{order.items.length}</td>
                      <td className="py-3 px-4 font-bold">₹{order.total}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.order_status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        {order.payment_status !== 'paid' && (
                          <button
                            onClick={() => updateStatus(order.id, order.order_status, 'paid')}
                            className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;
