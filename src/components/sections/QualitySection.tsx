import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import { BearingScene } from '../3d/BearingScene';
import { TechnicalLabel } from '../ui/SectionHeading';
import { RevealText } from '../ui/RevealText';
import { inspectionProcess } from '../../data/company';
import { useNearViewport } from '../../hooks/useNearViewport';

/**
 * Pre-dispatch inspection, told as a cinematic scan. Each scroll step runs a
 * single yellow inspection sweep across the bearing.
 */
export function QualitySection() {
  const [mountRef, near] = useNearViewport<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: mountRef,
    offset: ['start start', 'end end']
  });

  const steps = inspectionProcess.length;
  const scan = useTransform(scrollYProgress, (v) => v * steps % 1);
  const explode = useTransform(scrollYProgress, [0.45, 0.7], [0, 0.35]);
  const cameraZ = useTransform(scrollYProgress, [0, 1], [4.6, 3.6]);
  const activeIndex = useTransform(scrollYProgress, (v) =>
  Math.min(steps - 1, Math.floor(v * steps))
  );

  return (
    <section
      ref={mountRef}
      aria-label="Pre-dispatch bearing inspection process"
      className="relative h-[280vh] border-t border-ink-700 bg-ink-950">
      
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
        {near &&
        <BearingScene
          className="absolute inset-0"
          scan={scan}
          rings={1}
          explode={explode}
          spin={0.42}
          cameraZ={cameraZ}
          grid={false}
          particles={false} />

        }
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
            'linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.5) 45%, rgba(5,5,5,0.9) 100%)'
          }} />
        

        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="max-w-xl">
            <TechnicalLabel code="06 / Quality">Pre-dispatch bearing inspection</TechnicalLabel>
            <RevealText
              as="h2"
              lines={['Verified before', 'It ever ships']}
              accentLast
              className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-steel-50" />
            
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-steel-400">
              Every bearing passes through the KHS-LG pre-dispatch inspection process before it
              leaves for the customer.
            </p>

            <ol className="mt-10 space-y-px border border-ink-700 bg-ink-700">
              {inspectionProcess.map((step, i) =>
              <ProcessStep key={step.code} step={step} index={i} active={activeIndex} />
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>);

}

function ProcessStep({
  step,
  index,
  active




}: {step: (typeof inspectionProcess)[number];index: number;active: MotionValue<number>;}) {
  const opacity = useTransform(active, (v: number) => v === index ? 1 : 0.4);
  const width = useTransform(active, (v: number) => v >= index ? '100%' : '0%');

  return (
    <li className="relative overflow-hidden bg-ink-950/90">
      <motion.div style={{ opacity }} className="flex min-w-0 items-start gap-5 px-5 py-4">
        <span className="font-mono text-[10px] uppercase tracking-tech text-signal">
          {step.code}
        </span>
        <span className="min-w-0 break-words font-display text-lg font-semibold uppercase tracking-[0.14em] text-steel-50">
          {step.name}
        </span>
        <span className="hidden flex-1 text-xs text-steel-500 sm:block">{step.body}</span>
      </motion.div>
      <motion.div style={{ width }} className="absolute inset-x-0 bottom-0 h-px bg-signal" />
    </li>);

}