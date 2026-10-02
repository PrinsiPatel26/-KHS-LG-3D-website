import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { BearingGlyph } from '../ui/BearingGlyph';
import { applications } from '../../data/applications';

/** Where motion matters — a technical index, not a card grid. */
export function ApplicationsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-label="Applications"
      className="relative border-t border-ink-700 bg-ink-900 py-12 lg:py-18">
      
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          code="05 / Applications"
          eyebrow="Verified KHS-LG application areas"
          lines={['Where motion', 'Matters']} />
        

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
          <ul className="border-t border-ink-700">
            {applications.map((app, i) =>
            <li key={app.code} className="border-b border-ink-700">
                <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={active === i}
                className="group flex w-full items-start gap-6 py-7 text-left">
                
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-tech text-signal">
                    {app.code}
                  </span>
                  <span className="flex-1">
                    <span
                    className={`block font-display text-2xl font-semibold uppercase leading-tight transition-colors duration-300 sm:text-3xl ${
                    active === i ? 'text-signal' : 'text-steel-50'}`
                    }>
                    
                      {app.name}
                    </span>
                    <span className="mt-2 block max-w-lg text-sm leading-relaxed text-steel-500">
                      {app.body}
                    </span>
                    <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
                      {app.bearings.join(' · ')}
                    </span>
                  </span>
                  <span
                  className={`mt-3 h-px transition-all duration-300 ease-precision ${
                  active === i ? 'w-14 bg-signal' : 'w-6 bg-ink-600'}`
                  }
                  aria-hidden />
                
                </button>
              </li>
            )}
          </ul>

          <Reveal className="relative hidden lg:block">
            <div className="sticky top-32 aspect-square w-full max-w-[440px]">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="h-full w-full">
                
                <BearingGlyph
                  rollers={active % 2 === 0 ? 12 : 14}
                  shape={active === 3 ? 'linear' : active === 0 ? 'roller' : 'ball'} />
                
              </motion.div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-tech text-steel-500">
                {applications[active].code} /{' '}
                <span className="text-signal">{applications[active].name}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);

}