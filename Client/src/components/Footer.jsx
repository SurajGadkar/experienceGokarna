import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container h-[200px] relative overflow-hidden">
      {/* Navbar EXACT background */}
      <div className="absolute inset-0 navbar-bg-footer"></div>
      
      <div className="relative h-full flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto text-sand-beige">
        
        {/* Compact top row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-3 sm:mb-4">
          <div className="text-center sm:text-left flex-shrink-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-sand-beige drop-shadow-navbar mb-1 leading-tight">
              Gokarna Adventures
            </h3>
            <p className="text-xs sm:text-sm text-sand-beige/90 drop-shadow-sm leading-tight">
              Karnataka's Coastal Paradise
            </p>
          </div>

          {/* Compact social - Sand-beige icons/text */}
          <div className="social-grid flex gap-2 sm:gap-3 flex-shrink-0">
            {[
              { icon: '📘', href: 'https://facebook.com/gokarnaadventures' },
              { icon: '📷', href: 'https://instagram.com/gokarnaadventures' },
              { icon: '📱', href: 'https://wa.me/919876543210' },
              { icon: '📍', href: 'https://maps.google.com/?q=Gokarna' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="social-btn w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center text-base shadow-md hover:scale-110 hover:shadow-navbar transition-all duration-300 border border-sand-beige/50 hover:border-sand-beige hover:bg-sand-beige/20 text-sand-beige hover:text-sand-white shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.icon}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sand-beige/40 self-stretch mx-2"></div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-sand-beige/90 drop-shadow-sm">
          {/* Contact - Sand-beige only */}
          <div className="contact-mini flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left order-2 sm:order-1">
            <a href="mailto:gokarnaadventures@gmail.com" className="hover:text-sand-beige/100 transition-all hover:underline text-sand-beige/90">📧 info@gokarna.in</a>
            <span className="hidden sm:inline text-sand-beige/60">•</span>
            <a href="tel:+919876543210" className="hover:text-sand-beige/100 transition-all hover:underline text-sand-beige/90">📞 +91 98765 43210</a>
          </div>
          
          {/* Copyright - Sand-beige */}
          <div className="copyright text-center sm:text-right order-1 sm:order-2 w-full sm:w-auto">
            <p className="font-semibold text-sand-beige/95 drop-shadow-navbar text-xs sm:text-sm leading-tight">
              © 2026 Gokarna Adventures
            </p>
            <p className="text-sand-beige/80 text-xs leading-tight mt-0.5">
              Sirsi, Karnataka 🌊
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
