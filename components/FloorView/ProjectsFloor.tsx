'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../AnimatedCounter';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Building2,
  Award,
  MapPin,
} from 'lucide-react';

interface ProjectsFloorProps {
  onBackToLobby: () => void;
}

const globalStatIcons = [
  <Globe key="globe" className="w-5 h-5 text-[#c9a84c]" />,
  <Building2 key="building" className="w-5 h-5 text-[#c9a84c]" />,
  <Award key="award" className="w-5 h-5 text-[#c9a84c]" />,
  <MapPin key="map" className="w-5 h-5 text-[#c9a84c]" />,
];

export function ProjectsFloor({ onBackToLobby }: ProjectsFloorProps) {
  const featured = SKYSCAPER_CONTENT.projects.featured;

  return (
    <div className="page-container">
      {/* Full-bleed background image */}
      <motion.img
        src="/projects.jpeg"
        alt="Projects — office showroom with city models"
        className="full-bleed-bg"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Content overlay */}
      <div className="content-overlay">
        {/* Top section: heading + body + CTA */}
        <div className="px-6 sm:px-10 lg:px-14 pt-24 pb-4 max-w-lg">
          {/* PROJECTS heading */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl">
              PROJECTS
            </h2>
            <div className="golden-divider mt-4 mb-6" />
          </motion.div>

          {/* Body paragraphs */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="space-y-3 mb-6"
          >
            <p className="body-text">
              {SKYSCAPER_CONTENT.projects.subheading1}
            </p>
            <p className="body-text">
              {SKYSCAPER_CONTENT.projects.subheading2}
            </p>
          </motion.div>

          {/* VIEW ALL PROJECTS button */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.button
              className="pill-button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Featured project card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="px-6 sm:px-10 lg:px-14 py-4"
        >
          <div className="flex items-start gap-4 max-w-lg">
            {/* Thumbnail — gradient placeholder since we don't have a dedicated tower photo */}
            <div className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-32 rounded-sm overflow-hidden bg-gradient-to-b from-amber-900/40 via-blue-950/60 to-blue-900/40 border border-white/10">
              <div className="w-full h-full flex items-end justify-center pb-2">
                <Building2 className="w-8 h-8 text-[#c9a84c]/60" />
              </div>
            </div>

            {/* Project info */}
            <div className="flex-1">
              <span className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[#c9a84c] font-medium uppercase">
                FEATURED PROJECT
              </span>
              <h3
                className="text-lg sm:text-xl font-light tracking-[0.2em] text-white mt-1"
                style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
              >
                HORIZON TOWER
              </h3>
              <p className="text-[10px] sm:text-xs tracking-[0.1em] text-white/50 font-light mt-0.5">
                DUBAI, UAE
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 mt-3">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-light text-white">{featured.floors}</div>
                  <div className="text-[8px] sm:text-[9px] tracking-[0.1em] text-white/40 uppercase">FLOORS</div>
                </div>
                <div className="w-px h-8 bg-white/15" />
                <div className="text-center">
                  <div className="text-base sm:text-lg font-light text-white">{featured.height}</div>
                  <div className="text-[8px] sm:text-[9px] tracking-[0.1em] text-white/40 uppercase">HEIGHT</div>
                </div>
                <div className="w-px h-8 bg-white/15" />
                <div className="text-center">
                  <div className="text-base sm:text-lg font-light text-white">{featured.yearCompleted}</div>
                  <div className="text-[8px] sm:text-[9px] tracking-[0.1em] text-white/40 uppercase">COMPLETED</div>
                </div>
              </div>

              {/* View Details link */}
              <button className="mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-white/50 hover:text-white/80 transition-colors uppercase">
                VIEW DETAILS <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom global stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-auto px-6 sm:px-10 lg:px-14 pb-4"
        >
          <div className="w-full h-px bg-white/10 mb-5" />
          <div className="flex items-start justify-center gap-8 sm:gap-14 lg:gap-20">
            {SKYSCAPER_CONTENT.projects.globalStats.map((stat, idx) => (
              <div key={stat.id} className="flex flex-col items-center text-center">
                <div className="mb-1.5 opacity-70">
                  {globalStatIcons[idx]}
                </div>
                <div className="stat-value text-xl sm:text-2xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label whitespace-pre-line text-center">
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
