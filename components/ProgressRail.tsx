'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SceneState, SectionId, VALID_SECTIONS } from '@/lib/state';

interface ProgressRailProps {
  sceneState: SceneState;
  activeHoverFloor: SectionId | null;
  onSelectSection: (sectionId: SectionId) => void;
  onHoverSection: (sectionId: SectionId | null) => void;
}

export function ProgressRail({
  sceneState,
  activeHoverFloor,
  onSelectSection,
  onHoverSection,
}: ProgressRailProps) {
  const rails: { id: SectionId; label: string; floorNum: string }[] = [
    { id: 'contact', label: 'CONTACT US', floorNum: 'L70-72' },
    { id: 'projects', label: 'PROJECTS', floorNum: 'L45-69' },
    { id: 'services', label: 'SERVICES', floorNum: 'L20-44' },
    { id: 'about', label: 'ABOUT US', floorNum: 'L01-19' },
  ];

  // Only render on lobby or floor views
  if (sceneState === 'intro' || sceneState === 'enter') return null;

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-5 pointer-events-auto">
      {/* Vertical Connecting Line */}
      <div className="absolute right-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-amber-400 via-cyan-400 to-blue-500 opacity-40 -z-10" />

      {rails.map((rail) => {
        const isActive = sceneState === rail.id;
        const isHovered = activeHoverFloor === rail.id;

        return (
          <div
            key={rail.id}
            onClick={() => onSelectSection(rail.id)}
            onMouseEnter={() => onHoverSection(rail.id)}
            onMouseLeave={() => onHoverSection(null)}
            className="group flex items-center gap-3 cursor-pointer select-none"
          >
            {/* Hover Tooltip Label */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              animate={{ opacity: isActive || isHovered ? 1 : 0, x: isActive || isHovered ? 0 : 10 }}
              className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded glass-panel text-xs font-mono font-bold border transition-all ${
                isActive
                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-navy-main/80 text-slate-300 border-cyan-500/30'
              }`}
            >
              <span className="text-[10px] text-cyan-400 font-normal">{rail.floorNum}</span>
              <span>{rail.label}</span>
            </motion.div>

            {/* Glowing Indicator Dot Node */}
            <div className="relative flex items-center justify-center w-6 h-6">
              {isActive && (
                <motion.div
                  layoutId="rail-active-ring"
                  className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75"
                />
              )}
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400 shadow-[0_0_15px_#00f0ff] scale-125'
                    : isHovered
                    ? 'bg-amber-400 shadow-[0_0_12px_#ffb830] scale-110'
                    : 'bg-slate-700 hover:bg-slate-400 border border-slate-500'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
