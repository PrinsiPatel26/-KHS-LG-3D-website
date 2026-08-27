import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';
import { BearingScene } from '../3d/BearingScene';
import { MagneticButton } from '../ui/MagneticButton';
import { company } from '../../data/company';
import { useIsTouch, useReducedMotion } from '../../hooks/useEnvironment';

const COMPONENT_LABELS = [
{ name: 'Outer Ring', code: 'C-01', at: [0.3, 0.9], className: 'left-[6%] top-[24%]' },
{ name: 'Rolling Elements', code: 'C-02', at: [0.4, 0.9], className: 'right-[6%] top-[34%]' },
{ name: 'Cage', code: 'C-03', at: [0.48, 0.9], className: 'left-[8%] bottom-[30%]' },
{ name: 'Inner Ring', code: 'C-04', at: [0.55, 0.9], className: 'right-[8%] bottom-[24%]' }];


/**
 * Hero + scroll-driven bearing exploration. The camera, rotation, explosion
 * and measurement layer are all bound to one continuous scroll timeline.
 */
export function Hero3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start start', 'end end']
  });

  const explode = useTransform(scrollYProgress, [0.22, 0.55, 0.82, 0.95], [0, 1, 1, 0]);
  const rings = useTransform(scrollYProgress, [0.3, 0.46, 0.9, 1], [0, 1, 1, 0]);
  const spin = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.62, 1.1]);
  const cameraZ = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [4.9, 3.5, 3.9, 5.4]);
  const cameraY = useTransform(scrollYProgress, [0, 0.6, 1], [1.1, 0.5, 1.3]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);

  useEffect(() => {
    if (touch) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [touch]);

  return (
    <section
      ref={wrap}
      aria-label="KHS-LG precision bearings"
      className="relative h-[300vh] w-full bg-ink-950">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="industrial-grid absolute inset-0 opacity-40" aria-hidden />
        <BearingScene
          className="absolute inset-0"
          explode={explode}
          rings={rings}
          spin={spin}
          cameraZ={cameraZ}
          cameraY={cameraY}
          pointer={pointer}
          modelX={touch ? 0.45 : 1.1}
          /* Continues the loader's push-through: starts inside the bore and pulls back */
          initialCamera={[0, 0.35, 1.7]} />
        
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
            'radial-gradient(circle at 50% 55%, rgba(5,5,5,0) 35%, rgba(5,5,5,0.82) 100%)'
          }} />
        
        <div
          className="pointer-events-none absolute inset-0 z-[2] cursor-grab"
          data-cursor="drag"
          aria-hidden />
        

        {/* Hero copy */}
        <motion.div
          style={{ opacity: reduced ? 1 : heroOpacity, y: reduced ? 0 : heroY }}
          className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end pb-16 sm:pb-20">
          
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <div className="pointer-events-auto max-w-3xl">
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-tech text-steel-500">
                <span className="inline-block h-px w-8 bg-signal" />
                <span className="text-signal">{company.certification}</span>
                {company.experience}
              </p>
              <h1 className="mt-5 font-display text-[clamp(3.4rem,11vw,9rem)] font-bold uppercase leading-[0.84] text-steel-50">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="block">
                    
                    Precision
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="block text-signal">
                    
                    In Motion
                  </motion.span>
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="mt-7 max-w-xl text-[15px] leading-relaxed text-steel-300 sm:text-base">
                
                Precision bearing solutions engineered for reliable motion, performance and
                industrial excellence — trusted across industries worldwide.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="mt-9 flex flex-wrap items-center gap-3">
                
                <MagneticButton to="/products" variant="primary">
                  Explore Products
                </MagneticButton>
                <MagneticButton to="/contact" variant="ghost">
                  Request a Quote
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Component labels revealed while the bearing separates */}
        {COMPONENT_LABELS.map((label) =>
        <ComponentLabel
          key={label.code}
          label={label}
          progress={scrollYProgress} />

        )}

        <div className="pointer-events-none absolute bottom-6 right-5 z-[3] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-500 sm:flex sm:right-8">
          Scroll to explore
          <ArrowDownIcon className="h-3.5 w-3.5 animate-bounce text-signal" aria-hidden />
        </div>
      </div>
    </section>);

}

function ComponentLabel({
  label,
  progress



}: {label: (typeof COMPONENT_LABELS)[number];progress: ReturnType<typeof useScroll>['scrollYProgress'];}) {
  const opacity = useTransform(
    progress,
    [label.at[0] - 0.05, label.at[0], label.at[1], label.at[1] + 0.06],
    [0, 1, 1, 0]
  );
  const x = useTransform(progress, [label.at[0] - 0.05, label.at[0]], [10, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className={`pointer-events-none absolute z-[3] hidden md:block ${label.className}`}>
      
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-signal" />
        <div>
          <p className="font-mono text-[9px] uppercase tracking-tech text-signal">{label.code}</p>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-steel-50">
            {label.name}
          </p>
        </div>
      </div>
    </motion.div>);

}