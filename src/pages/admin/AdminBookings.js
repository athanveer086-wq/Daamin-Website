import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI } from '../../utils/api';

const AdminBookings = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getAll();
      setBookings(response.data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await bookingAPI.updateStatus(id, status);
      loadBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30" data-testid="admin-bookings-page">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png" alt="Logo" className="h-12 w-auto object-contain" style={{ maxWidth: '180px' }} />
            <div>
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-primary hover:text-accent transition-colors" data-testid="admin-logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <Link to="/admin" className="py-4 text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/admin/bookings" className="py-4 border-b-2 border-primary text-primary font-medium" data-testid="admin-nav-bookings">Bookings</Link>
            <Link to="/admin/products" className="py-4 text-muted-foreground hover:text-primary transition-colors">Products</Link>
            <Link to="/admin/finance" className="py-4 text-muted-foreground hover:text-primary transition-colors">Finance</Link>
            <Link to="/admin/blog" className="py-4 text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link to="/admin/settings" className="py-4 text-muted-foreground hover:text-primary transition-colors">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors">View Website</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6" data-testid="bookings-title">Manage Bookings</h2>

        {loading ? (
          <div className="text-center py-16"><p className="text-lg text-muted-foreground">Loading bookings...</p></div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center"><p className="text-muted-foreground">No bookings yet</p></div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Doctor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Symptoms</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking.id} className="border-b hover:bg-secondary/20" data-testid={`booking-row-${index}`}>
                      <td className="py-3 px-4">{booking.patient_name}</td>
                      <td className="py-3 px-4 text-sm">{booking.email}<br/>{booking.phone}</td>
                      <td className="py-3 px-4">{booking.doctor_preference}</td>
                      <td className="py-3 px-4 text-sm">{booking.consultation_type}</td>
                      <td className="py-3 px-4">{booking.preferred_date || 'Not specified'}</td>
                      <td className="py-3 px-4 text-sm max-w-xs truncate">{booking.symptoms || 'None'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>{booking.status}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <button onClick={() => updateStatus(booking.id, 'confirmed')} className="p-1 text-green-600 hover:text-green-800" data-testid={`booking-confirm-${index}`} title="Confirm">
                              <CheckCircle size={20} />
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button onClick={() => updateStatus(booking.id, 'cancelled')} className="p-1 text-red-600 hover:text-red-800" data-testid={`booking-cancel-${index}`} title="Cancel">
                              <XCircle size={20} />
                            </button>
                          )}
                        </div>
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

export default AdminBookings;