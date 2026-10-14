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
    <div className="group relative overflow-hidden bg-ink-950 p-7 transition-all duration-300 hover:bg-ink-900 lg:p-9">
      <div className="min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
            {String(index + 1).padStart(2, '0')}
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-signal/30 transition-all duration-300 group-hover:bg-signal group-hover:shadow-[0_0_8px_#F5C400]" />
        </div>
        <p
          className={
          primary ?
          'mt-4 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-bold leading-none text-gradient-gold drop-shadow-[0_2px_18px_rgba(245,196,0,0.25)] tabular-nums' :
          'mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none text-steel-50 transition-colors duration-300 group-hover:text-signal tabular-nums'
          }>
          
          <CountUp value={stat.value} suffix={stat.suffix} />
        </p>
        <p className="mt-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-signal">
          {stat.label}
        </p>
        <p className="mt-1.5 text-xs text-steel-500">{stat.note}</p>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-signal shadow-[0_0_8px_#F5C400] transition-[width] duration-500 ease-precision group-hover:w-full"
        aria-hidden />
      
    </div>);
}