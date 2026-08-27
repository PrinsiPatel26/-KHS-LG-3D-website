import { PageHero } from '../components/layout/PageHero';
import { QualitySection } from '../components/sections/QualitySection';
import { CTASection } from '../components/sections/CTASection';
import { Reveal } from '../components/ui/RevealText';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { company, inspectionProcess } from '../data/company';
import { useSeo } from '../hooks/useSeo';

export function Quality() {
  useSeo({
    title: 'Quality',
    description:
    'The KHS-LG pre-dispatch bearing inspection process — measure, inspect, verify, precision, dispatch. ISO 9001:2015.',
    path: '/quality'
  });

  return (
    <main>
      <PageHero
        code="Quality"
        eyebrow={`${company.certification} · Pre-dispatch inspection`}
        lines={['Verified before', 'It ever ships']}
        body="KHS-LG runs a pre-dispatch bearing inspection process so that quality is confirmed before delivery, not after."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Quality' }]} />
      

      <section aria-label="Inspection stages" className="border-b border-ink-700 bg-ink-900 py-20">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <TechnicalLabel code="Process">Measure → Inspect → Verify → Precision → Dispatch</TechnicalLabel>
          <ol className="mt-10 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-5">
            {inspectionProcess.map((step, i) =>
            <li key={step.code} className="bg-ink-950 p-7">
                <Reveal delay={i * 0.05}>
                  <p className="font-display text-3xl font-bold text-signal">{step.code}</p>
                  <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-[0.12em] text-steel-50">
                    {step.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-steel-500">{step.body}</p>
                </Reveal>
              </li>
            )}
          </ol>
        </div>
      </section>

      <QualitySection />
      <CTASection />
    </main>);

}