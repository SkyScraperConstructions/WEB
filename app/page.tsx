'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSceneState } from '@/lib/state';
import { NavigationHeader } from '@/components/NavigationHeader';
import { ProgressRail } from '@/components/ProgressRail';
import { IntroSequence } from '@/components/IntroSequence';
import { EnterScreen } from '@/components/EnterScreen';
import { AboutFloor } from '@/components/FloorView/AboutFloor';
import { ProjectsFloor } from '@/components/FloorView/ProjectsFloor';
import { ServicesFloor } from '@/components/FloorView/ServicesFloor';
import { ContactFloor } from '@/components/FloorView/ContactFloor';

// Page transition variants — crossfade + slight scale
const pageTransition = {
  initial: { opacity: 0, scale: 1.03 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

const pageTransitionConfig = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
};

export default function Home() {
  const { sceneState, goToState, backToLobby } = useSceneState();

  const isIntro = sceneState === 'intro';
  const showNav = !isIntro;

  return (
    <main className="relative min-h-screen w-full bg-[#070d18] text-slate-100 overflow-hidden select-none">
      {/* Persistent Navigation Header (logo + sound toggle) */}
      <NavigationHeader show={showNav} />

      {/* Right Edge Dot Rail (01-05) */}
      <ProgressRail
        sceneState={sceneState}
        onSelectSection={goToState}
      />

      {/* Main Scene Views */}
      <AnimatePresence mode="wait">
        {sceneState === 'intro' && (
          <motion.div key="intro" className="w-full">
            <IntroSequence onComplete={() => goToState('enter')} />
          </motion.div>
        )}

        {sceneState === 'enter' && (
          <motion.div
            key="enter"
            className="w-full"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransitionConfig}
          >
            <EnterScreen onEnterLobby={() => goToState('about')} />
          </motion.div>
        )}

        {/* Lobby now goes directly to About (enter button leads to about) */}
        {sceneState === 'lobby' && (
          <motion.div
            key="lobby"
            className="w-full"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransitionConfig}
          >
            <EnterScreen onEnterLobby={() => goToState('about')} />
          </motion.div>
        )}

        {sceneState === 'about' && (
          <motion.div
            key="about"
            className="w-full"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransitionConfig}
          >
            <AboutFloor onBackToLobby={backToLobby} onNavigateSection={goToState} />
          </motion.div>
        )}

        {sceneState === 'projects' && (
          <motion.div
            key="projects"
            className="w-full"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransitionConfig}
          >
            <ProjectsFloor onBackToLobby={backToLobby} />
          </motion.div>
        )}

        {sceneState === 'services' && (
          <motion.div
            key="services"
            className="w-full"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransitionConfig}
          >
            <ServicesFloor onBackToLobby={backToLobby} />
          </motion.div>
        )}

        {sceneState === 'contact' && (
          <motion.div
            key="contact"
            className="w-full"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransitionConfig}
          >
            <ContactFloor onBackToLobby={backToLobby} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
