import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogAPI } from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen" data-testid="blog-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-secondary/30" data-testid="blog-hero">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" data-testid="blog-page-title">
              Ayurvedic Wisdom & Wellness Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="blog-page-subtitle">
              Expert insights, health tips, and Ayurvedic knowledge from our doctors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding" data-testid="blog-posts-section">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-16" data-testid="blog-loading">
              <p className="text-lg text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16" data-testid="no-blog-posts">
              <p className="text-lg text-muted-foreground">
                No blog posts yet. Check back soon for Ayurvedic wisdom and health tips!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_30px_rgba(45,80,22,0.15)] transition-all duration-300"
                  data-testid={`blog-post-card-${index}`}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="aspect-video overflow-hidden bg-secondary/20">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        data-testid={`blog-post-image-${index}`}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1" data-testid={`blog-post-author-${index}`}>
                          <User size={16} /> {post.author}
                        </span>
                        <span className="flex items-center gap-1" data-testid={`blog-post-date-${index}`}>
                          <Calendar size={16} /> {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors" data-testid={`blog-post-title-${index}`}>
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3" data-testid={`blog-post-excerpt-${index}`}>
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;