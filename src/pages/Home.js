import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Heart, Star, Instagram, Play } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { testimonialAPI } from '../utils/api';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await testimonialAPI.getAll();
      setTestimonials(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const services = [
    {
      title: 'Online Consultation',
      description: 'Expert Ayurvedic consultation from the comfort of your home',
      icon: Users
    },
    {
      title: 'Panchakarma Therapy',
      description: 'Traditional detoxification and rejuvenation treatments',
      icon: Heart
    },
    {
      title: 'Ayurvedic Medicines',
      description: 'Authentic herbal formulations for holistic healing',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-6 md:px-12 lg:px-20 hero-gradient relative overflow-hidden"
        data-testid="hero-section"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-3 leading-tight" data-testid="hero-brand-name" style={{ fontFamily: 'Playfair Display, serif' }}>
                Daamin Ayurveda
              </h1>
              <p className="text-xl md:text-2xl text-accent font-medium italic mb-6" data-testid="hero-tagline" style={{ fontFamily: 'Playfair Display, serif' }}>
                From Soil to Soul
              </p>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6 leading-tight"
                data-testid="hero-title"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Holistic Ayurvedic Healing for Every Body
              </h2>
              <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-xl" data-testid="hero-description">
                Combining traditional Ayurvedic wisdom with modern digital accessibility. 
                Expert care from certified BAMS doctors for men, women, and families.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="btn-primary inline-flex items-center gap-2"
                  data-testid="hero-book-consultation-btn"
                >
                  Book Consultation <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/shop" 
                  className="btn-secondary"
                  data-testid="hero-shop-now-btn"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1685316578159-b8b2e567b11c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwbWVkaWNpbmUlMjBnb2xkJTIwYWVzdGhldGljfGVufDB8fHx8MTc3MjM2NTE4NHww&ixlib=rb-4.1.0&q=85"
                alt="Ayurvedic Herbs and Medicine"
                className="rounded-2xl shadow-[0_12px_30px_rgba(45,80,22,0.15)] w-full"
                data-testid="hero-image"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="section-padding bg-white" data-testid="doctors-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="doctors-section-title">
              Meet Our Expert Doctors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="doctors-section-subtitle">
              BAMS certified practitioners dedicated to your holistic wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dr. Mashuk */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-secondary/30 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_30px_rgba(45,80,22,0.15)] transition-all duration-300 group"
              data-testid="doctor-card-mashuk"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/odrbbvx5_image.png"
                  alt="Dr. Mashuk Binaz"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid="doctor-image-mashuk"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2" data-testid="doctor-name-mashuk">
                  Dr. Mashuk Binaz
                </h3>
                <p className="text-sm text-accent font-medium mb-3" data-testid="doctor-title-mashuk">
                  BAMS Doctor, Clinical Practitioner & Content Educator
                </p>
                <p className="text-muted-foreground mb-4" data-testid="doctor-bio-mashuk">
                  Expert in Ayurvedic treatment and wellness education with years of clinical experience.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/doctor_daamin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                    data-testid="doctor-instagram-mashuk"
                  >
                    <FaInstagram size={20} />
                    <span className="text-sm font-medium">Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Dr. Ayeesha */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/30 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_30px_rgba(45,80,22,0.15)] transition-all duration-300 group"
              data-testid="doctor-card-ayeesha"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://customer-assets.emergentagent.com/job_doctor-daamin/artifacts/5m9axr3v_WhatsApp%20Image%202026-03-01%20at%202.13.40%20PM.jpeg"
                  alt="Dr. Ayeesha Muhibha"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid="doctor-image-ayeesha"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2" data-testid="doctor-name-ayeesha">
                  Dr. Ayeesha Muhibha
                </h3>
                <p className="text-sm text-accent font-medium mb-3" data-testid="doctor-title-ayeesha">
                  BAMS Doctor, Clinical Practitioner & Health Educator
                </p>
                <p className="text-muted-foreground mb-4" data-testid="doctor-bio-ayeesha">
                  Specialized in women's health and preventive Ayurvedic care with compassionate approach.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/dr.ayeesha_muhibha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                    data-testid="doctor-instagram-ayeesha"
                  >
                    <FaInstagram size={20} />
                    <span className="text-sm font-medium">Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/doctors" 
              className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium text-lg transition-colors"
              data-testid="view-full-profiles-link"
            >
              View Full Profiles <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary/30" data-testid="services-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="services-section-title">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="services-section-subtitle">
              Comprehensive Ayurvedic healthcare for complete wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_30px_rgba(45,80,22,0.15)] transition-all duration-300 group"
                  data-testid={`service-card-${index}`}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3" data-testid={`service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`service-description-${index}`}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="btn-primary inline-flex items-center gap-2"
              data-testid="explore-all-services-btn"
            >
              Explore All Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="section-padding bg-white" data-testid="instagram-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="instagram-section-title">
              Follow Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="instagram-section-subtitle">
              Stay connected with daily Ayurvedic wisdom, health tips, and patient success stories
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/doctor_daamin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
                data-testid="instagram-link-mashuk"
              >
                <FaInstagram size={24} />
                <span>@doctor_daamin</span>
              </a>
              <a
                href="https://www.instagram.com/dr.ayeesha_muhibha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
                data-testid="instagram-link-ayeesha"
              >
                <FaInstagram size={24} />
                <span>@dr.ayeesha_muhibha</span>
              </a>
            </div>
          </motion.div>

          <div className="bg-secondary/20 rounded-2xl p-8 text-center border-2 border-dashed border-primary/20">
            <Instagram className="mx-auto text-primary mb-4" size={48} />
            <h3 className="text-2xl font-bold text-primary mb-2" data-testid="instagram-feed-placeholder-title">
              Instagram Feed
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="instagram-feed-placeholder-text">
              Latest reels and posts from our doctors showcasing Ayurvedic treatments, health tips, and patient transformations.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Visit our Instagram profiles to watch educational videos and follow our daily wellness content
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-secondary/30" data-testid="testimonials-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="testimonials-section-title">
                What Our Patients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-section-subtitle">
                Real stories of healing and transformation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(45,80,22,0.08)]"
                  data-testid={`testimonial-card-${index}`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-accent fill-accent" size={20} />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic" data-testid={`testimonial-text-${index}`}>
                    "{testimonial.testimonial}"
                  </p>
                  <div>
                    <p className="font-bold text-primary" data-testid={`testimonial-name-${index}`}>
                      {testimonial.patient_name}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`testimonial-condition-${index}`}>
                      {testimonial.condition}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white" data-testid="cta-section">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8" data-testid="cta-subtitle">
              Book a consultation with our expert Ayurvedic doctors today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-medium transition-all inline-flex items-center gap-2"
                data-testid="cta-book-consultation-btn"
              >
                Book Consultation <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/918073396087"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 py-3 text-lg font-medium transition-all inline-flex items-center gap-2"
                data-testid="cta-whatsapp-btn"
              >
                <FaWhatsapp size={20} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
