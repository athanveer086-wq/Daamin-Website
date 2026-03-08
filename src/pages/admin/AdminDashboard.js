import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, BookOpen, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dashboardAPI } from '../../utils/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Bookings', value: stats?.total_bookings || 0, icon: Calendar, color: 'bg-primary' },
    { title: 'Pending Bookings', value: stats?.pending_bookings || 0, icon: Users, color: 'bg-accent' },
    { title: 'Total Products', value: stats?.total_products || 0, icon: Package, color: 'bg-primary' },
    { title: 'Blog Posts', value: stats?.total_blog_posts || 0, icon: BookOpen, color: 'bg-accent' }
  ];

  return (
    <div className="min-h-screen bg-secondary/30" data-testid="admin-dashboard-page">
      {/* Header */}
      <header className="bg-white shadow-sm" data-testid="admin-header">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png"
              alt="Daamin Ayurveda Logo"
              className="h-12 w-auto object-contain" style={{ maxWidth: '180px' }}
              data-testid="admin-dashboard-logo"
            />
            <div>
              <h1 className="text-xl font-bold text-primary" data-testid="admin-dashboard-title">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground" data-testid="admin-dashboard-welcome">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
            data-testid="admin-logout-btn"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b" data-testid="admin-nav">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <Link to="/admin" className="py-4 border-b-2 border-primary text-primary font-medium" data-testid="admin-nav-dashboard">Dashboard</Link>
            <Link to="/admin/bookings" className="py-4 text-muted-foreground hover:text-primary transition-colors" data-testid="admin-nav-bookings">Bookings</Link>
            <Link to="/admin/products" className="py-4 text-muted-foreground hover:text-primary transition-colors" data-testid="admin-nav-products">Products</Link>
            <Link to="/admin/orders" className="py-4 text-muted-foreground hover:text-primary transition-colors" data-testid="admin-nav-orders">Orders</Link>
            <Link to="/admin/finance" className="py-4 text-muted-foreground hover:text-primary transition-colors">Finance</Link>
            <Link to="/admin/blog" className="py-4 text-muted-foreground hover:text-primary transition-colors" data-testid="admin-nav-blog">Blog</Link>
            <Link to="/admin/settings" className="py-4 text-muted-foreground hover:text-primary transition-colors" data-testid="admin-nav-settings">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors" data-testid="admin-nav-view-website">View Website</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8" data-testid="admin-dashboard-content">
        {loading ? (
          <div className="text-center py-16" data-testid="admin-dashboard-loading">
            <p className="text-lg text-muted-foreground">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="admin-stats-grid">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)]" data-testid={`admin-stat-card-${index}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.color} text-white rounded-full flex items-center justify-center`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-3xl font-bold text-primary" data-testid={`admin-stat-value-${index}`}>{stat.value}</span>
                    </div>
                    <h3 className="text-muted-foreground font-medium" data-testid={`admin-stat-title-${index}`}>{stat.title}</h3>
                  </div>
                );
              })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)]" data-testid="recent-bookings-section">
              <h2 className="text-xl font-bold text-primary mb-4" data-testid="recent-bookings-title">Recent Bookings</h2>
              {stats?.recent_bookings && stats.recent_bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="recent-bookings-table">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Doctor</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent_bookings.map((booking, index) => (
                        <tr key={booking.id} className="border-b hover:bg-secondary/20" data-testid={`booking-row-${index}`}>
                          <td className="py-3 px-4" data-testid={`booking-name-${index}`}>{booking.patient_name}</td>
                          <td className="py-3 px-4" data-testid={`booking-doctor-${index}`}>{booking.doctor_preference}</td>
                          <td className="py-3 px-4" data-testid={`booking-type-${index}`}>{booking.consultation_type}</td>
                          <td className="py-3 px-4" data-testid={`booking-date-${index}`}>{booking.preferred_date || 'Not specified'}</td>
                          <td className="py-3 px-4" data-testid={`booking-status-${index}`}>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground" data-testid="no-recent-bookings">No recent bookings</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;