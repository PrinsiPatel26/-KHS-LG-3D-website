import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { RevealText, Reveal } from '../ui/RevealText';
import { TechnicalLabel } from '../ui/SectionHeading';

export function PageHero({
  code,
  eyebrow,
  lines,
  body,
  breadcrumb






}: {code: string;eyebrow: string;lines: string[];body?: string;breadcrumb: {label: string;to?: string;}[];}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-48">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.07]"
        aria-hidden
        style={{
          background: 'radial-gradient(circle, rgba(245,180,0,0.9) 0%, transparent 62%)'
        }} />
      
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
            {breadcrumb.map((crumb, i) =>
            <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRightIcon className="h-3 w-3 text-ink-600" aria-hidden />}
                {crumb.to ?
              <Link className="transition-colors hover:text-signal" to={crumb.to}>
                    {crumb.label}
                  </Link> :

              <span className="text-signal">{crumb.label}</span>
              }
              </li>
            )}
          </ol>
        </nav>

        <div className="mt-10">
          <TechnicalLabel code={code}>{eyebrow}</TechnicalLabel>
          <RevealText
            as="h1"
            lines={lines}
            accentLast
            className="mt-5 text-[clamp(2.6rem,7vw,6rem)] font-bold text-steel-50" />
          
          {body &&
          <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-steel-400">{body}</p>
            </Reveal>
          }
        </div>
      </div>
    </header>);

}