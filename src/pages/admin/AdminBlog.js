import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { blogAPI } from '../../utils/api';

const AdminBlog = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    author: '',
    published: true
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await blogAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogAPI.create(formData);
      setShowForm(false);
      setFormData({ title: '', content: '', excerpt: '', image_url: '', author: '', published: true });
      loadPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post');
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogAPI.delete(id);
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30" data-testid="admin-blog-page">
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
            <Link to="/admin/blog" className="py-4 border-b-2 border-primary text-primary font-medium" data-testid="admin-nav-blog">Blog</Link>
            <Link to="/admin/settings" className="py-4 text-muted-foreground hover:text-primary transition-colors">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors">View Website</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary" data-testid="blog-title">Manage Blog Posts</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2" data-testid="add-blog-btn">
            <Plus size={20} /> Add Blog Post
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)] mb-6" data-testid="blog-form">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border border-border rounded-md" data-testid="blog-input-title" />
              <input type="text" placeholder="Author Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required className="w-full px-4 py-2 border border-border rounded-md" data-testid="blog-input-author" />
              <input type="url" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} required className="w-full px-4 py-2 border border-border rounded-md" data-testid="blog-input-image" />
              <textarea placeholder="Excerpt (Short summary for blog list)" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required className="w-full px-4 py-2 border border-border rounded-md" rows="2" data-testid="blog-textarea-excerpt" />
              <textarea placeholder="Blog Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required className="w-full px-4 py-2 border border-border rounded-md" rows="8" data-testid="blog-textarea-content" />
              <div className="flex gap-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full" data-testid="blog-submit-btn">Publish Post</button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-border px-6 py-2 rounded-full">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16"><p className="text-lg text-muted-foreground">Loading blog posts...</p></div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center"><p className="text-muted-foreground">No blog posts yet. Add your first post!</p></div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)] flex gap-6" data-testid={`blog-post-card-${index}`}>
                <img src={post.image_url} alt={post.title} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">By {post.author} • {new Date(post.created_at).toLocaleDateString()}</p>
                  <p className="text-foreground/80 line-clamp-2">{post.excerpt}</p>
                </div>
                <button onClick={() => deletePost(post.id)} className="self-start bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 flex items-center gap-2" data-testid={`blog-delete-${index}`}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlog;