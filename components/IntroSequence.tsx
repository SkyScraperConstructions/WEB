'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after ~1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimer);
  }, []);

  // Sync background blurred video with main video if needed
  const handleTimeUpdate = () => {
    if (videoRef.current && bgVideoRef.current) {
      const diff = Math.abs(videoRef.current.currentTime - bgVideoRef.current.currentTime);
      if (diff > 0.3) {
        bgVideoRef.current.currentTime = videoRef.current.currentTime;
      }
    }
  };

  const handleVideoEnd = () => {
    onComplete();
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.pause();
    }
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 bg-[#070d18] flex items-center justify-center overflow-hidden select-none"
    >
      {/* 1. Ambient Blurred Video Backdrop (fills screen with live video colors) */}
      <video
        ref={bgVideoRef}
        src="/Intro.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-60 pointer-events-none"
      />

      {/* 2. Radial Color Glow Overlay matching site theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,34,56,0.5)_0%,rgba(7,13,24,0.85)_80%)] pointer-events-none" />

      {/* 3. Subtle grid lines overlay matching blueprint aesthetic */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(74,158,255,0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(74,158,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 4. Main Intro Video (uncropped 16:9 on mobile, full-cover on desktop) */}
      <video
        ref={videoRef}
        src="/Intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/intro-poster.jpg"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        className="relative z-10 w-full h-full object-contain sm:object-cover shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      />

      {/* 5. Soft Vignette Gradients top and bottom */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#070d18]/70 via-transparent to-[#070d18]/80 pointer-events-none" />

      {/* 6. Skip Intro Button */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-50 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-white/20 hover:border-cyan-400/60 text-white/90 hover:text-cyan-300 font-mono text-xs font-bold tracking-wider transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        >
          <span>SKIP INTRO</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}

      {/* Click anywhere to skip */}
      <div
        onClick={handleSkip}
        className="absolute inset-0 z-40 cursor-pointer"
        aria-label="Click to skip intro"
      />
    </motion.div>
  );
}
