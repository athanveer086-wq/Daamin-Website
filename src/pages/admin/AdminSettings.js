import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { settingsAPI } from '../../utils/api';

const AdminSettings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email_notifications: '',
    whatsapp_dr_mashuk: '',
    whatsapp_dr_ayeesha: '',
    whatsapp_ceo: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await settingsAPI.get();
      setSettings(response.data);
      setFormData({
        email_notifications: response.data.email_notifications,
        whatsapp_dr_mashuk: response.data.whatsapp_dr_mashuk,
        whatsapp_dr_ayeesha: response.data.whatsapp_dr_ayeesha,
        whatsapp_ceo: response.data.whatsapp_ceo
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsAPI.update(formData);
      alert('Settings updated successfully!');
      loadSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30" data-testid="admin-settings-page">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png" alt="Logo" className="h-12 w-auto object-contain" style={{ maxWidth: '180px' }} />
            <div>
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-primary hover:text-accent transition-colors"><LogOut size={20} /> Logout</button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <Link to="/admin" className="py-4 text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/admin/bookings" className="py-4 text-muted-foreground hover:text-primary transition-colors">Bookings</Link>
            <Link to="/admin/products" className="py-4 text-muted-foreground hover:text-primary transition-colors">Products</Link>
            <Link to="/admin/finance" className="py-4 text-muted-foreground hover:text-primary transition-colors">Finance</Link>
            <Link to="/admin/blog" className="py-4 text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link to="/admin/settings" className="py-4 border-b-2 border-primary text-primary font-medium" data-testid="admin-nav-settings">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors">View Website</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6" data-testid="settings-title">System Settings</h2>

        {loading ? (
          <div className="text-center py-16"><p className="text-lg text-muted-foreground">Loading settings...</p></div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)] space-y-6" data-testid="settings-form">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Email Notifications</h3>
              <label className="block text-sm font-medium text-foreground mb-2">Notification Email Address</label>
              <input
                type="email"
                value={formData.email_notifications}
                onChange={(e) => setFormData({...formData, email_notifications: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-md"
                placeholder="email@example.com"
                data-testid="settings-input-email"
              />
              <p className="text-sm text-muted-foreground mt-2">Booking confirmations will be sent to this email</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-primary mb-4">WhatsApp Contact Numbers</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Dr. Mashuk Binaz</label>
                  <input
                    type="tel"
                    value={formData.whatsapp_dr_mashuk}
                    onChange={(e) => setFormData({...formData, whatsapp_dr_mashuk: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-md"
                    placeholder="+91 8073 396 087"
                    data-testid="settings-input-whatsapp-mashuk"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Dr. Ayeesha Muhibha</label>
                  <input
                    type="tel"
                    value={formData.whatsapp_dr_ayeesha}
                    onChange={(e) => setFormData({...formData, whatsapp_dr_ayeesha: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-md"
                    placeholder="+91 761 874 2985"
                    data-testid="settings-input-whatsapp-ayeesha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CEO (International)</label>
                  <input
                    type="tel"
                    value={formData.whatsapp_ceo}
                    onChange={(e) => setFormData({...formData, whatsapp_ceo: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-md"
                    placeholder="+966 53 811 2830"
                    data-testid="settings-input-whatsapp-ceo"
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">These numbers will be displayed on the website and used for booking notifications</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-primary mb-4">Payment Information</h3>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-sm text-foreground mb-3">PhonePe QR Code for Payments:</p>
                <img 
                  src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/r2mp930p_WhatsApp%20Image%202026-03-01%20at%202.13.40%20PM.jpeg"
                  alt="PhonePe QR Code"
                  className="w-48 h-auto rounded-lg"
                  data-testid="settings-payment-qr"
                />
                <p className="text-xs text-muted-foreground mt-2">This QR code is displayed during checkout</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-3 text-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              data-testid="settings-save-btn"
            >
              <Save size={20} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;