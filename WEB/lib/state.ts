'use client';

import { useState, useEffect, useCallback } from 'react';

export type SceneState =
  | 'intro'
  | 'enter'
  | 'lobby'
  | 'about'
  | 'projects'
  | 'services'
  | 'contact';

export const VALID_SECTIONS = ['about', 'projects', 'services', 'contact'] as const;
export type SectionId = (typeof VALID_SECTIONS)[number];

export function useSceneState() {
  const [sceneState, setSceneState] = useState<SceneState>('intro');

  // Sync state with URL Hash — but never skip the intro on first load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_SECTIONS.includes(hash as SectionId)) {
        setSceneState(hash as SceneState);
      } else if (hash === 'lobby') {
        setSceneState('lobby');
      } else if (hash === 'enter') {
        setSceneState('enter');
      }
    };

    // Only apply hash on subsequent hash changes, NOT on initial mount
    // (so the intro always plays first)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goToState = useCallback((nextState: SceneState) => {
    setSceneState(nextState);
    if (VALID_SECTIONS.includes(nextState as SectionId)) {
      window.history.pushState(null, '', `#${nextState}`);
    } else if (nextState === 'lobby') {
      window.history.pushState(null, '', '#lobby');
    } else if (nextState === 'enter') {
      window.history.pushState(null, '', '#enter');
    } else if (nextState === 'intro') {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  const backToLobby = useCallback(() => {
    goToState('enter');
  }, [goToState]);

  return {
    sceneState,
    goToState,
    backToLobby,
  };
}
