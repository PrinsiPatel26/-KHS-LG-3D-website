import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderScene, LoaderState } from './LoaderScene';
import { useReducedMotion } from '../../hooks/useEnvironment';

const HUD = [
{ at: 0.3, text: 'PRECISION BEARING SYSTEM', className: 'left-6 top-[26%] sm:left-14' },
{ at: 0.46, text: 'ENGINEERED FOR MOTION', className: 'right-6 top-[34%] sm:right-14' },
{ at: 0.62, text: 'PRECISION INSPECTION', className: 'left-6 bottom-[32%] sm:left-14' }];


export interface PageLoaderProps {
  /** Fired when the camera has pushed through the bearing — render the site. */
  onReveal: () => void;
  /** Fired once the loader overlay has faded away completely. */
  onFinish: () => void;
}

export function PageLoader({ onReveal, onFinish }: PageLoaderProps) {
  const reduced = useReducedMotion();
  const state = useRef<LoaderState>({ progress: 0, outro: 0 });
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeStarted = useRef(false);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const duration = reduced ? 900 : 3200;
    const outroDuration = reduced ? 300 : 900;
    const start = performance.now();

    const ease = (t: number) => 1 - Math.pow(1 - t, 1.7);

    const runOutro = () => {
      const outroStart = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - outroStart) / outroDuration);
        state.current.outro = t;
        if (t > 0.62 && !fadeStarted.current) {
          fadeStarted.current = true;
          onReveal();
          setFading(true);
        }
        if (t < 1) raf = requestAnimationFrame(tick);else
        window.setTimeout(onFinish, 420);
      };
      raf = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const p = ease(t);
      state.current.progress = p;
      setProgress(p);
      if (t < 1) raf = requestAnimationFrame(tick);else
      runOutro();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink-950"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
      aria-live="polite"
      aria-busy="true">
      
      <LoaderScene state={state} className="absolute inset-0" />

      {/* Vignette + fog wash keeps the frame cinematic */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
          'radial-gradient(circle at 50% 45%, rgba(5,5,5,0) 30%, rgba(5,5,5,0.85) 100%)'
        }} />
      

      <div className="pointer-events-none absolute inset-0 industrial-grid opacity-[0.18]" />

      {/* Technical HUD */}
      <AnimatePresence>
        {HUD.filter((h) => progress >= h.at).map((h) =>
        <motion.span
          key={h.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className={`pointer-events-none absolute font-mono text-[9px] uppercase tracking-tech text-steel-500 sm:text-[10px] ${h.className}`}>
          
            <span className="mr-2 inline-block h-px w-6 align-middle bg-signal" />
            {h.text}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Branding */}
      <div className="pointer-events-none absolute inset-x-0 top-[12%] flex flex-col items-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="mt-3 h-px w-16 origin-center bg-signal" />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-3 font-mono text-[10px] uppercase tracking-tech text-steel-500">
          
          Precision in Motion
        </motion.p>
      </div>

    </motion.div>);

}