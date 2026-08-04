'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FloorLayout } from './FloorLayout';
import { SKYSCAPER_CONTENT, ServiceItem } from '@/lib/content';
import { SectionId } from '@/lib/state';
import {
  Building2,
  Cpu,
  HardHat,
  BarChart3,
  LayoutGrid,
  CheckCircle2,
} from 'lucide-react';

interface ServicesFloorProps {
  onBackToLobby: () => void;
}

export function ServicesFloor({ onBackToLobby }: ServicesFloorProps) {
  const [activeService, setActiveService] = useState<ServiceItem>(
    SKYSCAPER_CONTENT.services.list[0]
  );

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Building2: <Building2 className="w-4 h-4 text-cyan-400" />,
      Cpu: <Cpu className="w-4 h-4 text-amber-400" />,
      HardHat: <HardHat className="w-4 h-4 text-sky-400" />,
      BarChart3: <BarChart3 className="w-4 h-4 text-blue-400" />,
      LayoutGrid: <LayoutGrid className="w-4 h-4 text-indigo-400" />,
    };
    return iconMap[iconName] || <Building2 className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <FloorLayout
      sectionId="services"
      onBackToLobby={onBackToLobby}
      childrenLeft={
        <div className="space-y-5">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
              FLOORS L20 - L44 // ARCHITECTURAL MATRIX
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan">
              {SKYSCAPER_CONTENT.services.heading}
            </h2>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            {SKYSCAPER_CONTENT.services.subheading}
          </p>

          {/* Interactive Icon List */}
          <div className="space-y-2 pt-2">
            {SKYSCAPER_CONTENT.services.list.map((srv) => {
              const isSelected = activeService.id === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveService(srv)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left group ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-950/60 border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? 'bg-cyan-500/30 border-cyan-400'
                          : 'bg-slate-900 border-slate-700'
                      }`}
                    >
                      {getIcon(srv.iconName)}
                    </div>
                    <div>
                      <h4
                        className={`font-mono text-sm font-bold ${
                          isSelected ? 'text-white glow-text-cyan' : 'text-slate-200'
                        }`}
                      >
                        {srv.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{srv.shortDesc}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    INSPECT
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected service detail */}
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-3"
          >
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {activeService.fullDesc}
            </p>
            <div className="space-y-1.5 pt-2 border-t border-cyan-500/20">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                CAPABILITIES:
              </span>
              {activeService.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
