import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Video, ShoppingBag, Stethoscope, Plane, Heart, Leaf, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
  const services = [
    {
      icon: Video,
      title: 'Online Consultation',
      description: 'Expert Ayurvedic consultation from the comfort of your home. Connect with our BAMS doctors via video call for personalized treatment plans.',
      features: ['Video/Phone Consultation', 'Personalized Treatment Plan', 'Follow-up Support', 'Prescription & Medicine Guidance'],
      color: 'bg-primary'
    },
    {
      icon: ShoppingBag,
      title: 'Ayurvedic Medicines',
      description: 'Authentic herbal formulations prepared using traditional methods. All products are quality-tested and sourced from trusted suppliers.',
      features: ['100% Natural Ingredients', 'Quality Certified', 'Traditional Formulations', 'Home Delivery Available'],
      color: 'bg-accent'
    },
    {
      icon: Stethoscope,
      title: 'Panchakarma Therapy',
      description: 'Traditional detoxification and rejuvenation treatments performed by trained therapists under doctor supervision.',
      features: ['Abhyanga (Oil Massage)', 'Shirodhara', 'Vamana & Virechana', 'Basti Treatment'],
      color: 'bg-primary'
    },
    {
      icon: Plane,
      title: 'Medical Tourism',
      description: 'Comprehensive Ayurvedic treatment packages for international patients. We handle accommodation, treatment, and local arrangements.',
      features: ['Airport Pickup/Drop', 'Accommodation Assistance', 'Treatment Packages', 'Local Support Staff'],
      color: 'bg-accent'
    },
    {
      icon: Heart,
      title: 'Preventive Care',
      description: 'Lifestyle and wellness programs designed to prevent diseases and maintain optimal health through Ayurvedic principles.',
      features: ['Health Assessments', 'Diet Plans', 'Yoga & Meditation', 'Seasonal Regimens'],
      color: 'bg-primary'
    },
    {
      icon: Leaf,
      title: 'Wellness Programs',
      description: 'Holistic wellness programs for stress management, weight loss, skin care, and overall rejuvenation.',
      features: ['Stress Management', 'Weight Management', 'Skin & Hair Care', 'Immunity Boost'],
      color: 'bg-accent'
    }
  ];

  return (
    <div className="min-h-screen" data-testid="services-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-secondary/30" data-testid="services-hero">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" data-testid="services-page-title">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-page-subtitle">
              Comprehensive Ayurvedic healthcare solutions for complete wellness. 
              From online consultations to in-clinic treatments and international medical tourism.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding" data-testid="services-grid-section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_30px_rgba(45,80,22,0.15)] transition-all duration-300"
                  data-testid={`service-card-${index}`}
                >
                  <div className={`w-16 h-16 ${service.color} text-white rounded-full flex items-center justify-center mb-6`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3" data-testid={`service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid={`service-description-${index}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white" data-testid="services-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="services-cta-title">
              Ready to Experience Holistic Healing?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8" data-testid="services-cta-subtitle">
              Book a consultation with our expert doctors or explore our shop for authentic Ayurvedic products
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-medium transition-all inline-flex items-center gap-2"
                data-testid="services-cta-book-btn"
              >
                Book Consultation <ArrowRight size={20} />
              </Link>
              <Link 
                to="/shop" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 py-3 text-lg font-medium transition-all"
                data-testid="services-cta-shop-btn"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;