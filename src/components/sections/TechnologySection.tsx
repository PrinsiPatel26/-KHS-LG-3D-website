import { motion } from 'framer-motion';
import { CpuIcon, RulerIcon, SettingsIcon, WrenchIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';

const PILLARS = [
{
  code: 'T-01',
  icon: CpuIcon,
  title: 'High technology products',
  body: 'The products and services offered by KHS-LG are high technology, built to support demanding motion systems.'
},
{
  code: 'T-02',
  icon: RulerIcon,
  title: 'Design assistance',
  body: 'KHS-LG assists manufacturers in their product design, matching bearing geometry to the application.'
},
{
  code: 'T-03',
  icon: SettingsIcon,
  title: 'Complete bearing range',
  body: 'A 4,500+ product range spanning ball, roller and linear motion bearings from one source.'
},
{
  code: 'T-04',
  icon: WrenchIcon,
  title: 'Applied experience',
  body: 'Over 50 years of bearing experience applied across manufacturing, industrial and automobile work.'
}];


export function TechnologySection({ code = '07 / Technology', hideHeading = false }: { code?: string; hideHeading?: boolean }) {
  return (
    <section
      aria-label="Technology"
      className={`relative overflow-hidden border-t border-ink-700 bg-ink-900 ${hideHeading ? 'py-8 lg:py-12' : 'py-12 lg:py-18'}`}>
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      {/* Slow yellow inspection sweep across the facility grid */}
      <motion.div
        aria-hidden
        initial={{ x: '-30%' }}
        animate={{ x: '130%' }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-y-0 w-40 opacity-40"
        style={{
          background:
          'linear-gradient(90deg, transparent 0%, rgba(245,180,0,0.09) 50%, transparent 100%)'
        }} />
      

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        {!hideHeading && (
          <SectionHeading
            code={code}
            eyebrow="Engineering behind the range"
            lines={['Precision is', 'A process']} />
        )}
        

        <div className={`${hideHeading ? 'mt-2' : 'mt-8'} grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 xl:grid-cols-4`}>
          {PILLARS.map((pillar, i) =>
          <Reveal key={pillar.code} delay={i * 0.05} className="h-full">
              <article className="group relative flex h-full flex-col bg-ink-950 p-7 lg:p-9">
                <div className="flex items-center justify-between">
                  <pillar.icon className="h-6 w-6 text-signal" aria-hidden />
                  <span className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold uppercase leading-tight text-steel-50">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-500">{pillar.body}</p>
                <div className="mt-auto pt-8" aria-hidden>
                  <div className="measure-marks h-1.5 w-full opacity-25 transition-opacity duration-500 group-hover:opacity-70" />
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}