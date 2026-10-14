import { PageHero } from '../components/layout/PageHero';
import { ApplicationsSection } from '../components/sections/ApplicationsSection';
import { CTASection } from '../components/sections/CTASection';
import { useSeo } from '../hooks/useSeo';

export function Applications() {
  useSeo({
    title: 'Applications',
    description:
    'Where KHS-LG bearings work: industrial machinery, manufacturing equipment, automotive assemblies and automation systems.',
    path: '/applications'
  });

  return (
    <main>
      <PageHero
        code="Applications"
        eyebrow="Verified KHS-LG application areas"
        lines={['Where motion', 'Matters']}
        body="From plant machinery to automation systems, the KHS-LG range is specified around how the assembly actually moves."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Applications' }]} />
      
      <ApplicationsSection hideHeading />
      
      {/* Transitional spacer between exploded product view and contact CTA */}
      <section className="relative border-t border-ink-800 bg-ink-950 py-24 sm:py-32 lg:py-40 overflow-hidden" aria-hidden>
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_rgba(255,245,138,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-tech text-steel-400">
              Custom Engineering &bull; Application Matching &bull; Global Dispatch
            </span>
          </div>
          <div className="hidden h-px flex-1 max-w-md bg-ink-800 lg:block" />
          <span className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
            KHS-LG &bull; 4,500+ Specifications Available
          </span>
        </div>
      </section>

      <CTASection />
    </main>);

}