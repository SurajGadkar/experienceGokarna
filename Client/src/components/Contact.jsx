import React, { useState } from 'react';
import '../styles/Contact.css';
import { contactInfo } from '../data/data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you! We\'ll get back to you within 24 hours.');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Main Container - Single column mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 border-4 border-sand-beige/30 rounded-3xl p-6 sm:p-8 lg:p-12 bg-white/20 backdrop-blur-xl shadow-2xl">
          
          {/* Contact Info Cards - Full width mobile */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 border-b-2 lg:border-b-0 lg:border-r-2 border-sand-beige/20 pb-8 lg:pb-0 lg:pr-12">
            <h2 className="text-4xl sm:text-5xl font-black text-sand-beige text-center lg:text-left mb-8 lg:mb-12 drop-shadow-xl text-shadow-navbar">
              Contact Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-6 lg:space-y-6">
              {contactInfo.map((info, index) => (
                <a 
                  key={index} 
                  href={info.link} 
                  className="contact-card p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl block hover:no-underline animate-slideDown stagger-1 border-2 border-sand-beige/20 hover:border-turquoise-sea/50 w-full flex flex-col items-center text-center lg:items-start lg:text-left min-h-[140px] justify-center"
                  target={info.link.includes('http') ? '_blank' : '_self'}
                  rel={info.link.includes('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="text-3xl sm:text-4xl mb-4 lg:mb-6 text-sand-beige drop-shadow-lg">{info.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-sand-beige mb-2 lg:mb-3 drop-shadow-md">{info.title}</h3>
                  <p className="text-lg sm:text-xl text-sand-beige/90 font-semibold hover:text-sand-beige drop-shadow-sm transition-all leading-relaxed">{info.detail}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form - Full width mobile, order first on mobile */}
          <div className="order-1 lg:order-2 pl-0 lg:pl-12 pb-8 lg:pb-0">
            <h2 className="text-4xl sm:text-5xl font-black text-sand-beige text-center mb-8 lg:mb-12 drop-shadow-xl text-shadow-navbar">
              Send Message
            </h2>
            <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-sand-white/80 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border-4 border-sand-beige/40 hover:border-turquoise-sea/60 transition-all duration-300 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full p-4 sm:p-5 text-lg sm:text-xl rounded-2xl focus:outline-none focus:ring-4 focus:ring-sand-beige/40 text-sand-beige/80 placeholder-sand-beige/50 border-2 border-sand-beige/30 h-14"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full p-4 sm:p-5 text-lg sm:text-xl rounded-2xl focus:outline-none focus:ring-4 focus:ring-sand-beige/40 text-sand-beige/80 placeholder-sand-beige/50 border-2 border-sand-beige/30 h-14"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="form-input w-full p-4 sm:p-5 text-lg sm:text-xl rounded-2xl mb-6 h-14 focus:outline-none focus:ring-4 focus:ring-sand-beige/40 text-sand-beige/80 placeholder-sand-beige/50 border-2 border-sand-beige/30"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us about your Gokarna adventure..."
                value={formData.message}
                onChange={handleChange}
                className="form-input w-full p-4 sm:p-5 text-lg sm:text-xl rounded-2xl focus:outline-none focus:ring-4 focus:ring-sand-beige/40 resize-none text-sand-beige/80 placeholder-sand-beige/50 border-2 border-sand-beige/30 mb-6"
                required
              ></textarea>
              
              <button 
                type="submit" 
                className="btn-primary w-full text-lg sm:text-xl py-5 sm:py-6 rounded-3xl font-bold shadow-2xl hover:shadow-hero mt-6 sm:mt-8 border-4 border-ocean-navy/20 hover:border-turquoise-sea h-14 flex items-center justify-center"
              >
                Send Message
              </button>
              
              {status && (
                <p className="text-center text-lg sm:text-xl text-emerald-400 font-bold mt-6 bg-emerald-900/20 p-4 rounded-2xl animate-pulse border-2 border-emerald-400/50 backdrop-blur-sm mx-auto max-w-md">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Quick Links - Responsive grid */}
        <div className="tips-backdrop rounded-3xl p-8 sm:p-12 lg:p-16 text-center backdrop-blur-xl shadow-2xl border-4 border-sand-beige/30 hover:border-turquoise-sea/50 transition-all">
          <h2 className="text-4xl sm:text-5xl font-black text-sand-beige mb-8 sm:mb-12 drop-shadow-2xl text-shadow-navbar">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { label: 'View Beaches', href: '/activities#beaches' },
              { label: 'Trekking Tours', href: '/activities#trekking' },
              { label: 'Book Now', href: '/booking' },
              { label: 'Gallery', href: '/gallery' }
            ].map((link, i) => (
              <a 
                key={i}
                href={link.href}
                className="btn-primary text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-2xl shadow-xl hover:shadow-hero inline-block transition-all duration-300 stagger-1 border-2 border-ocean-navy/20 hover:border-turquoise-sea text-sand-beige/90 w-full h-20 flex items-center justify-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
