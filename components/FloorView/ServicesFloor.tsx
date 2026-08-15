'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import {
  ArrowLeft,
  Building2,
  Cpu,
  HardHat,
  BarChart3,
  LayoutGrid,
  Leaf,
} from 'lucide-react';

interface ServicesFloorProps {
  onBackToLobby: () => void;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-7 h-7 text-white/70" />,
  Cpu: <Cpu className="w-7 h-7 text-white/70" />,
  HardHat: <HardHat className="w-7 h-7 text-white/70" />,
  BarChart3: <BarChart3 className="w-7 h-7 text-white/70" />,
  LayoutGrid: <LayoutGrid className="w-7 h-7 text-white/70" />,
  Leaf: <Leaf className="w-7 h-7 text-white/70" />,
};


export function ServicesFloor({ onBackToLobby }: ServicesFloorProps) {
  return (
    <div className="page-container">
      {/* Full-bleed background image */}
      <motion.img
        src="/services.jpeg"
        alt="Services — modern office with city view"
        className="full-bleed-bg"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Content overlay */}
      <div className="content-overlay">
        {/* Top section: heading + body + CTA */}
        <div className="pl-4 pr-12 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-4 max-w-md">
          {/* SERVICES heading */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6"
          >
            SERVICES
          </motion.h2>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="body-text"
          >
            {SKYSCAPER_CONTENT.services.bodyText}
          </motion.p>
        </div>

        {/* Services grid (2 rows x 3 cols) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="pl-4 pr-12 sm:px-10 lg:px-14 py-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-5 max-w-md">
            {SKYSCAPER_CONTENT.services.list.map((srv) => (
              <div key={srv.id} className="flex flex-col items-start">
                <div className="mb-2">
                  {serviceIconMap[srv.iconName] || <Building2 className="w-7 h-7 text-white/70" />}
                </div>
                <h4
                  className="text-[10px] sm:text-xs font-medium tracking-[0.1em] text-white/90 uppercase mb-1"
                  style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
                >
                  {srv.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] text-white/45 font-light leading-relaxed">
                  {srv.shortDesc}
                </p>
              </div>
            ))}
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
