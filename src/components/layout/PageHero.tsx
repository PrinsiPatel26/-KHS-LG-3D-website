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






}: {code: string;eyebrow: string;lines: string[];body?: string;breadcrumb?: {label: string;to?: string;}[];}) {
  const showCatalogueBearing = code === 'KHS-LG / Catalogue';

  return (
    <header className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-6 pt-24 sm:pb-8 sm:pt-26 lg:pb-8 lg:pt-28">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.07]"
        aria-hidden
        style={{
          background: 'radial-gradient(circle, rgba(245,180,0,0.9) 0%, transparent 62%)'
        }} />
      
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          <div className="max-w-3xl">
            <TechnicalLabel code={code}>{eyebrow}</TechnicalLabel>
            <RevealText
              as="h1"
              lines={lines}
              accentLast
              className="mt-2 text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.9] text-steel-50"
            />
            {body && (
              <Reveal delay={0.12}>
                <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-steel-400">{body}</p>
              </Reveal>
            )}
          </div>

          {showCatalogueBearing && (
            <div className="relative flex shrink-0 items-center justify-center lg:justify-end">
              <img
                src="/assets/products/cylindrical-roller-bearing.png"
                alt="Cylindrical roller bearing"
                className="catalogue-hero-image h-36 w-auto max-w-[260px] sm:h-44 sm:max-w-[320px] lg:h-52 lg:max-w-[380px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          )}
        </div>
      </div>
    </header>);

}