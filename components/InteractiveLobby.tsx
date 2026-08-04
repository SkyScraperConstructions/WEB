'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '@/lib/state';
import { ArrowRight, Layers } from 'lucide-react';

interface InteractiveLobbyProps {
  activeHoverFloor: SectionId | null;
  onHoverFloor: (sectionId: SectionId | null) => void;
  onSelectFloor: (sectionId: SectionId) => void;
}

const floorBands: {
  id: SectionId;
  label: string;
  level: string;
  // Position on the tower image as percentages (top, height)
  top: string;
  height: string;
  glowColor: string;
  accentClass: string;
}[] = [
  {
    id: 'contact',
    label: 'CONTACT US',
    level: 'L70 – L72',
    top: '8%',
    height: '14%',
    glowColor: 'rgba(255, 184, 48, 0.35)',
    accentClass: 'border-amber-400/60 text-amber-300',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    level: 'L45 – L69',
    top: '24%',
    height: '20%',
    glowColor: 'rgba(0, 240, 255, 0.30)',
    accentClass: 'border-cyan-400/60 text-cyan-300',
  },
  {
    id: 'services',
    label: 'SERVICES',
    level: 'L20 – L44',
    top: '46%',
    height: '20%',
    glowColor: 'rgba(74, 158, 255, 0.30)',
    accentClass: 'border-sky-400/60 text-sky-300',
  },
  {
    id: 'about',
    label: 'ABOUT US',
    level: 'L01 – L19',
    top: '68%',
    height: '20%',
    glowColor: 'rgba(56, 189, 248, 0.30)',
    accentClass: 'border-blue-400/60 text-blue-300',
  },
];

export function InteractiveLobby({
  activeHoverFloor,
  onHoverFloor,
  onSelectFloor,
}: InteractiveLobbyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center select-none z-10 overflow-hidden"
    >
      {/* Photoreal tower background — lobby close-up */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tower-lobby.png"
          alt="SKYSCAPER Tower lobby view"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d18] via-[#070d18]/50 to-[#070d18]/60" />
        <div className="absolute inset-0 bg-[#070d18]/30" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-20 text-center space-y-2 pt-24 pb-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold tracking-wider">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>INTERACTIVE ELEVATOR LOBBY</span>
        </div>
        <h2 className="font-mono text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          SELECT A TOWER LEVEL
        </h2>
        <p className="text-slate-300/80 text-xs sm:text-sm font-mono">
          HOVER OVER THE TOWER OR CLICK A SECTION BELOW
        </p>
      </motion.div>

      {/* Tower image container with positioned hotspot overlays */}
      <div className="relative z-20 w-full max-w-lg mx-auto flex-1 min-h-[400px] max-h-[55vh] my-4">
        {/* The tower image as visual base */}
        <div className="relative w-full h-full">
          <img
            src="/tower-lobby.png"
            alt="Interactive tower"
            className="w-full h-full object-contain object-center drop-shadow-[0_10px_40px_rgba(0,240,255,0.15)]"
          />

          {/* Semi-transparent clickable hotspot regions overlaid on the tower */}
          {floorBands.map((band) => {
            const isActive = activeHoverFloor === band.id;
            return (
              <motion.div
                key={band.id}
                onMouseEnter={() => onHoverFloor(band.id)}
                onMouseLeave={() => onHoverFloor(null)}
                onClick={() => onSelectFloor(band.id)}
                style={{
                  top: band.top,
                  height: band.height,
                  left: '15%',
                  right: '15%',
                }}
                className="absolute cursor-pointer group"
              >
                {/* Glow overlay on hover */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0,
                    background: isActive
                      ? `radial-gradient(ellipse at center, ${band.glowColor}, transparent 70%)`
                      : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-lg"
                />

                {/* Border highlight on hover */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0,
                    borderColor: isActive ? band.glowColor : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-2 inset-y-1 rounded-lg border-2 border-dashed"
                />

                {/* Popout floor label card on hover */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 20,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.25 }}
                  className={`absolute right-[-10px] sm:right-[-40px] top-1/2 -translate-y-1/2 translate-x-full px-3 py-2 rounded-lg bg-black/70 backdrop-blur-md border font-mono pointer-events-none ${band.accentClass}`}
                >
                  <span className="text-[10px] font-bold block opacity-70">{band.level}</span>
                  <span className="text-sm font-bold whitespace-nowrap flex items-center gap-1.5">
                    {band.label}
                    <ArrowRight className="w-3.5 h-3.5 inline" />
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile-friendly tappable quick navigation list */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 w-full max-w-xl px-4 pb-8 grid grid-cols-2 sm:grid-cols-4 gap-2"
      >
        {floorBands.map((band) => {
          const isActive = activeHoverFloor === band.id;
          return (
            <button
              key={band.id}
              onClick={() => onSelectFloor(band.id)}
              onMouseEnter={() => onHoverFloor(band.id)}
              onMouseLeave={() => onHoverFloor(null)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl bg-black/40 backdrop-blur-sm border transition-all text-center group ${
                isActive
                  ? band.accentClass + ' shadow-[0_0_20px_' + band.glowColor + ']'
                  : 'border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              <span className="text-[10px] font-mono font-bold opacity-60">{band.level}</span>
              <span className="font-mono font-bold text-xs">{band.label}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
