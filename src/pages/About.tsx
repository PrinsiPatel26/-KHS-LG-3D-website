import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PageHero } from '../components/layout/PageHero';
import { StatsSection } from '../components/sections/StatsSection';
import { GlobalPresence } from '../components/sections/GlobalPresence';
import { CTASection } from '../components/sections/CTASection';
import { Reveal } from '../components/ui/RevealText';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { DealerNetworkSection } from '../components/network/DealerNetworkSection';
import { ExportFootprintSection } from '../components/network/ExportFootprintSection';
import { company, timeline } from '../data/company';
import { useSeo } from '../hooks/useSeo';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useSeo({
    title: 'About KHS-LG',
    description:
    'KHS Innovation & Engineering LLP is a one-stop destination for all types of bearing solutions, with over 50+ years of experience.',
    path: '/about'
  });

  return (
    <main>
      <PageHero
        code="About"
        eyebrow={`${company.legalName} · ${company.experience}`}
        lines={['The name behind', 'Unstoppable motion']}
        body={company.intro}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About KHS-LG' }]} />
      

      <section aria-label="Company story" className="relative bg-ink-900 py-20 lg:py-28">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <TechnicalLabel code="Story">
            Foundation → Experience → Engineering → Expansion → Global presence
          </TechnicalLabel>

          <div ref={ref} className="mt-14 grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <ol className="relative pl-10">
              <div className="absolute left-[11px] top-2 h-full w-px bg-ink-700" aria-hidden />
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-[11px] top-2 w-px bg-signal"
                aria-hidden />
              
              {timeline.map((item, i) =>
              <li key={item.step} className="relative pb-12 last:pb-0">
                  <Reveal delay={i * 0.05}>
                    <span
                    className="absolute -left-10 top-1.5 flex h-6 w-6 items-center justify-center border border-signal/60 bg-ink-950"
                    aria-hidden>
                    
                      <span className="h-1.5 w-1.5 bg-signal" />
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-tech text-signal">
                      {String(i + 1).padStart(2, '0')} / {item.step}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight text-steel-50 sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel-400">
                      {item.body}
                    </p>
                  </Reveal>
                </li>
              )}
            </ol>

            <div className="relative hidden lg:block">
              <div className="sticky top-32 aspect-square w-full max-w-[420px] opacity-80">
                <BearingGlyph rollers={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <DealerNetworkSection />
      <ExportFootprintSection />
      <GlobalPresence />
      <CTASection />
    </main>);

}