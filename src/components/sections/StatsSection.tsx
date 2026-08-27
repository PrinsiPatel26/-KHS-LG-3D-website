import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from '../ui/CountUp';
import { TechnicalLabel } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { stats, Stat } from '../../data/company';

/** Industrial data dials — the numbers read like machine instrumentation. */
export function StatsSection() {
  return (
    <section
      aria-label="KHS-LG in numbers"
      className="relative border-t border-ink-700 bg-ink-950 py-24 lg:py-28">
      
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <Reveal>
          <TechnicalLabel code="02 / Scale">Verified company figures</TechnicalLabel>
        </Reveal>

        <div className="mt-12 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) =>
          <Dial key={stat.label} stat={stat} index={i} primary={i === 0} />
          )}
        </div>
      </div>
    </section>);

}

function Dial({ stat, index, primary }: {stat: Stat;index: number;primary: boolean;}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const ticks = new Array(32).fill(0);

  return (
    <div ref={ref} className="group relative overflow-hidden bg-ink-950 p-7 lg:p-9">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
            {String(index + 1).padStart(2, '0')}
          </p>
          <p
            className={
            primary ?
            'mt-4 font-display text-[clamp(2.6rem,5vw,4rem)] font-bold leading-none text-steel-50 tabular-nums' :
            'mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-none text-steel-50 tabular-nums'
            }>
            
            <CountUp value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-signal">
            {stat.label}
          </p>
          <p className="mt-1.5 text-xs text-steel-500">{stat.note}</p>
        </div>

        {/* Rotating mechanical dial */}
        <div className="relative h-16 w-16 shrink-0 lg:h-20 lg:w-20">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            <g>
              {ticks.map((_, t) => {
                const a = t / ticks.length * Math.PI * 2;
                const long = t % 4 === 0;
                const r1 = long ? 34 : 38;
                return (
                  <line
                    key={t}
                    x1={50 + Math.cos(a) * r1}
                    y1={50 + Math.sin(a) * r1}
                    x2={50 + Math.cos(a) * 43}
                    y2={50 + Math.sin(a) * 43}
                    stroke={long ? '#8C8C8C' : '#2f2f2f'}
                    strokeWidth="1" />);


              })}
            </g>
            <motion.g
              initial={{ rotate: -110 }}
              animate={inView ? { rotate: 118 } : { rotate: -110 }}
              transition={{ duration: 1.5, delay: 0.1 + index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformOrigin: '50px 50px' }}>
              
              <line x1="50" y1="50" x2="50" y2="14" stroke="#FFF58A" strokeWidth="2" />
            </motion.g>
            <circle cx="50" cy="50" r="4" fill="#0B0B0B" stroke="#8C8C8C" strokeWidth="1" />
          </svg>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-px w-0 bg-signal transition-[width] duration-500 ease-precision group-hover:w-full"
        aria-hidden />
      
    </div>);

}