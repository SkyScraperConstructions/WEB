'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../AnimatedCounter';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { SceneState } from '@/lib/state';
import { ArrowLeft, ArrowRight, Award, Building2, Globe, Users } from 'lucide-react';

interface AboutFloorProps {
  onBackToLobby: () => void;
  onNavigateSection: (sec: SceneState) => void;
}

const statIcons = [
  <Award key="award" className="w-6 h-6 text-[#c9a84c]" />,
  <Building2 key="building" className="w-6 h-6 text-[#c9a84c]" />,
  <Globe key="globe" className="w-6 h-6 text-[#c9a84c]" />,
  <Users key="users" className="w-6 h-6 text-[#c9a84c]" />,
];

export function AboutFloor({ onBackToLobby, onNavigateSection }: AboutFloorProps) {
  return (
    <div className="page-container">
      {/* Full-bleed background image */}
      <motion.img
        src="/about-us.jpeg"
        alt="About Us — executive office interior"
        className="full-bleed-bg"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Content overlay */}
      <div className="content-overlay">
        {/* Main content area — left side */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-24 max-w-xl">
          {/* ABOUT US heading */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl">
              ABOUT US
            </h2>
            <div className="golden-divider mt-4 mb-6" />
          </motion.div>

          {/* Body paragraphs */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-4 mb-8"
          >
            <p className="body-text">
              {SKYSCAPER_CONTENT.about.bodyParagraph1}
            </p>
            <p className="body-text">
              {SKYSCAPER_CONTENT.about.bodyParagraph2}
            </p>
          </motion.div>

          {/* OUR STORY button */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <motion.button
              className="pill-button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigateSection('about')}
            >
              <span>OUR STORY</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="px-6 sm:px-10 lg:px-14 pb-6"
        >
          {/* Divider line */}
          <div className="w-full h-px bg-white/10 mb-6" />

          <div className="flex items-start gap-8 sm:gap-12 lg:gap-16">
            {SKYSCAPER_CONTENT.about.stats.map((stat, idx) => (
              <div key={stat.id} className="flex flex-col items-start">
                {/* Icon */}
                <div className="mb-2 opacity-70">
                  {statIcons[idx]}
                </div>
                {/* Value */}
                <div className="stat-value">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                {/* Label */}
                <div className="stat-label whitespace-pre-line mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Lobby */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="px-6 sm:px-10 lg:px-14 pb-6"
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
