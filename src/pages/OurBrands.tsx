import type { CSSProperties } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useSeo } from '../hooks/useSeo';

export function OurBrands() {
  useSeo({
    title: 'Our Brands | IKO, WON ST & STIEBER',
    description: 'Explore global industrial brands supplied by KHS-LG including IKO, WON ST and STIEBER.',
    path: '/our-brands'
  });

  return (
    <main>
      <section className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-6 pt-24 sm:pb-8 sm:pt-26 lg:pb-8 lg:pt-28">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, rgba(245,180,0,0.9) 0%, transparent 62%)' }} aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="max-w-5xl">
            <TechnicalLabel code="Our brands">Global industrial partners</TechnicalLabel>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase leading-[0.86] text-steel-50">Engineered partners.<br /><span className="text-signal">Global expertise.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400">KHS-LG works with established industrial brands to provide customers with precision bearing, linear motion and power transmission solutions for demanding applications.</p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 py-12 lg:py-18">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 border-b border-ink-700 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div><TechnicalLabel code="01 / Portfolio">Three specialist brands</TechnicalLabel><h2 className="mt-4 font-display text-4xl font-bold uppercase text-steel-50 sm:text-5xl">Precision, motion, control.</h2></div>
            <p className="max-w-md text-sm leading-relaxed text-steel-500">Distinct product expertise, connected through one KHS-LG supply experience.</p>
          </div>
          <div className="mt-8 grid gap-px border border-ink-700 bg-ink-700 lg:grid-cols-3">
            {brands.map((brand, index) => (
              <article key={brand.slug} className="group relative overflow-hidden bg-ink-950 p-6 sm:p-8" style={{ '--brand-accent': brand.accent, '--brand-accent-soft': brand.accentSoft } as CSSProperties}>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 85% 5%, ${brand.accentSoft}, transparent 38%)` }} aria-hidden />
                <div className="relative flex min-h-[480px] flex-col">
                  <div className="flex items-start justify-between"><span className="font-mono text-[10px] tracking-tech text-steel-600">0{index + 1}</span><span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand.accent, boxShadow: `0 0 22px ${brand.accent}` }} aria-hidden /></div>
                  <div className="mt-16"><p className="font-display text-5xl font-bold uppercase tracking-[0.03em] text-steel-50">{brand.name}</p><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: brand.accent }}>{brand.tag}</p></div>
                  <div className="mt-auto"><p className="font-mono text-[9px] uppercase tracking-tech text-steel-600">{brand.category}</p><p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-400">{brand.summary}</p><Link to={`/our-brands/${brand.slug}`} className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.14em] text-steel-50 transition-colors hover:text-[var(--brand-accent)]">Explore brand <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden /></Link></div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><MagneticButton to="/contact" variant="ghost" icon={<ArrowUpRightIcon className="h-4 w-4" aria-hidden />}>Talk to our team</MagneticButton></div>
        </div>
      </section>
    </main>
  );
}
