'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSceneState } from '@/lib/state';
import { BlueprintGrid } from '@/components/BlueprintGrid';
import { NavigationHeader } from '@/components/NavigationHeader';
import { ProgressRail } from '@/components/ProgressRail';
import { IntroSequence } from '@/components/IntroSequence';
import { EnterScreen } from '@/components/EnterScreen';
import { InteractiveLobby } from '@/components/InteractiveLobby';
import { AboutFloor } from '@/components/FloorView/AboutFloor';
import { ProjectsFloor } from '@/components/FloorView/ProjectsFloor';
import { ServicesFloor } from '@/components/FloorView/ServicesFloor';
import { ContactFloor } from '@/components/FloorView/ContactFloor';

export default function Home() {
  const {
    sceneState,
    goToState,
    backToLobby,
    activeHoverFloor,
    setActiveHoverFloor,
  } = useSceneState();

  const isIntro = sceneState === 'intro';

  return (
    <main className="relative min-h-screen w-full bg-[#070d18] text-slate-100 overflow-x-hidden select-none">
      {/* Dynamic Background — hidden during intro (video takes over) */}
      {!isIntro && <BlueprintGrid mode="dusk" />}

      {/* Persistent Navigation Header — hidden during intro */}
      {!isIntro && <NavigationHeader sceneState={sceneState} onNavigate={goToState} />}

      {/* Right Edge Vertical Progress Rail Indicator */}
      <ProgressRail
        sceneState={sceneState}
        activeHoverFloor={activeHoverFloor}
        onSelectSection={goToState}
        onHoverSection={setActiveHoverFloor}
      />

      {/* Main Scene State Machine Views Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {sceneState === 'intro' && (
            <motion.div key="intro" className="w-full">
              <IntroSequence onComplete={() => goToState('enter')} />
            </motion.div>
          )}

          {sceneState === 'enter' && (
            <motion.div key="enter" className="w-full">
              <EnterScreen onEnterLobby={() => goToState('lobby')} />
            </motion.div>
          )}

          {sceneState === 'lobby' && (
            <motion.div key="lobby" className="w-full">
              <InteractiveLobby
                activeHoverFloor={activeHoverFloor}
                onHoverFloor={setActiveHoverFloor}
                onSelectFloor={(floorId) => goToState(floorId)}
              />
            </motion.div>
          )}

          {sceneState === 'about' && (
            <motion.div key="about" className="w-full">
              <AboutFloor onBackToLobby={backToLobby} onNavigateSection={goToState} />
            </motion.div>
          )}

          {sceneState === 'projects' && (
            <motion.div key="projects" className="w-full">
              <ProjectsFloor onBackToLobby={backToLobby} />
            </motion.div>
          )}

          {sceneState === 'services' && (
            <motion.div key="services" className="w-full">
              <ServicesFloor onBackToLobby={backToLobby} />
            </motion.div>
          )}

          {sceneState === 'contact' && (
            <motion.div key="contact" className="w-full">
              <ContactFloor onBackToLobby={backToLobby} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
