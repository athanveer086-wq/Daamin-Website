import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-6" data-testid="admin-login-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-[0_12px_30px_rgba(45,80,22,0.15)] p-8">
          <div className="text-center mb-8">
            <img
              src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png"
              alt="Daamin Ayurveda Logo"
              className="h-14 w-auto mx-auto mb-4 object-contain"
              style={{ maxWidth: '200px' }}
              data-testid="admin-login-logo"
            />
            <h1 className="text-2xl font-bold text-primary" data-testid="admin-login-title">Admin Login</h1>
            <p className="text-muted-foreground mt-2" data-testid="admin-login-subtitle">Access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="admin-login-form">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" data-testid="admin-login-error">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="admin@daamin.com"
                  data-testid="admin-login-input-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                  data-testid="admin-login-input-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-3 text-lg font-medium transition-all disabled:opacity-50"
              data-testid="admin-login-submit-btn"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p data-testid="admin-login-note">For admin access only. Doctors and CEO login here.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;