import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { BearingScene } from '../3d/BearingScene';
import { RevealText, Reveal } from '../ui/RevealText';
import { TechnicalLabel } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';
import { company } from '../../data/company';
import { useNearViewport } from '../../hooks/useNearViewport';

/** Closing shot: the bearing slows into frame as the CTA resolves. */
export function CTASection() {
  const [ref, near] = useNearViewport<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start end', 'end end']
  });

  const spin = useTransform(scrollYProgress, [0, 1], [0.18, 0.72]);
  const rings = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const cameraZ = useTransform(scrollYProgress, [0, 1], [6.2, 4.4]);

  return (
    <section
      ref={ref}
      aria-label="Contact KHS-LG"
      className="relative flex min-h-[440px] items-center overflow-hidden border-t border-ink-700 bg-ink-950 py-14 lg:min-h-[500px] lg:py-18">
      
      {near &&
      <BearingScene
        className="absolute inset-0"
        spin={spin}
        rings={rings}
        cameraZ={cameraZ}
        cameraY={0.6}
        grid={false} />

      }
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
          'radial-gradient(circle at 50% 50%, rgba(5,5,5,0.55) 20%, rgba(5,5,5,0.95) 75%)'
        }} />
      

      <div className="relative mx-auto w-full max-w-[1600px] px-5 text-center sm:px-8">
        <TechnicalLabel code="10 / Contact" className="justify-center">
          Let us specify the right bearing
        </TechnicalLabel>
        <RevealText
          as="h2"
          lines={["Let's build", 'Better motion.']}
          accentLast
          className="mt-6 text-[clamp(2.6rem,8vw,6.5rem)] font-bold text-steel-50" />
        
        <Reveal delay={0.14}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-steel-400">
            Tell us the application and the motion you need. The KHS-LG team will help specify the
            bearing from a range of 4,500+ products.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton to="/contact" variant="yellow">
              Request a Quote
            </MagneticButton>
            <MagneticButton href={company.emailHref} variant="ghost" icon={<MailIcon className="h-4 w-4" aria-hidden />}>
              {company.email}
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <a
            href={company.phoneHref}
            className="mt-8 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-steel-500 transition-colors hover:text-signal">
            
            <PhoneIcon className="h-3.5 w-3.5 text-signal" aria-hidden />
            {company.phone}
          </a>
        </Reveal>
      </div>
    </section>);

}