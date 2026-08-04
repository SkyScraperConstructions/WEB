'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloorLayout } from './FloorLayout';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { SectionId } from '@/lib/state';
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  MapPin,
  Phone,
} from 'lucide-react';

interface ContactFloorProps {
  onBackToLobby: () => void;
}

export function ContactFloor({ onBackToLobby }: ContactFloorProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: SKYSCAPER_CONTENT.contact.formOptions[0],
    message: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
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
    if (!formData.message.trim()) newErrors.message = 'Message content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      inquiryType: SKYSCAPER_CONTENT.contact.formOptions[0],
      message: '',
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <FloorLayout
      sectionId="contact"
      onBackToLobby={onBackToLobby}
      childrenLeft={
        <div className="space-y-5">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase bg-amber-950/80 px-2.5 py-1 rounded border border-amber-500/30">
              FLOORS L70 - L72 // EXECUTIVE PENTHOUSE HQ
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-extrabold text-white glow-text-amber">
              {SKYSCAPER_CONTENT.contact.heading}
            </h2>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            {SKYSCAPER_CONTENT.contact.subheading}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-1.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px]">{SKYSCAPER_CONTENT.contact.officeLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">{SKYSCAPER_CONTENT.contact.phone}</span>
            </div>
          </div>

          {/* Interactive Front-End Form */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-6 rounded-xl bg-slate-950/90 border border-amber-400/60 text-center space-y-4 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                  <CheckCircle className="w-6 h-6 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-mono text-lg font-bold text-white glow-text-amber">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-xs text-slate-300">
                    Thank you, <span className="text-amber-400 font-bold">{formData.name}</span>.
                    Our principal partners have received your inquiry.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#0a1628] border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
                  REF ID: #SKY-{Math.floor(100000 + Math.random() * 900000)} // HQ DISPATCHED
                </div>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-400/50 font-mono text-xs font-bold transition-colors"
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3 pt-1"
              >
                {/* Name Input */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 font-bold mb-1">
                    YOUR FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950/80 border text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono transition-colors ${
                        errors.name ? 'border-red-500' : 'border-cyan-500/30'
                      }`}
                    />
                  </div>
                  {errors.name && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.name}</span>}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 font-bold mb-1">
                    WORK EMAIL ADDRESS *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. eleanor@horizon.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950/80 border text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono transition-colors ${
                        errors.email ? 'border-red-500' : 'border-cyan-500/30'
                      }`}
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.email}</span>}
                </div>

                {/* Inquiry Type Select */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 font-bold mb-1">
                    INQUIRY CATEGORY
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  >
                    {SKYSCAPER_CONTENT.contact.formOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 font-bold mb-1">
                    VISION / PROJECT SCOPE DETAILS *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe target building height, location, or architectural requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-3 rounded-lg bg-slate-950/80 border text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-cyan-500/30'
                    }`}
                  />
                  {errors.message && <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-mono font-extrabold text-xs tracking-wider shadow-[0_0_20px_rgba(255,184,48,0.4)] border border-amber-300 hover:scale-[1.01] active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE →</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      }
    />
  );
}
