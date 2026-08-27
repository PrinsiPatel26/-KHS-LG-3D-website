import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import { BearingScene } from '../3d/BearingScene';
import { TechnicalLabel } from '../ui/SectionHeading';
import { RevealText } from '../ui/RevealText';
import { RollerShape } from '../3d/BearingModel';
import { useNearViewport } from '../../hooks/useNearViewport';

const DEFAULT_PARTS = ['Outer Ring', 'Rolling Elements', 'Cage', 'Inner Ring'];

/**
 * Scroll-driven exploded bearing with technical labels — the anatomy of a
 * precision bearing, revealed component by component.
 */
export function ProductExplorer({
  parts = DEFAULT_PARTS,
  rollerShape = 'ball',
  title = ['Anatomy of', 'A precision bearing'],
  code = 'EXP / 01'





}: {parts?: string[];rollerShape?: RollerShape;title?: string[];code?: string;}) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const explode = useTransform(scrollYProgress, [0.1, 0.55, 0.85, 1], [0, 1, 1, 0.15]);
  const rings = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const cameraZ = useTransform(scrollYProgress, [0, 0.6, 1], [5.2, 4.2, 4.8]);
  const cameraY = useTransform(scrollYProgress, [0, 1], [1.2, 0.7]);

  return (
    <section
      ref={ref}
      aria-label="Exploded bearing view"
      className="relative h-[260vh] border-t border-ink-700 bg-ink-900">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="industrial-grid absolute inset-0 opacity-25" aria-hidden />
        {near &&
        <BearingScene
          className="absolute inset-0"
          explode={explode}
          rings={rings}
          spin={0.34}
          cameraZ={cameraZ}
          cameraY={cameraY}
          rollerShape={rollerShape}
          grid={false} />

        }
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
            'radial-gradient(circle at 50% 50%, rgba(11,11,11,0) 40%, rgba(11,11,11,0.9) 100%)'
          }} />
        

        <div className="relative flex h-full flex-col justify-between py-24 lg:py-28">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <TechnicalLabel code={code}>Component separation</TechnicalLabel>
            <RevealText
              as="h2"
              lines={title}
              accentLast
              className="mt-5 max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] font-bold text-steel-50" />
            
          </div>

          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <ol className="grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
              {parts.map((part, i) =>
              <PartRow
                key={part}
                part={part}
                index={i}
                total={parts.length}
                progress={scrollYProgress} />

              )}
            </ol>
          </div>
        </div>
      </div>
    </section>);

}

function PartRow({
  part,
  index,
  total,
  progress





}: {part: string;index: number;total: number;progress: MotionValue<number>;}) {
  const start = 0.16 + index / total * 0.5;
  const opacity = useTransform(progress, [start - 0.06, start], [0.28, 1]);
  const width = useTransform(progress, [start - 0.06, start + 0.08], ['0%', '100%']);

  return (
    <li className="relative overflow-hidden bg-ink-950/85 px-5 py-5">
      <motion.div style={{ opacity }}>
        <p className="font-mono text-[9px] uppercase tracking-tech text-signal">
          C-{String(index + 1).padStart(2, '0')}
        </p>
        <p className="mt-2 font-display text-lg font-semibold uppercase tracking-[0.12em] text-steel-50">
          {part}
        </p>
      </motion.div>
      <motion.div style={{ width }} className="absolute inset-x-0 bottom-0 h-px bg-signal" />
    </li>);

}