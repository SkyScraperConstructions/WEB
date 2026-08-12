'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SceneState } from '@/lib/state';

interface ProgressRailProps {
  sceneState: SceneState;
  onSelectSection: (state: SceneState) => void;
}

const RAIL_ITEMS: { num: string; stateId: SceneState }[] = [
  { num: '01', stateId: 'enter' },
  { num: '02', stateId: 'about' },
  { num: '03', stateId: 'services' },
  { num: '04', stateId: 'projects' },
  { num: '05', stateId: 'contact' },
];

export function ProgressRail({ sceneState, onSelectSection }: ProgressRailProps) {
  // Hide during intro
  if (sceneState === 'intro') return null;

  // Determine which dot is active
  const getActiveIndex = (): number => {
    switch (sceneState) {
      case 'enter':
      case 'lobby':
        return 0;
      case 'about':
        return 1;
      case 'services':
        return 2;
      case 'projects':
        return 3;
      case 'contact':
        return 4;
      default:
        return -1;
    }
  };

  const activeIdx = getActiveIndex();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="dot-rail"
    >
      {/* Connecting vertical line */}
      <div className="dot-rail-line" />

      {RAIL_ITEMS.map((item, idx) => {
        const isActive = idx === activeIdx;

        return (
          <motion.div
            key={`${item.num}-${idx}`}
            onClick={() => onSelectSection(item.stateId)}
            className={`dot-rail-item ${isActive ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="dot-rail-number">{item.num}</span>
            <div className="dot-rail-dot" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
