'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '@/lib/state';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface FloorLayoutProps {
  sectionId: SectionId;
  onBackToLobby: () => void;
  childrenLeft: React.ReactNode;
  childrenRight?: React.ReactNode;
}

const FLOOR_IMAGES: Record<SectionId, string> = {
  about: '/floor-about.png',
  projects: '/floor-projects.png',
  services: '/floor-services.png',
  contact: '/floor-contact.png',
};

export function FloorLayout({
  sectionId,
  onBackToLobby,
  childrenLeft,
  childrenRight,
}: FloorLayoutProps) {
  const floorMeta = SKYSCAPER_CONTENT.floors[sectionId];
  const floorImage = FLOOR_IMAGES[sectionId];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full pt-20 pb-12 px-4 sm:px-8 lg:px-12 flex flex-col justify-center select-none z-10"
    >
      {/* Background: subtle tower image at low opacity for continuity */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/tower-wide.png"
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-[#070d18]/80" />
      </div>

      {/* Top Header Navigation Line: Back to Lobby + Floor Metadata Pill */}
      <div className="flex items-center justify-between mb-6 z-20 relative">
        <motion.button
          onClick={onBackToLobby}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg glass-panel hover:bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO LOBBY</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded border border-cyan-500/30">
            {floorMeta.floorNumber}
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
            {floorMeta.subtitle}
          </span>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-20 relative">
        {/* Left Side: Dark Navy Glass Content Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow inside Panel */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {childrenLeft}
        </motion.div>

        {/* Right Side: Photoreal Interior Cutaway Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 xl:col-span-6 rounded-2xl border border-cyan-500/40 shadow-2xl relative flex flex-col items-center justify-center min-h-[420px] overflow-hidden"
        >
          {/* Photoreal floor interior image */}
          <motion.img
            src={floorImage}
            alt={`${floorMeta.title} interior cutaway`}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark gradient overlay for framing */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d18]/70 via-transparent to-[#070d18]/30 pointer-events-none" />
          <div className="absolute inset-0 border border-cyan-400/20 rounded-2xl pointer-events-none" />

          {/* Top-left corner label */}
          <div className="absolute top-3 left-3 z-10 text-[10px] font-mono text-cyan-400/90 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-cyan-500/30">
            FLOOR CUTAWAY // {floorMeta.floorNumber}
          </div>

          {/* Bottom-right corner label */}
          <div className="absolute bottom-3 right-3 z-10 text-[10px] font-mono text-cyan-400/70 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1 border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>ARCHITECTURAL SCENE</span>
          </div>

          {/* Optional custom content overlaid on the image */}
          {childrenRight && (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
              {childrenRight}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
