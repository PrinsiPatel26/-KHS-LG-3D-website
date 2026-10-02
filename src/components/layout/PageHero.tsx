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
  const showCatalogueBearing = code === 'KHS-LG / Catalogue';

  return (
    <header className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-6 pt-12 sm:pb-8 sm:pt-16 lg:pb-10 lg:pt-20">
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

        <div className="mt-5 sm:mt-6">
          <TechnicalLabel code={code}>{eyebrow}</TechnicalLabel>
          <RevealText
            as="h1"
            lines={lines}
            accentLast
            className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.88] text-steel-50" />

          {showCatalogueBearing && (
            <div className="relative mx-auto mt-4 flex h-36 w-full max-w-[1320px] items-center justify-center overflow-hidden sm:mt-5 sm:h-48 md:h-56 lg:h-64 xl:h-[22rem] lg:justify-end">
              <img
                src="/cylindrical%20roller%20bearing.webp"
                alt="Cylindrical roller bearing"
                className="catalogue-hero-image h-full w-auto max-w-full object-contain"
              />
            </div>
          )}
          
          {body &&
          <Reveal delay={0.12}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-400">{body}</p>
            </Reveal>
          }
        </div>
      </div>
    </header>);

}