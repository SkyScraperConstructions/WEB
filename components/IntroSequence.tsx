'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after ~1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimer);
  }, []);

  const handleVideoEnd = () => {
    onComplete();
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Full-bleed intro video */}
      <video
        ref={videoRef}
        src="/Intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark vignette overlay for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

      {/* Skip Intro Button — appears after ~1s */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleSkip}
          className="absolute top-24 right-8 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/20 hover:border-cyan-400/60 text-white/90 hover:text-cyan-300 font-mono text-xs font-bold tracking-wider transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        >
          <span>SKIP INTRO</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}

      {/* Click anywhere to skip (alternative) */}
      <div
        onClick={handleSkip}
        className="absolute inset-0 z-40 cursor-pointer"
        aria-label="Click to skip intro"
      />
    </motion.div>
  );
}
