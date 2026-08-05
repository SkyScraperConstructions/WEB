'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EnterScreenProps {
  onEnterLobby: () => void;
}

export function EnterScreen({ onEnterLobby }: EnterScreenProps) {
  return (
    <div className="page-container">
      {/* Full-bleed background image */}
      <motion.img
        src="/enter-screen.jpeg"
        alt="SKYSCAPER Tower at dusk — enter screen"
        className="full-bleed-bg"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Content overlay */}
      <div className="content-overlay items-center justify-center text-center">
        {/* Center: Title + Tagline + Enter button */}
        <div className="flex flex-col items-center gap-4">
          {/* SKYSCAPER heading */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: '0.45em' }}
          >
            SKYSCAPER
          </motion.h1>

          {/* BUILDING TOMORROW subtitle */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-sm sm:text-base tracking-[0.3em] text-white/60 font-light"
            style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
          >
            BUILDING TOMORROW
          </motion.p>

          {/* ENTER button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6"
          >
            <motion.button
              onClick={onEnterLobby}
              className="pill-button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>ENTER</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom-left label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-6 left-6 sm:left-10"
        >
          <span className="text-xs tracking-[0.15em] text-white/40 font-light">
            2. ENTER SCREEN
          </span>
        </motion.div>
      </div>
    </div>
  );
}
