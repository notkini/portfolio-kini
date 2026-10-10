"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from "react";
import { soundManager, preloadSounds } from "@/lib/sound";

type SoundName = 'click' | 'card-flick' | 'tick' | 'confirm' | 'shuffle';

interface SoundContextType {
  muted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

function getInitialMuted(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('sound-muted');
  return stored !== null ? stored === 'true' : true;
}

function getInitialVolume(): number {
  if (typeof window === 'undefined') return 0.3;
  const stored = localStorage.getItem('sound-volume');
  if (stored !== null) {
    const vol = parseFloat(stored);
    if (!isNaN(vol)) return vol;
  }
  return 0.3;
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(getInitialMuted);
  const [volume, setVolumeState] = useState(getInitialVolume);
  const initializedRef = useRef(false);

  useEffect(() => {
    soundManager.setMuted(muted);
    soundManager.setVolume(volume);
    preloadSounds();
    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;
    localStorage.setItem('sound-muted', String(muted));
    soundManager.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    if (!initializedRef.current) return;
    localStorage.setItem('sound-volume', String(volume));
    soundManager.setVolume(volume);
  }, [volume]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const play = useCallback((name: SoundName) => {
    soundManager.play(name).catch(() => {});
  }, []);

  return (
    <SoundContext.Provider value={{ muted, volume, toggleMute, setVolume, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundContextType {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}