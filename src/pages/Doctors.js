import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Award, BookOpen, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Doctors = () => {
  const doctors = [
    {
      name: 'Dr. Mashuk Binaz',
      title: 'BAMS Doctor, Clinical Practitioner & Content Educator',
      image: 'https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/odrbbvx5_image.png',
      instagram: 'https://www.instagram.com/doctor_daamin',
      whatsapp: 'https://wa.me/918073396087',
      phone: '+91 8073 396 087',
      bio: 'Dr. Mashuk Binaz is a dedicated Ayurvedic physician with extensive experience in clinical practice and patient education. With a passion for spreading Ayurvedic wisdom, he combines traditional knowledge with modern clinical approaches to provide holistic healthcare solutions. His expertise lies in treating chronic conditions, digestive disorders, and stress-related ailments.',
      specializations: ['Chronic Disease Management', 'Digestive Health', 'Stress & Anxiety Treatment', 'Preventive Care'],
      education: ['Bachelor of Ayurvedic Medicine and Surgery (BAMS)', 'Clinical Training in Panchakarma', 'Advanced Herbology Certification']
    },
    {
      name: 'Dr. Ayeesha Muhibha',
      title: 'BAMS Doctor, Clinical Practitioner & Health Educator',
      image: 'https://customer-assets.emergentagent.com/job_doctor-daamin/artifacts/5m9axr3v_WhatsApp%20Image%202026-03-01%20at%202.13.40%20PM.jpeg',
      instagram: 'https://www.instagram.com/dr.ayeesha_muhibha',
      whatsapp: 'https://wa.me/917618742985',
      phone: '+91 761 874 2985',
      bio: 'Dr. Ayeesha Muhibha is a compassionate Ayurvedic practitioner specializing in women\'s health and holistic wellness. With her gentle approach and deep understanding of Ayurvedic principles, she has helped numerous patients achieve optimal health. Her focus on preventive care and lifestyle modification has transformed the lives of families seeking natural healthcare.',
      specializations: ['Women\'s Health', 'Skin & Hair Care', 'Weight Management', 'Lifestyle Counseling'],
      education: ['Bachelor of Ayurvedic Medicine and Surgery (BAMS)', 'Specialized Training in Gynecological Ayurveda', 'Wellness & Nutrition Certification']
    }
  ];

  return (
    <div className="min-h-screen" data-testid="doctors-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-secondary/30" data-testid="doctors-hero">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" data-testid="doctors-page-title">
              Meet Our Expert Doctors
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="doctors-page-subtitle">
              Certified BAMS practitioners dedicated to your holistic wellness journey. 
              With years of clinical experience and a passion for Ayurvedic healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Detail Section */}
      <section className="section-padding" data-testid="doctors-detail-section">
        <div className="container-custom">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center mb-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              data-testid={`doctor-detail-${index}`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-2xl shadow-[0_12px_30px_rgba(45,80,22,0.15)] w-full"
                  data-testid={`doctor-detail-image-${index}`}
                />
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid={`doctor-detail-name-${index}`}>
                  {doctor.name}
                </h2>
                <p className="text-accent font-medium mb-6" data-testid={`doctor-detail-title-${index}`}>
                  {doctor.title}
                </p>
                <p className="text-foreground/80 mb-6 leading-relaxed" data-testid={`doctor-detail-bio-${index}`}>
                  {doctor.bio}
                </p>

                <div className="mb-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <Award size={20} /> Specializations
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {doctor.specializations.map((spec, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <BookOpen size={20} /> Education & Training
                  </h3>
                  <ul className="space-y-1">
                    {doctor.education.map((edu, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={doctor.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 rounded-full px-6 py-2 font-medium transition-all"
                    data-testid={`doctor-detail-instagram-${index}`}
                  >
                    <FaInstagram size={20} /> Follow on Instagram
                  </a>
                  <a
                    href={doctor.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2 font-medium transition-all"
                    data-testid={`doctor-detail-whatsapp-${index}`}
                  >
                    <FaWhatsapp size={20} /> {doctor.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;