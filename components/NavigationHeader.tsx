'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneState, SectionId, VALID_SECTIONS } from '@/lib/state';
import { SKYSCAPER_CONTENT } from '@/lib/content';
import { Volume2, VolumeX, Building, Compass, Layers, ShieldCheck } from 'lucide-react';

interface NavigationHeaderProps {
  sceneState: SceneState;
  onNavigate: (state: SceneState) => void;
}

export function NavigationHeader({ sceneState, onNavigate }: NavigationHeaderProps) {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const toggleAudio = () => {
    setIsAudioMuted((prev) => !prev);
  };

  const getBadgeLabel = () => {
    if (sceneState === 'intro') return 'STAGE 1: BLUEPRINT ANIMATION';
    if (sceneState === 'enter') return 'STAGE 2: SKYLINE ENTER';
    if (sceneState === 'lobby') return 'STAGE 3: INTERACTIVE TOWER LOBBY';
    return `STAGE 4: ${sceneState.toUpperCase()} FLOOR CUTAWAY`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-cyan-500/20 bg-[#070d18]/80 backdrop-blur-md">
      {/* Brand Logo & Wordmark */}
      <motion.div
        onClick={() => onNavigate('lobby')}
        className="flex items-center gap-3 cursor-pointer group select-none"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] border border-cyan-300/40">
          <Building className="w-5 h-5 text-white" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-mono text-base sm:text-lg font-bold tracking-widest text-white group-hover:text-cyan-300 transition-colors">
              {SKYSCAPER_CONTENT.brand.name}
            </h1>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 hidden md:inline-block">
              72 FLOORS
            </span>
          </div>
          <p className="text-[10px] font-mono text-cyan-400/80 tracking-wider">
            {SKYSCAPER_CONTENT.brand.tagline}
          </p>
        </div>
      </motion.div>

      {/* Center Scene Status Badge (Desktop) */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-slate-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>{getBadgeLabel()}</span>
      </div>

      {/* Quick Navigation Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Floor Direct Nav Buttons (Visible when in lobby or floor view) */}
        {sceneState !== 'intro' && sceneState !== 'enter' && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-cyan-500/20 text-xs font-mono">
            {VALID_SECTIONS.map((sec) => {
              const isActive = sceneState === sec;
              return (
                <button
                  key={sec}
                  onClick={() => onNavigate(sec)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    isActive
                      ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {sec.toUpperCase()}
                </button>
              );
            })}
            <button
              onClick={() => onNavigate('lobby')}
              className={`px-2.5 py-1 rounded transition-all ${
                sceneState === 'lobby'
                  ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/50'
                  : 'text-cyan-400 hover:text-cyan-200 hover:bg-slate-800/50'
              }`}
            >
              LOBBY
            </button>
          </nav>
        )}

        {/* Ambient Audio Toggle */}
        <button
          onClick={toggleAudio}
          title={isAudioMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
          className="p-2 rounded-lg glass-panel hover:bg-slate-800/80 border border-cyan-500/30 text-cyan-400 transition-colors"
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>

        {/* Enter / Reset Button */}
        {sceneState === 'intro' ? (
          <button
            onClick={() => onNavigate('enter')}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold transition-all"
          >
            SKIP INTRO →
          </button>
        ) : (
          <button
            onClick={() => onNavigate('intro')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono transition-all"
          >
            REPLAY INTRO
          </button>
        )}
      </div>
    </header>
  );
}
