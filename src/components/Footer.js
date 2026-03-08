import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { settingsAPI } from '../utils/api';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await settingsAPI.get();
      setSettings(response.data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  return (
    <footer className="bg-primary text-white" data-testid="main-footer">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png"
              alt="Daamin Ayurveda Logo"
              className="h-12 w-auto brightness-0 invert object-contain"
              style={{ maxWidth: '180px' }}
              data-testid="footer-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <p className="text-sm text-white/80 mb-4" data-testid="footer-tagline">
              From Soil to Soul - Holistic Ayurvedic healing for every body
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/doctor_daamin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                data-testid="footer-instagram-dr-mashuk"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.instagram.com/dr.ayeesha_muhibha"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                data-testid="footer-instagram-dr-ayeesha"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/918073396087"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                data-testid="footer-whatsapp-link"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4" data-testid="footer-quick-links-title">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors" data-testid="footer-link-home">Home</Link></li>
              <li><Link to="/doctors" className="hover:text-accent transition-colors" data-testid="footer-link-doctors">Our Doctors</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors" data-testid="footer-link-services">Services</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors" data-testid="footer-link-shop">Shop</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors" data-testid="footer-link-blog">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors" data-testid="footer-link-contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4" data-testid="footer-services-title">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li data-testid="footer-service-consultation">Online Consultation</li>
              <li data-testid="footer-service-panchakarma">Panchakarma Therapy</li>
              <li data-testid="footer-service-medicine">Ayurvedic Medicine</li>
              <li data-testid="footer-service-tourism">Medical Tourism</li>
              <li data-testid="footer-service-wellness">Wellness Programs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4" data-testid="footer-contact-title">Contact Us</h3>
            {settings && (settings.whatsapp_dr_mashuk || settings.whatsapp_dr_ayeesha || settings.whatsapp_ceo || settings.email_notifications) ? (
              <div className="space-y-3 text-sm">
                {settings.whatsapp_dr_mashuk && (
                  <div className="flex items-start gap-2" data-testid="footer-whatsapp-dr-mashuk">
                    <FaWhatsapp className="mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Dr. Mashuk</p>
                      <a href={`https://wa.me/${settings.whatsapp_dr_mashuk.replace(/[^0-9]/g, '')}`} className="hover:text-accent">{settings.whatsapp_dr_mashuk}</a>
                    </div>
                  </div>
                )}
                {settings.whatsapp_dr_ayeesha && (
                  <div className="flex items-start gap-2" data-testid="footer-whatsapp-dr-ayeesha">
                    <FaWhatsapp className="mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Dr. Ayeesha</p>
                      <a href={`https://wa.me/${settings.whatsapp_dr_ayeesha.replace(/[^0-9]/g, '')}`} className="hover:text-accent">{settings.whatsapp_dr_ayeesha}</a>
                    </div>
                  </div>
                )}
                {settings.whatsapp_ceo && (
                  <div className="flex items-start gap-2" data-testid="footer-whatsapp-ceo">
                    <FaWhatsapp className="mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">International (CEO)</p>
                      <a href={`https://wa.me/${settings.whatsapp_ceo.replace(/[^0-9]/g, '')}`} className="hover:text-accent">{settings.whatsapp_ceo}</a>
                    </div>
                  </div>
                )}
                {settings.email_notifications && (
                  <div className="flex items-start gap-2" data-testid="footer-email">
                    <FaEnvelope className="mt-1 flex-shrink-0" />
                    <a href={`mailto:${settings.email_notifications}`} className="hover:text-accent">{settings.email_notifications}</a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-white/80">Contact information will be updated soon</p>
            )}
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm">
          <p data-testid="footer-copyright">
            © {currentYear} Daamin Ayurveda. All rights reserved. | Designed with care for holistic healing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;