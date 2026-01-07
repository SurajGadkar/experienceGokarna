import React, { useState } from "react";
import "../styles/Contact.css";
import { contactInfo } from "../data/data";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Thank you! We'll get back to you within 24 hours.");
    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Page header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-black text-shadow-navbar tracking-tight">
            Contact
          </h1>
          <p className="mt-2 text-sm sm:text-base text-black">
            Ask about stays, trekking, beach activities, routes, or a custom plan.
          </p>
        </div>

        {/* Main container */}
        <div className="contact-shell grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Contact info */}
          <section className="glass-card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black text-shadow-navbar">
              Contact details
            </h2>
            <p className="mt-2 text-sm text-black/75">
              Reach out via email/phone, or use the form.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="contact-card"
                  target={info.link.includes("http") ? "_blank" : "_self"}
                  rel={info.link.includes("http") ? "noopener noreferrer" : ""}
                >
                  <div className="contact-card__icon">{info.icon}</div>
                  <div className="contact-card__meta">
                    <div className="contact-card__title">{info.title}</div>
                    <div className="contact-card__detail">{info.detail}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Form */}
          <section className="glass-card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black text-shadow-navbar">
              Send a message
            </h2>
            <p className="mt-2 text-sm text-black/75">
              Share dates, group size, and what you want to do.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="mt-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="mt-4">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about your plan..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  required
                />
              </div>

              <button type="submit" className="btn-primary btn-primary--wide mt-5">
                Send message
              </button>

              {status && (
                <div className="status-pill mt-4" role="status">
                  {status}
                </div>
              )}
            </form>
          </section>
        </div>

        {/* Quick links */}
        <section className="glass-card mt-10 sm:mt-12 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black text-shadow-navbar text-center">
            Quick links
          </h2>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Beaches", href: "/activities#beaches" },
              { label: "Trekking", href: "/activities#trekking" },
              { label: "Booking", href: "/booking" },
              { label: "Gallery", href: "/gallery" }
            ].map((link) => (
              <a key={link.href} href={link.href} className="quick-link">
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
