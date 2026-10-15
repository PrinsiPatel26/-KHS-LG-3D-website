import React from 'react';
import { MailIcon, PhoneIcon, ArrowRightIcon, Disc3Icon, MoveHorizontalIcon, GitCommitIcon } from 'lucide-react';
import { RevealText, Reveal } from '../ui/RevealText';
import { TechnicalLabel } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';
import { company } from '../../data/company';

/**
 * Final CTA Section:
 * Focuses on full multi-product motion solutions (Bearings, Linear Motion, Power Transmission)
 * with approved messaging, direct quote action, and bearing finder link.
 */
export function CTASection() {
  return (
    <section
      aria-label="Contact KHS-LG"
      className="relative flex min-h-[520px] items-center overflow-hidden border-t border-ink-700 bg-ink-950 py-20 lg:min-h-[580px] lg:py-28"
    >
      {/* Background Precision Engineering Matrix (Bearings + Linear Motion + Power Transmission) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Subtle radial gold spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(245,196,0,0.08) 0%, rgba(5,5,5,0.7) 65%, rgba(5,5,5,0.98) 100%)'
          }}
        />

        {/* Blueprint precision grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F5C400 1px, transparent 1px), linear-gradient(to bottom, #F5C400 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* Multi-product motion category visual anchors */}
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-10 lg:px-24">
          {/* Rotary Bearing Indicator */}
          <div className="hidden flex-col items-center gap-2 lg:flex">
            <Disc3Icon className="h-44 w-44 animate-spin-slow text-signal" strokeWidth={1} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal">Rotary Bearings</span>
          </div>

          {/* Linear Motion Indicator */}
          <div className="hidden flex-col items-center gap-2 xl:flex">
            <MoveHorizontalIcon className="h-32 w-32 text-signal" strokeWidth={1} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal">Linear Motion</span>
          </div>

          {/* Power Transmission Indicator */}
          <div className="hidden flex-col items-center gap-2 lg:flex">
            <GitCommitIcon className="h-40 w-40 text-signal" strokeWidth={1} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal">Power Transmission</span>
          </div>
        </div>

        {/* Precision crosshair markers */}
        <div className="absolute left-8 top-8 font-mono text-[9px] uppercase tracking-tech text-steel-700">
          SEC // 07 • MOTION SPECIFICATION
        </div>
        <div className="absolute right-8 top-8 font-mono text-[9px] uppercase tracking-tech text-steel-700">
          ISO 9001:2015 CERTIFIED
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 text-center sm:px-8">
        <Reveal>
          <TechnicalLabel code="07 / Next Step" className="justify-center">
            One source for industrial motion
          </TechnicalLabel>
        </Reveal>

        <RevealText
          as="h2"
          lines={["LET'S BUILD", 'BETTER MOTION.']}
          accentLast
          className="mt-6 text-[clamp(2.4rem,7vw,5.5rem)] font-bold tracking-tight text-steel-50"
        />

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-steel-300">
            Share your bearing number, dimensions or application requirements. Our technical sales team
            will help identify the right KHS-LG solution.
          </p>
        </Reveal>

        {/* Multi-product category assurance pill strip */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/90 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-steel-200">
                Bearings
              </span>
            </div>
            <span className="font-mono text-steel-600">•</span>
            <div className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/90 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-steel-200">
                Linear Motion
              </span>
            </div>
            <span className="font-mono text-steel-600">•</span>
            <div className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/90 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-steel-200">
                Power Transmission
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton to="/contact" variant="yellow" icon={<ArrowRightIcon className="h-4 w-4" aria-hidden />}>
              Request a Quote
            </MagneticButton>
            <MagneticButton to="/products" variant="ghost">
              Find Your Bearing
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-ink-800/80 pt-6">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-steel-400 transition-colors hover:text-signal"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-signal" aria-hidden />
              <span>{company.phone}</span>
            </a>
            <span className="hidden sm:inline text-ink-700">|</span>
            <a
              href={company.salesEmailHref}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-steel-400 transition-colors hover:text-signal"
            >
              <MailIcon className="h-3.5 w-3.5 text-signal" aria-hidden />
              <span>{company.salesEmail}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}