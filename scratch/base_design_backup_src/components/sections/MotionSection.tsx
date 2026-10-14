import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading, TechnicalLabel } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { BearingGlyph } from '../ui/BearingGlyph';
import { company } from '../../data/company';

export function MotionSection() {
  return (
    <section
      aria-labelledby="motion-heading"
      className="relative overflow-hidden border-t border-ink-700 bg-ink-900 py-12 lg:py-18">
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1600px] gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
        <div>
          <SectionHeading
            code="01 / Company"
            eyebrow="Engineered in India, running worldwide"
            lines={['Engineered for', 'Unstoppable Motion']}
            className="max-w-none" />
          
          <div id="motion-heading" className="sr-only">
            Engineered for unstoppable motion
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-300">
              {company.intro}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
              {[
              { k: 'Experience', v: '50+ Years' },
              { k: 'Certification', v: 'ISO 9001:2015' },
              { k: 'Entity', v: 'KHS Innovation & Engineering LLP' }].
              map((item) =>
              <div key={item.k} className="bg-ink-950 p-5">
                  <dt className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                    {item.k}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold uppercase leading-tight text-steel-50">
                    {item.v}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>

          <Reveal delay={0.22}>
            <Link
              to="/about"
              data-cursor="open"
              className="group mt-10 inline-flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-steel-50 transition-colors hover:text-signal">
              
              About KHS-LG
              <span className="relative h-px w-10 bg-signal transition-all duration-300 ease-precision group-hover:w-16" />
              <ArrowUpRightIcon className="h-4 w-4 text-signal" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-square w-full max-w-[520px] justify-self-end">
            <div className="absolute inset-0 opacity-90">
              <BearingGlyph />
            </div>
            <div className="absolute -left-2 top-1/2 hidden -translate-y-1/2 sm:block">
              <TechnicalLabel code="R-01">Radial</TechnicalLabel>
            </div>
            <div className="absolute -right-2 bottom-8 hidden sm:block">
              <TechnicalLabel code="A-02">Axial</TechnicalLabel>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}