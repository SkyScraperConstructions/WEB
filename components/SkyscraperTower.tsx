'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId, SceneState } from '@/lib/state';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { MapPin, ArrowRight, Building, Sparkles } from 'lucide-react';

interface SkyscraperTowerProps {
  sceneState: SceneState;
  activeHoverFloor?: SectionId | null;
  onHoverFloor?: (sectionId: SectionId | null) => void;
  onSelectFloor?: (sectionId: SectionId) => void;
}

export function SkyscraperTower({
  sceneState,
  activeHoverFloor,
  onHoverFloor,
  onSelectFloor,
}: SkyscraperTowerProps) {
  const [internalHover, setInternalHover] = useState<SectionId | null>(null);

  const currentHover = activeHoverFloor ?? internalHover;

  const handleHover = (id: SectionId | null) => {
    setInternalHover(id);
    onHoverFloor?.(id);
  };

  const isIntro = sceneState === 'intro';
  const isLobby = sceneState === 'lobby';
  const isEnter = sceneState === 'enter';
  const isFloor = ['about', 'projects', 'services', 'contact'].includes(sceneState);

  // Floor band definitions ordered top to bottom
  const floorBands: { id: SectionId; label: string; level: string; color: string; hoverGlow: string }[] = [
    {
      id: 'contact',
      label: 'CONTACT US',
      level: 'L70 - L72',
      color: 'from-amber-500/40 to-yellow-500/10',
      hoverGlow: 'rgba(255, 184, 48, 0.9)',
    },
    {
      id: 'projects',
      label: 'PROJECTS',
      level: 'L45 - L69',
      color: 'from-cyan-500/40 to-blue-500/10',
      hoverGlow: 'rgba(0, 240, 255, 0.9)',
    },
    {
      id: 'services',
      label: 'SERVICES',
      level: 'L20 - L44',
      color: 'from-sky-500/40 to-indigo-500/10',
      hoverGlow: 'rgba(74, 158, 255, 0.9)',
    },
    {
      id: 'about',
      label: 'ABOUT US',
      level: 'L01 - L19',
      color: 'from-blue-600/40 to-cyan-400/10',
      hoverGlow: 'rgba(56, 189, 248, 0.9)',
    },
  ];

  return (
    <motion.div
      layoutId="skyscraper-tower-container"
      className="relative flex items-center justify-center select-none"
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Tower Outer Canvas Container */}
      <div className="relative w-[340px] sm:w-[400px] md:w-[440px] h-[580px] sm:h-[640px] md:h-[700px] flex items-end justify-center">
        
        {/* Ground Foundation Glow Effect */}
        <div className="absolute bottom-0 w-80 h-12 bg-cyan-500/20 blur-xl rounded-full pointer-events-none" />

        {/* Dynamic SVG / Composite Render Tower */}
        <div className="relative w-full h-full flex flex-col items-center justify-end pb-4">
          
          {/* Spire Beacon Glow */}
          <motion.div
            className="absolute top-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#00f0ff] z-20"
            animate={{
              boxShadow: [
                '0 0 10px #00f0ff, 0 0 20px #00f0ff',
                '0 0 25px #00f0ff, 0 0 50px #00f0ff',
                '0 0 10px #00f0ff, 0 0 20px #00f0ff',
              ],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* SVG Tower Vector Structure */}
          <svg
            viewBox="0 0 400 700"
            className="w-full h-full drop-shadow-[0_10px_35px_rgba(0,240,255,0.15)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glass Facade Gradient */}
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f2b48" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#0a192e" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#050c18" stopOpacity="0.98" />
              </linearGradient>

              {/* Cyan Reflection Sheen */}
              <linearGradient id="sheenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#4a9eff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>

              {/* Wireframe Stroke Gradient */}
              <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#4a9eff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Floor Band Hover Glow Filter */}
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- 1. BASE BLUEPRINT WIREFRAME PATHS (Shown during Intro or underlying) --- */}
            {/* Spire Rod */}
            <motion.line
              x1="200"
              y1="20"
              x2="200"
              y2="80"
              stroke="url(#strokeGradient)"
              strokeWidth="2.5"
              strokeDasharray={isIntro ? '100' : 'none'}
              initial={isIntro ? { pathLength: 0 } : { pathLength: 1 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />

            {/* Outer Tower Silhouette Outline */}
            <motion.path
              d="M 200 80 L 140 160 L 145 320 L 125 480 L 110 660 L 290 660 L 275 480 L 255 320 L 260 160 Z"
              stroke={isIntro ? 'url(#strokeGradient)' : 'rgba(74, 158, 255, 0.4)'}
              strokeWidth={isIntro ? '2.5' : '1.5'}
              fill={isIntro ? 'none' : 'url(#glassGradient)'}
              initial={isIntro ? { pathLength: 0, fillOpacity: 0 } : { pathLength: 1, fillOpacity: 1 }}
              animate={{ pathLength: 1, fillOpacity: isIntro ? 0 : 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Inner Structural Cross-Bracing / Core */}
            <g stroke={isIntro ? '#00f0ff' : 'rgba(74, 158, 255, 0.2)'} strokeWidth="1" strokeDasharray="3 3">
              {/* Central Core Shaft */}
              <line x1="180" y1="100" x2="180" y2="660" />
              <line x1="220" y1="100" x2="220" y2="660" />

              {/* Diagonal X-Bracing */}
              <line x1="140" y1="160" x2="260" y2="240" />
              <line x1="260" y1="160" x2="140" y2="240" />
              <line x1="145" y1="320" x2="255" y2="400" />
              <line x1="255" y1="320" x2="145" y2="400" />
              <line x1="125" y1="480" x2="275" y2="560" />
              <line x1="275" y1="480" x2="125" y2="560" />
            </g>

            {/* Facade Reflection Sheen Polygon */}
            {!isIntro && (
              <polygon
                points="200,80 230,160 225,320 235,480 245,660 200,660 190,480 195,320 190,160"
                fill="url(#sheenGradient)"
              />
            )}

            {/* --- 2. DYNAMIC WINDOW LIGHT GRID (Illuminated per section) --- */}
            {!isIntro && (
              <g className="window-grid">
                {/* Generated window light nodes mapped by tier */}
                {[
                  // Contact tier (L70-L72)
                  { yStart: 100, yEnd: 155, tier: 'contact', xRange: [160, 240] },
                  // Projects tier (L45-L69)
                  { yStart: 170, yEnd: 310, tier: 'projects', xRange: [150, 250] },
                  // Services tier (L20-L44)
                  { yStart: 330, yEnd: 470, tier: 'services', xRange: [135, 265] },
                  // About tier (L01-L19)
                  { yStart: 490, yEnd: 640, tier: 'about', xRange: [120, 280] },
                ].map((tierConfig) => {
                  const isTierActive = currentHover === tierConfig.tier || isFloor;
                  const rowCount = 6;
                  const colCount = 8;
                  const stepY = (tierConfig.yEnd - tierConfig.yStart) / rowCount;
                  const stepX = (tierConfig.xRange[1] - tierConfig.xRange[0]) / colCount;

                  const windows = [];
                  for (let r = 0; r < rowCount; r++) {
                    for (let c = 0; c < colCount; c++) {
                      const wx = tierConfig.xRange[0] + c * stepX + 3;
                      const wy = tierConfig.yStart + r * stepY + 3;
                      const isLit = (r + c) % 2 === 0 || (r * c) % 3 === 0;
                      if (isLit) {
                        windows.push(
                          <rect
                            key={`${tierConfig.tier}-${r}-${c}`}
                            x={wx}
                            y={wy}
                            width={stepX - 3}
                            height={stepY - 3}
                            rx={1}
                            fill={
                              isTierActive
                                ? tierConfig.tier === 'contact'
                                  ? '#ffb830'
                                  : '#00f0ff'
                                : 'rgba(255, 209, 102, 0.45)'
                            }
                            opacity={isTierActive ? 0.95 : 0.4}
                            className="transition-all duration-300"
                          />
                        );
                      }
                    }
                  }
                  return <g key={tierConfig.tier}>{windows}</g>;
                })}
              </g>
            )}

            {/* Structural Floor Divider Horizontal Bands */}
            <line x1="140" y1="160" x2="260" y2="160" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.5" />
            <line x1="145" y1="320" x2="255" y2="320" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.5" />
            <line x1="125" y1="480" x2="275" y2="480" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.5" />
            <line x1="110" y1="660" x2="290" y2="660" stroke="rgba(0, 240, 255, 0.7)" strokeWidth="2" />
          </svg>

          {/* --- 3. INTRO SPECIFICATION CALLOUT OVERLAYS --- */}
          <AnimatePresence>
            {isIntro && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                {SKYSCAPER_CONTENT.blueprintSpecs.map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: spec.align === 'left' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.25, duration: 0.6 }}
                    style={{ top: `${(spec.y / 700) * 100}%`, left: `${(spec.x / 400) * 100}%` }}
                    className="absolute transform -translate-y-1/2 flex items-center gap-2"
                  >
                    {spec.align === 'right' && (
                      <div className="w-8 h-[1px] bg-gradient-to-l from-cyan-400 to-transparent" />
                    )}
                    <div className="glass-panel px-2.5 py-1 rounded text-xs border border-cyan-500/40 bg-navy-main/90 font-mono">
                      <span className="text-cyan-400 font-bold block text-[10px] tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-slate-100 font-semibold">{spec.value}</span>
                    </div>
                    {spec.align === 'left' && (
                      <div className="w-8 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- 4. INTERACTIVE LOBBY FLOOR HOTSPOT BANDS OVERLAY --- */}
          {isLobby && (
            <div className="absolute inset-0 flex flex-col justify-between pt-16 pb-10 px-6 sm:px-12 z-20">
              {floorBands.map((band) => {
                const isHovered = currentHover === band.id;
                return (
                  <motion.div
                    key={band.id}
                    onMouseEnter={() => handleHover(band.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => onSelectFloor?.(band.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-lg p-3 sm:p-4 transition-all duration-300 group border ${
                      isHovered
                        ? 'bg-gradient-to-r ' + band.color + ' border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-900/60 hover:bg-slate-900/80 border-cyan-500/20'
                    }`}
                  >
                    {/* Hotspot Horizontal Highlight Line */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          {band.level}
                        </span>
                        <h4
                          className={`font-mono text-sm sm:text-base font-bold tracking-wider transition-colors ${
                            isHovered ? 'text-white glow-text-cyan' : 'text-slate-200'
                          }`}
                        >
                          {band.label}
                        </h4>
                      </div>

                      <motion.div
                        animate={{ x: isHovered ? 4 : 0 }}
                        className="flex items-center text-cyan-400 font-bold text-xs gap-1"
                      >
                        <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                          ZOOM FLOOR
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Animated Glow Border Bar */}
                    {isHovered && (
                      <motion.div
                        layoutId="band-highlight"
                        className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
