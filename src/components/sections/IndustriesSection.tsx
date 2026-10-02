import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { BearingGlyph } from '../ui/BearingGlyph';
import { industries } from '../../data/industries';

export function IndustriesSection() {
  return (
    <section
      aria-label="Industries served"
      className="relative border-t border-ink-700 bg-ink-950 py-16 lg:py-24">
      
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          code="04 / Industries"
          eyebrow="Manufacturing · Industrial · Automobile"
          lines={['Motion that', 'Industries trust']} />
        

        <div className="mt-10 grid gap-px border border-ink-700 bg-ink-700 lg:grid-cols-3">
          {industries.map((industry, i) =>
          <Reveal key={industry.slug} delay={i * 0.06} className="h-full">
              <article className="group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden bg-ink-900 p-8 lg:p-10">
                <div
                className="absolute inset-0 opacity-40 transition-opacity duration-500 ease-precision group-hover:opacity-70"
                aria-hidden
                style={{
                  background:
                  'linear-gradient(160deg, rgba(26,26,26,1) 0%, rgba(5,5,5,1) 70%)'
                }} />
              
                <div
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-[0.13] transition-all duration-700 ease-precision group-hover:opacity-25 group-hover:scale-105"
                aria-hidden>
                
                  <BearingGlyph rollers={10} shape={i === 2 ? 'roller' : 'ball'} />
                </div>

                <div className="relative">
                  <p className="font-mono text-[9px] uppercase tracking-tech text-signal">
                    {industry.code}
                  </p>
                  <h3 className="mt-6 font-display text-3xl font-bold uppercase leading-none text-steel-50 lg:text-4xl">
                    {industry.name}
                  </h3>
                  <p className="mt-4 font-display text-lg font-medium uppercase tracking-[0.04em] text-steel-400">
                    {industry.headline}
                  </p>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-500">
                    {industry.body}
                  </p>
                </div>

                <div className="relative mt-10">
                  <ul className="space-y-1.5">
                    {industry.points.map((point) =>
                  <li
                    key={point}
                    className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
                    
                        <span className="h-1 w-1 bg-signal" aria-hidden />
                        {point}
                      </li>
                  )}
                  </ul>
                  <Link
                  to="/industries"
                  data-cursor="open"
                  className="mt-7 inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-steel-50 transition-colors hover:text-signal">
                  
                    View industry
                    <ArrowUpRightIcon className="h-3.5 w-3.5 text-signal" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}