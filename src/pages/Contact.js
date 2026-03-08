import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { bookingAPI } from '../utils/api';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    email: '',
    phone: '',
    doctor_preference: 'Dr. Mashuk Binaz',
    consultation_type: 'Online Consultation',
    preferred_date: '',
    symptoms: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookingAPI.create(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          patient_name: '',
          email: '',
          phone: '',
          doctor_preference: 'Dr. Mashuk Binaz',
          consultation_type: 'Online Consultation',
          preferred_date: '',
          symptoms: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="contact-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-secondary/30" data-testid="contact-hero">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" data-testid="contact-page-title">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="contact-page-subtitle">
              Book a consultation or reach out to us. We're here to support your wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding" data-testid="contact-content-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6" data-testid="booking-form-title">
                Book a Consultation
              </h2>

              {submitted ? (
                <div className="bg-primary/10 border-2 border-primary rounded-xl p-8 text-center" data-testid="booking-success-message">
                  <CheckCircle className="mx-auto text-primary mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-primary mb-2">Booking Received!</h3>
                  <p className="text-foreground/80">
                    Thank you for booking. Our team will contact you shortly via WhatsApp and email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="booking-form">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="patient_name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="patient_name"
                      name="patient_name"
                      value={formData.patient_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="booking-input-name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        data-testid="booking-input-email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2" htmlFor="phone">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        data-testid="booking-input-phone"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2" htmlFor="doctor_preference">
                        Doctor Preference
                      </label>
                      <select
                        id="doctor_preference"
                        name="doctor_preference"
                        value={formData.doctor_preference}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        data-testid="booking-select-doctor"
                      >
                        <option>Dr. Mashuk Binaz</option>
                        <option>Dr. Ayeesha Muhibha</option>
                        <option>No Preference</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2" htmlFor="consultation_type">
                        Consultation Type
                      </label>
                      <select
                        id="consultation_type"
                        name="consultation_type"
                        value={formData.consultation_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        data-testid="booking-select-type"
                      >
                        <option>Online Consultation</option>
                        <option>In-Person Consultation</option>
                        <option>Panchakarma Treatment</option>
                        <option>Medical Tourism</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="preferred_date">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="booking-input-date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="symptoms">
                      Symptoms / Health Concerns
                    </label>
                    <textarea
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      data-testid="booking-textarea-symptoms"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-3 text-lg font-medium transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    data-testid="booking-submit-btn"
                  >
                    {loading ? 'Submitting...' : (
                      <>
                        <Send size={20} /> Submit Booking Request
                      </>
                    )}
                  </button>

                  <p className="text-sm text-muted-foreground text-center">
                    Our team will confirm your appointment within 24 hours via WhatsApp or email.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6" data-testid="contact-info-title">
                Get In Touch
              </h2>

              <div className="space-y-6">
                {/* WhatsApp Contacts */}
                <div className="bg-secondary/30 rounded-xl p-6" data-testid="whatsapp-contacts">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <FaWhatsapp size={24} /> WhatsApp
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">Dr. Mashuk Binaz</p>
                      <a href="https://wa.me/918073396087" className="text-accent hover:text-primary transition-colors" data-testid="whatsapp-mashuk">
                        +91 8073 396 087
                      </a>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Dr. Ayeesha Muhibha</p>
                      <a href="https://wa.me/917618742985" className="text-accent hover:text-primary transition-colors" data-testid="whatsapp-ayeesha">
                        +91 761 874 2985
                      </a>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">International (CEO)</p>
                      <a href="https://wa.me/966538112830" className="text-accent hover:text-primary transition-colors" data-testid="whatsapp-ceo">
                        +966 53 811 2830
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-secondary/30 rounded-xl p-6" data-testid="email-contact">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <Mail size={24} /> Email
                  </h3>
                  <a href="mailto:athanveer086@gmail.com" className="text-accent hover:text-primary transition-colors" data-testid="email-link">
                    athanveer086@gmail.com
                  </a>
                </div>

                {/* Social Media */}
                <div className="bg-secondary/30 rounded-xl p-6" data-testid="social-media">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <FaInstagram size={24} /> Follow Us
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <a href="https://www.instagram.com/doctor_daamin" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors" data-testid="instagram-mashuk">
                        @doctor_daamin
                      </a>
                    </div>
                    <div>
                      <a href="https://www.instagram.com/dr.ayeesha_muhibha" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors" data-testid="instagram-ayeesha">
                        @dr.ayeesha_muhibha
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;