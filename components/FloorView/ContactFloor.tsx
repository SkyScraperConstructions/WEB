'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Building2,
  List,
  Pen,
  Phone,
  MailIcon,
  MapPin,
  CheckCircle,
} from 'lucide-react';

interface ContactFloorProps {
  onBackToLobby: () => void;
}

export function ContactFloor({ onBackToLobby }: ContactFloorProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email address required';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <div className="page-container">
      {/* Full-bleed background image */}
      <motion.img
        src="/contact-us.jpeg"
        alt="Contact Us — executive boardroom"
        className="full-bleed-bg"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Content overlay */}
      <div className="content-overlay">
        {/* Main content area — left side */}
        <div className="flex-1 flex flex-col justify-start pl-4 pr-12 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-4 w-full sm:max-w-sm">
          {/* CONTACT US heading */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-5"
          >
            CONTACT US
          </motion.h2>

          {/* Body text */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="body-text mb-6"
          >
            {SKYSCAPER_CONTENT.contact.bodyText}
          </motion.p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center py-8 gap-4"
              >
                <div className="w-14 h-14 rounded-full border border-[#c9a84c]/50 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-[#c9a84c]" />
                </div>
                <h3
                  className="text-lg font-light tracking-[0.2em] text-white"
                  style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
                >
                  MESSAGE SENT
                </h3>
                <p className="text-sm text-white/50 font-light">
                  Thank you, <span className="text-[#c9a84c]">{formData.name}</span>. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="pill-button mt-2 text-xs"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* Name */}
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[10px] text-red-400/80 mt-0.5 block pl-1">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[10px] text-red-400/80 mt-0.5 block pl-1">{errors.email}</span>
                  )}
                </div>

                {/* Company */}
                <div className="relative">
                  <Building2 className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Project Type */}
                <div className="relative">
                  <List className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-select"
                  >
                    <option value="" disabled>Project Type</option>
                    {SKYSCAPER_CONTENT.contact.formOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ArrowRight className="w-3 h-3 text-white/30 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>

                {/* Message */}
                <div>
                  <div className="relative">
                    <Pen className="w-4 h-4 text-white/30 absolute left-3 top-3.5" />
                    <textarea
                      placeholder="Your Message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                      style={{ alignItems: 'flex-start' }}
                    />
                  </div>
                  {errors.message && (
                    <span className="text-[10px] text-red-400/80 mt-0.5 block pl-1">{errors.message}</span>
                  )}
                </div>

                {/* Send Message button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="pill-button w-full justify-center mt-2"
                  style={{ borderColor: 'rgba(201, 168, 76, 0.4)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">SENDING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom: Contact info + social */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="pl-4 pr-12 sm:px-10 lg:px-14 pb-4"
        >
          <div className="w-full h-px bg-white/10 mb-5" />

          <div className="flex flex-wrap items-start gap-4 sm:gap-8 md:gap-12">
            {/* Call Us */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-white/40" />
              </div>
              <span
                className="text-[10px] tracking-[0.1em] text-white/60 uppercase font-medium"
                style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
              >
                CALL US
              </span>
              <span className="text-xs text-white/80 font-light">
                {SKYSCAPER_CONTENT.contact.phone}
              </span>
            </div>

            {/* Email Us */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 mb-1">
                <MailIcon className="w-4 h-4 text-white/40" />
              </div>
              <span
                className="text-[10px] tracking-[0.1em] text-white/60 uppercase font-medium"
                style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
              >
                EMAIL US
              </span>
              <span className="text-xs text-white/80 font-light">
                {SKYSCAPER_CONTENT.contact.email}
              </span>
            </div>

            {/* Our Office */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-white/40" />
              </div>
              <span
                className="text-[10px] tracking-[0.1em] text-white/60 uppercase font-medium"
                style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
              >
                OUR OFFICE
              </span>
              <span className="text-xs text-white/80 font-light whitespace-pre-line">
                {SKYSCAPER_CONTENT.contact.officeLocation}
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-5">
            <span
              className="text-[10px] tracking-[0.1em] text-white/50 uppercase font-medium"
              style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
            >
              FOLLOW US
            </span>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-8 h-8 rounded border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
              aria-label="LinkedIn"
            >
              <span className="text-xs font-bold">in</span>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-8 h-8 rounded border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              className="w-8 h-8 rounded border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="4" width="20" height="16" rx="4" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Back to Lobby */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="pl-4 pr-12 sm:px-10 lg:px-14 pb-6"
        >
          <button onClick={onBackToLobby} className="back-link">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO LOBBY</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
