'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloorLayout } from './FloorLayout';
import { SKYSCAPER_CONTENT, ProjectItem } from '@/lib/content';
import { SectionId } from '@/lib/state';
import { MapPin, Calendar, ArrowRight, X } from 'lucide-react';

interface ProjectsFloorProps {
  onBackToLobby: () => void;
}

export function ProjectsFloor({ onBackToLobby }: ProjectsFloorProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(
    SKYSCAPER_CONTENT.projects.featured
  );
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const allProjects = [
    SKYSCAPER_CONTENT.projects.featured,
    ...SKYSCAPER_CONTENT.projects.portfolio,
  ];

  return (
    <>
      <FloorLayout
        sectionId="projects"
        onBackToLobby={onBackToLobby}
        childrenLeft={
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
                FLOORS L45 - L69 // PORTFOLIO LOBBY
              </span>
              <h2 className="font-mono text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan">
                {SKYSCAPER_CONTENT.projects.heading}
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              {SKYSCAPER_CONTENT.projects.subheading}
            </p>

            {/* "VIEW ALL PROJECTS →" CTA Button */}
            <div>
              <button
                onClick={() => setIsPortfolioModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/50 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <span>VIEW ALL PROJECTS →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Project Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-cyan-400/40 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">
                  FEATURED MONUMENT
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>COMPLETED {selectedProject.yearCompleted}</span>
                </span>
              </div>

              <div>
                <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedProject.location}</span>
                </p>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Key Spec Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-500/20">
                <div className="p-2 rounded bg-[#0a1628] border border-cyan-500/20 text-center font-mono">
                  <span className="text-[10px] text-cyan-400 block">FLOORS</span>
                  <span className="text-xs font-bold text-white">{selectedProject.floors}</span>
                </div>
                <div className="p-2 rounded bg-[#0a1628] border border-cyan-500/20 text-center font-mono">
                  <span className="text-[10px] text-cyan-400 block">HEIGHT</span>
                  <span className="text-xs font-bold text-white">{selectedProject.height}</span>
                </div>
                <div className="p-2 rounded bg-[#0a1628] border border-cyan-500/20 text-center font-mono">
                  <span className="text-[10px] text-cyan-400 block">RATING</span>
                  <span className="text-xs font-bold text-amber-400">LEED PLAT</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick-select other projects */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                OTHER PROJECTS:
              </span>
              <div className="flex gap-2">
                {allProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      selectedProject.id === proj.id
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
                        : 'bg-slate-950/60 border-cyan-500/20 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Portfolio All Projects Drawer Modal */}
      <AnimatePresence>
        {isPortfolioModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel max-w-3xl w-full p-6 rounded-2xl border border-cyan-400/50 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
                <div>
                  <h3 className="font-mono text-xl font-bold text-white glow-text-cyan">
                    GLOBAL PROJECT CATALOGUE
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    150+ Supertall Structures Across 18 Nations
                  </p>
                </div>
                <button
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-400/80 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span>{proj.location}</span>
                      <span className="text-amber-400 font-bold">{proj.height}</span>
                    </div>
                    <h4 className="font-mono text-base font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-300 font-light">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
