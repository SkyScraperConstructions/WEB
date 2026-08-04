'use client';

import { motion } from 'framer-motion';

interface BlueprintGridProps {
  mode?: 'blueprint' | 'dusk';
}

export function BlueprintGrid({ mode = 'dusk' }: BlueprintGridProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Background Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          mode === 'blueprint'
            ? 'bg-[#050b14]'
            : 'bg-gradient-to-b from-[#060c17] via-[#091526] to-[#040810]'
        }`}
      />

      {/* Blueprint Grid Lines Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          mode === 'blueprint' ? 'blueprint-grid opacity-80' : 'blueprint-grid opacity-25'
        }`}
      />

      {/* Radial Glow Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px]" />

      {/* Distant City Skyline Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20 bg-repeat-x bg-bottom flex items-end justify-between px-10">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto text-slate-800/80">
          <path
            d="M0 120 V80 H40 V60 H70 V80 H90 V40 H120 V80 H150 V120 H200 V70 H230 V30 H260 V70 H290 V120 H340 V90 H380 V50 H410 V90 H450 V120 H500 V40 H530 V20 H560 V40 H600 V120 H660 V85 H700 V65 H730 V85 H770 V120 H820 V50 H860 V30 H890 V50 H930 V120 H980 V90 H1020 V70 H1060 V90 H1100 V120 H1200 V120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Twinkling ambient star lights */}
      <div className="absolute inset-0">
        {[
          { top: '15%', left: '20%', delay: 0 },
          { top: '25%', left: '80%', delay: 1 },
          { top: '10%', left: '60%', delay: 2 },
          { top: '35%', left: '15%', delay: 1.5 },
          { top: '40%', left: '85%', delay: 0.5 },
          { top: '18%', left: '42%', delay: 2.5 },
        ].map((star, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1 h-1 rounded-full bg-cyan-200"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>
    </div>
  );
}
