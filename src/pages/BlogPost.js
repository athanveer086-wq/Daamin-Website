import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogAPI } from '../utils/api';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      const response = await blogAPI.getOne(postId);
      setPost(response.data);
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="blog-post-loading">
        <p className="text-lg text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="blog-post-not-found">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Blog post not found</p>
          <Link to="/blog" className="text-primary hover:text-accent font-medium">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="blog-post-page">
      <Navbar />

      <article className="section-padding pt-32" data-testid="blog-post-article">
        <div className="container-custom max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium mb-8"
            data-testid="back-to-blog-link"
          >
            <ArrowLeft size={20} /> Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-2xl shadow-[0_12px_30px_rgba(45,80,22,0.15)] mb-8"
              data-testid="blog-post-header-image"
            />

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2" data-testid="blog-post-author">
                <User size={16} /> {post.author}
              </span>
              <span className="flex items-center gap-2" data-testid="blog-post-date">
                <Calendar size={16} /> {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="blog-post-title">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none" data-testid="blog-post-content">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;