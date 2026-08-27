import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useReducedMotion } from './useEnvironment';

let lenisInstance: Lenis | null = null;

/** Lenis smooth scrolling, disabled when the user prefers reduced motion. */
export function useSmoothScroll(): void {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6
    });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });else
    window.scrollTo(0, 0);
  }, [pathname]);
}