'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../AnimatedCounter';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { SceneState } from '@/lib/state';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Globe,
  Users,
  Shield,
  Target,
  Lightbulb,
  HardHat,
  Heart,
  CheckCircle2,
  Crosshair,
  Eye,
} from 'lucide-react';

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

const coreValueIconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-5 h-5 text-[#c9a84c]" />,
  Shield: <Shield className="w-5 h-5 text-[#c9a84c]" />,
  Target: <Target className="w-5 h-5 text-[#c9a84c]" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-[#c9a84c]" />,
  HardHat: <HardHat className="w-5 h-5 text-[#c9a84c]" />,
  Heart: <Heart className="w-5 h-5 text-[#c9a84c]" />,
};

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

      {/* Content overlay — scrollable */}
      <div className="content-overlay">
        {/* Main content area */}
        <div className="flex-1 flex flex-col pl-4 pr-12 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-16 max-w-2xl">
          {/* Heading */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {SKYSCAPER_CONTENT.about.heading}
            </h2>
            <div className="golden-divider mt-4 mb-6" />
          </motion.div>

          {/* Body paragraphs */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-3 mb-6"
          >
            {SKYSCAPER_CONTENT.about.bodyParagraphs.map((para, idx) => (
              <p key={idx} className="body-text">
                {para}
              </p>
            ))}
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

          {/* ────── Mission & Vision Cards ────── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6"
          >
            {/* Mission */}
            <div className="rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crosshair className="w-5 h-5 text-[#c9a84c]" />
                <h3
                  className="text-xs sm:text-sm font-medium tracking-[0.15em] text-white/90 uppercase"
                  style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
                >
                  Our Mission
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-white/60 font-light leading-relaxed">
                {SKYSCAPER_CONTENT.about.missionStatement}
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-[#c9a84c]" />
                <h3
                  className="text-xs sm:text-sm font-medium tracking-[0.15em] text-white/90 uppercase"
                  style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
                >
                  Our Vision
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-white/60 font-light leading-relaxed">
                {SKYSCAPER_CONTENT.about.visionStatement}
              </p>
            </div>
          </motion.div>

          {/* ────── Core Values (6-item icon grid) ────── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6"
          >
            <h3
              className="text-xs sm:text-sm font-medium tracking-[0.15em] text-white/90 uppercase mb-3"
              style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
            >
              Our Core Values
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SKYSCAPER_CONTENT.about.coreValues.map((cv) => (
                <div
                  key={cv.id}
                  className="rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm p-3 flex flex-col items-start"
                >
                  <div className="mb-2 opacity-80">
                    {coreValueIconMap[cv.iconName] || <Award className="w-5 h-5 text-[#c9a84c]" />}
                  </div>
                  <h4
                    className="text-[10px] sm:text-xs font-medium tracking-[0.12em] text-white/90 uppercase mb-1"
                    style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
                  >
                    {cv.title}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-white/50 font-light leading-relaxed">
                    {cv.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ────── Why Choose Skyscraper Constructions? ────── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6"
          >
            <h3
              className="text-xs sm:text-sm font-medium tracking-[0.15em] text-white/90 uppercase mb-4"
              style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
            >
              Why Choose Skyscraper Constructions?
            </h3>
            <ul className="space-y-1.5">
              {SKYSCAPER_CONTENT.about.whyChooseUs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-white/65 font-light leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ────── Footer tagline ────── */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-6 mb-4"
          >
            <div className="golden-divider mb-4" />
            <p
              className="text-sm sm:text-base tracking-[0.25em] text-white/50 font-light italic"
              style={{ fontFamily: 'var(--font-outfit), var(--font-sans), system-ui, sans-serif' }}
            >
              {SKYSCAPER_CONTENT.about.footerTagline}
            </p>
          </motion.div>
        </div>

        {/* Bottom stats strip — UNCHANGED */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="pl-4 pr-12 sm:px-10 lg:px-14 pb-6"
        >
          {/* Divider line */}
          <div className="w-full h-px bg-white/10 mb-6" />

          <div className="flex flex-wrap items-start gap-4 sm:gap-8 md:gap-12 lg:gap-16">
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
