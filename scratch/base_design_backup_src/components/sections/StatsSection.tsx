import { CountUp } from '../ui/CountUp';
import { TechnicalLabel } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { stats, Stat } from '../../data/company';

/** Industrial data dials — the numbers read like machine instrumentation. */
export function StatsSection() {
  return (
    <section
      aria-label="KHS-LG in numbers"
      className="relative border-t border-ink-700 bg-ink-950 py-12 lg:py-18">
      
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
  return (
    <div className="group relative overflow-hidden bg-ink-950 p-7 lg:p-9">
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
      <div
        className="absolute inset-x-0 bottom-0 h-px w-0 bg-signal transition-[width] duration-500 ease-precision group-hover:w-full"
        aria-hidden />
      
    </div>);

}