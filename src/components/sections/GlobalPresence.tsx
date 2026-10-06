import { Globe } from '../3d/Globe';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { markets } from '../../data/company';
import { useNearViewport } from '../../hooks/useNearViewport';

export function GlobalPresence({ code = '09 / Global' }: { code?: string }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();

  return (
    <section
      ref={ref}
      aria-label="Global presence"
      className="relative border-t border-ink-700 bg-ink-900 py-16 lg:py-20">
      
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              code={code}
              eyebrow="35+ export countries"
              lines={['Motion shipped', 'Worldwide']}
              body="KHS-LG bearings reach customers across Asia, Europe, Africa, the Middle East and South America through a distributor network built over five decades." />
            
            <Reveal delay={0.12}>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {markets.map((m) =>
                <li
                  key={m.country}
                  className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-steel-400">
                  
                    <span className="h-1 w-1 shrink-0 bg-signal" aria-hidden />
                    {m.country}
                  </li>
                )}
              </ul>
            </Reveal>
          </div>

          <div className="relative aspect-square w-full">
            {near && <Globe className="absolute inset-0" />}
          </div>
        </div>
      </div>
    </section>);

}