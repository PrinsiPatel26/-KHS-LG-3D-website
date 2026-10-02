import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderScene, LoaderState } from './LoaderScene';
import { useReducedMotion } from '../../hooks/useEnvironment';

export interface PageLoaderProps {
  isReady: boolean;
  onFinish: () => void;
}

export function PageLoader({ isReady, onFinish }: PageLoaderProps) {
  const reduced = useReducedMotion();
  const state = useRef<LoaderState>({ progress: 0, outro: 0 });
  const [fading, setFading] = useState(false);
  const [logoAvailable, setLogoAvailable] = useState(true);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    let raf = 0;
    if (isReady && logoReady) {
      state.current.progress = 1;
      state.current.outro = 1;
      setFading(true);
      return undefined;
    }

    if (reduced) {
      state.current.progress = 0.4;
      return undefined;
    }

    const start = performance.now();
    const tick = (now: number) => {
      state.current.progress = 0.28 + Math.min((now - start) / 20000, 0.16);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isReady, logoReady, reduced]);

  const progressSweep = isReady ? { x: '110%' } : reduced ? { x: '0%' } : { x: ['-110%', '220%'] };
  const progressTransition = isReady ?
  { duration: reduced ? 0 : 0.24, ease: 'easeOut' as const } :
  reduced ?
  { duration: 0 } :
  { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <motion.div
      className="fixed inset-0 z-loader bg-ink-950"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: reduced ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}
      onAnimationComplete={() => {
        if (fading) onFinish();
      }}
      role="status"
      aria-label="Loading KHS-LG"
      aria-busy={!isReady || !logoReady}>
      <LoaderScene state={state} className="absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
          'radial-gradient(circle at 50% 50%, rgba(5,5,5,0.18) 0%, rgba(5,5,5,0.9) 72%)'
        }} />

      <div className="pointer-events-none absolute inset-0 industrial-grid opacity-[0.18]" />

      <div className="absolute inset-0 flex items-center justify-center">
        {logoAvailable && (
          <motion.img
            src="/khslogo2-removebg-preview.png"
            alt="KHS-LG"
            onLoad={() => setLogoReady(true)}
            onError={() => {
              setLogoAvailable(false);
              setLogoReady(true);
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="block h-auto w-[min(78vw,420px)] object-contain"
          />
        )}
      </div>

      <div
        className="absolute left-1/2 w-44 -translate-x-1/2 sm:w-56"
        style={{ top: 'calc(50% + min(27.2vw, 147px) + 22px)' }}
      >
        <div className="relative h-px overflow-hidden bg-steel-700/70">
          <motion.div
            className={`absolute inset-y-0 ${reduced ? 'w-full' : 'w-1/3'} bg-signal shadow-[0_0_10px_rgba(255,245,138,0.45)]`}
            animate={progressSweep}
            transition={progressTransition}
          />
        </div>
        <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-steel-500">
          {isReady && logoReady ? 'Ready' : 'Initializing experience'}
        </p>
      </div>
    </motion.div>);

}