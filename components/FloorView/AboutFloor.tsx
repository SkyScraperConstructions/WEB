'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FloorLayout } from './FloorLayout';
import { AnimatedCounter } from '../AnimatedCounter';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { SectionId } from '@/lib/state';
import { ChevronRight } from 'lucide-react';

interface AboutFloorProps {
  onBackToLobby: () => void;
  onNavigateSection: (sec: SectionId) => void;
}

export function AboutFloor({ onBackToLobby, onNavigateSection }: AboutFloorProps) {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <FloorLayout
      sectionId="about"
      onBackToLobby={onBackToLobby}
      childrenLeft={
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
              FLOORS L01 - L19 // GROUND ATRIUM & SKY LOBBY
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan">
              {SKYSCAPER_CONTENT.about.heading}
            </h2>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {SKYSCAPER_CONTENT.about.storyIntro}
          </p>

          {/* "OUR STORY →" Expandable Link */}
          <div className="space-y-3">
            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-200 font-mono text-xs font-bold transition-colors group"
            >
              <span>{showFullStory ? 'HIDE OUR STORY ↑' : 'OUR STORY →'}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${showFullStory ? '-rotate-90' : ''}`}
              />
            </button>

            {showFullStory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 leading-relaxed font-light"
              >
                {SKYSCAPER_CONTENT.about.fullStory}
              </motion.div>
            )}
          </div>

          {/* 4 Stat Counters */}
          <div className="pt-2 border-t border-cyan-500/20">
            <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3">
              KEY PERFORMANCE METRICS
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {SKYSCAPER_CONTENT.about.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 hover:border-cyan-400/60 transition-colors"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 glow-text-amber">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-mono text-slate-200 font-semibold mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-light mt-0.5">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
