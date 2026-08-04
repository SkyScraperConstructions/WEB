'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EnterScreenProps {
  onEnterLobby: () => void;
}

export function EnterScreen({ onEnterLobby }: EnterScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center select-none z-10 overflow-hidden"
    >
      {/* Photoreal tower background — wide shot */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/tower-wide.png"
          alt="SKYSCAPER Tower at dusk"
          className="w-full h-full object-cover object-center"
        />
        {/* Darkening overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d18] via-[#070d18]/60 to-[#070d18]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070d18]/50 via-transparent to-transparent" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl space-y-6">
        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GLOBAL HEADQUARTERS & MONUMENT</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mono text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.3)]"
        >
          {SKYSCAPER_CONTENT.brand.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono text-lg sm:text-2xl font-bold tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          {SKYSCAPER_CONTENT.brand.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-slate-300/90 text-sm sm:text-base font-light max-w-lg leading-relaxed"
        >
          {SKYSCAPER_CONTENT.brand.heroDescription}
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            onClick={onEnterLobby}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(0, 240, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-slate-950 font-mono font-extrabold text-base tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.35)] border border-cyan-300/60"
          >
            <span>ENTER LOBBY</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            <span className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-lg -z-10 group-hover:bg-cyan-400/30 transition-colors" />
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xs font-mono text-cyan-400/50 tracking-wider"
        >
          PRESS TO INITIALIZE TOWER NAVIGATION
        </motion.p>
      </div>
    </motion.div>
  );
}
