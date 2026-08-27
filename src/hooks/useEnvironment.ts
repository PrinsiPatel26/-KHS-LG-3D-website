import { useEffect, useState } from 'react';

/** True once the component is mounted in the browser. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export type DeviceTier = 'low' | 'medium' | 'high';

/** Adaptive quality tier: drives polygon count, particles and shadows. */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high');
  useEffect(() => {
    const width = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    const touch = window.matchMedia('(hover: none)').matches;
    if (width < 768 || cores <= 4) setTier(cores <= 2 ? 'low' : 'medium');else
    if (width < 1280 && touch) setTier('medium');else
    setTier('high');
  }, []);
  return tier;
}

export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);
  return touch;
}