'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface NavigationHeaderProps {
  show: boolean;
}

export function NavigationHeader({ show }: NavigationHeaderProps) {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  if (!show) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-start justify-between pointer-events-none">
      {/* Top-Left: Logo Icon + Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 pointer-events-auto"
      >
        {/* Tower Icon SVG matching the reference */}
        <div className="w-10 h-12 flex items-center justify-center">
          <svg
            viewBox="0 0 40 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Three tower lines */}
            <rect x="12" y="8" width="3" height="36" rx="1" fill="white" opacity="0.9" />
            <rect x="18.5" y="2" width="3" height="42" rx="1" fill="white" opacity="0.9" />
            <rect x="25" y="8" width="3" height="36" rx="1" fill="white" opacity="0.9" />
            {/* Base line */}
            <rect x="8" y="44" width="24" height="2" rx="1" fill="white" opacity="0.6" />
            {/* Top spire */}
            <rect x="19.25" y="0" width="1.5" height="4" rx="0.75" fill="white" opacity="0.7" />
          </svg>
        </div>

        <div>
          <h1
            className="text-base sm:text-lg font-light tracking-[0.35em] text-white"
            style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
          >
            SKYSCAPER
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] text-white/50 font-light mt-0.5"
            style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
          >
            BUILDING TOMORROW
          </p>
        </div>
      </motion.div>

      {/* Top-Right: Sound Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3 pointer-events-auto"
      >
        <span
          className="text-xs tracking-[0.15em] text-white/50 font-light hidden sm:inline"
          style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
        >
          SOUND
        </span>
        <button
          onClick={() => setIsAudioMuted(!isAudioMuted)}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all"
          title={isAudioMuted ? 'Unmute' : 'Mute'}
        >
          {isAudioMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </motion.div>
    </header>
  );
}
