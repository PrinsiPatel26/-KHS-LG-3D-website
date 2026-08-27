import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { BearingGlyph } from '../ui/BearingGlyph';
import { performanceAxes } from '../../data/applications';

/** Built for performance — rotation and indicators driven by scroll position. */
export function PerformanceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 155]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.04, 0.94]);
  const ringScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1.15]);
  const ringOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.85], [0, 0.7, 0]);

  return (
    <section
      ref={ref}
      aria-label="Performance"
      className="relative overflow-hidden border-t border-ink-700 bg-ink-950 py-24 lg:py-32">
      
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          code="08 / Performance"
          eyebrow="What we engineer for"
          lines={['Built for', 'Performance']} />
        

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <motion.div style={{ scale: ringScale, opacity: ringOpacity }} className="absolute inset-0">
              <div className="h-full w-full rounded-full border border-signal/50" />
            </motion.div>
            <motion.div style={{ rotate, scale }} className="absolute inset-[6%]">
              <BearingGlyph rollers={16} />
            </motion.div>
          </div>

          <ol className="grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2">
            {performanceAxes.map((axis, i) =>
            <PerformanceRow key={axis.code} axis={axis} index={i} progress={scrollYProgress} />
            )}
          </ol>
        </div>
      </div>
    </section>);

}

function PerformanceRow({
  axis,
  index,
  progress




}: {axis: (typeof performanceAxes)[number];index: number;progress: ReturnType<typeof useScroll>['scrollYProgress'];}) {
  const start = 0.18 + index * 0.07;
  const width = useTransform(progress, [start, start + 0.2], ['0%', '100%']);

  return (
    <li className="group bg-ink-900 p-6 lg:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-steel-50">
          {axis.name}
        </p>
        <span className="font-mono text-[9px] uppercase tracking-tech text-signal">
          {axis.code}
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-ink-700">
        <motion.div style={{ width }} className="h-px bg-signal" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-steel-500">{axis.body}</p>
    </li>);

}