import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderScene, LoaderState } from './LoaderScene';
import { useReducedMotion } from '../../hooks/useEnvironment';

export interface PageLoaderProps {
  isReady: boolean;
  onFinish: () => void;
}

const MINIMUM_LOAD_MS = 2200; // Company logo clearly visible in center for ~2.2s

export function PageLoader({ isReady, onFinish }: PageLoaderProps) {
  const reduced = useReducedMotion();
  const state = useRef<LoaderState>({ progress: 0, outro: 0 });
  const [fading, setFading] = useState(false);
  const [logoAvailable, setLogoAvailable] = useState(true);
  const [logoReady, setLogoReady] = useState(false);
  const [percent, setPercent] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, MINIMUM_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  // Smooth progress calculation from 0 to 100%
  useEffect(() => {
    if (reduced) {
      setPercent(100);
      return undefined;
    }

    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (MINIMUM_LOAD_MS - 250), 1);
      setPercent(Math.min(Math.round(progress * 100), 100));
      state.current.progress = 0.2 + progress * 0.8;

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [reduced]);

  useEffect(() => {
    if (minTimeElapsed && isReady && logoReady) {
      state.current.progress = 1;
      state.current.outro = 1;
      setFading(true);
    }
  }, [minTimeElapsed, isReady, logoReady]);

  return (
    <motion.div
      className="fixed inset-0 z-loader bg-ink-950 select-none overflow-hidden"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }}
      onAnimationComplete={() => {
        if (fading) onFinish();
      }}
      role="status"
      aria-label="Loading KHS-LG"
      aria-busy={!fading}>
      <LoaderScene state={state} className="absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.92) 75%)'
        }} />

      <div className="pointer-events-none absolute inset-0 industrial-grid opacity-[0.16]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Ambient warm glow behind company logo */}
        <div
          className="pointer-events-none absolute h-64 w-64 rounded-full opacity-20 blur-3xl sm:h-80 sm:w-80"
          style={{
            background: 'radial-gradient(circle, rgba(245, 180, 0, 0.85) 0%, transparent 70%)'
          }} />

        {logoAvailable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col items-center">
            <img
              src="/khslogo-clean.png"
              alt="KHS-LG"
              onLoad={() => setLogoReady(true)}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('khslogo2-removebg-preview.png')) {
                  target.src = '/khslogo2-removebg-preview.png';
                } else {
                  setLogoAvailable(false);
                  setLogoReady(true);
                }
              }}
              className="block h-auto w-[min(78vw,440px)] max-h-[140px] sm:max-h-[175px] object-contain drop-shadow-[0_6px_28px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        )}

        {/* Progress bar and status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col items-center w-52 sm:w-64">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-ink-800/80">
            <div
              className="absolute inset-y-0 left-0 bg-signal transition-all duration-150 ease-out shadow-[0_0_10px_rgba(245,180,0,0.6)]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-3 flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-steel-500">
            <span>{percent < 100 ? 'INITIALIZING EXPERIENCE' : 'READY'}</span>
            <span className="text-signal font-semibold">{percent}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>);
}