import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { productAPI } from '../../utils/api';

const AdminProducts = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    ingredients: '',
    stock: 100
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.create({ ...formData, price: parseFloat(formData.price) });
      setShowForm(false);
      setFormData({ name: '', description: '', price: '', image_url: '', category: '', ingredients: '', stock: 100 });
      loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.delete(id);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30" data-testid="admin-products-page">
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
            <Link to="/admin/products" className="py-4 border-b-2 border-primary text-primary font-medium" data-testid="admin-nav-products">Products</Link>
            <Link to="/admin/finance" className="py-4 text-muted-foreground hover:text-primary transition-colors">Finance</Link>
            <Link to="/admin/blog" className="py-4 text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link to="/admin/settings" className="py-4 text-muted-foreground hover:text-primary transition-colors">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors">View Website</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary" data-testid="products-title">Manage Products</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2" data-testid="add-product-btn">
            <Plus size={20} /> Add Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)] mb-6" data-testid="product-form">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="px-4 py-2 border border-border rounded-md" data-testid="product-input-name" />
              <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="px-4 py-2 border border-border rounded-md" data-testid="product-input-price" />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required className="px-4 py-2 border border-border rounded-md" data-testid="product-input-category" />
              <input type="url" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} required className="px-4 py-2 border border-border rounded-md" data-testid="product-input-image" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="px-4 py-2 border border-border rounded-md md:col-span-2" rows="3" data-testid="product-textarea-description" />
              <textarea placeholder="Ingredients" value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} required className="px-4 py-2 border border-border rounded-md md:col-span-2" rows="2" data-testid="product-textarea-ingredients" />
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full" data-testid="product-submit-btn">Add Product</button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-border px-6 py-2 rounded-full">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16"><p className="text-lg text-muted-foreground">Loading products...</p></div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center"><p className="text-muted-foreground">No products yet. Add your first product!</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(45,80,22,0.08)]" data-testid={`product-card-${index}`}>
                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs text-accent font-medium uppercase">{product.category}</span>
                  <h3 className="text-lg font-bold text-primary mt-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                  <p className="text-xl font-bold text-primary mt-3">₹{product.price}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => deleteProduct(product.id)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 flex items-center justify-center gap-2" data-testid={`product-delete-${index}`}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;