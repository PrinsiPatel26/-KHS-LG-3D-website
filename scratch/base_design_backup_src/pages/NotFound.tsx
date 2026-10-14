import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { useSeo } from '../hooks/useSeo';

export function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'This KHS-LG page could not be found.',
    path: '/404'
  });

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-ink-950 px-5 pt-24 sm:px-8">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[460px] w-[460px] -translate-y-1/2 opacity-10"
        aria-hidden>
        
        <BearingGlyph />
      </div>
      <div className="relative mx-auto w-full max-w-[1600px]">
        <TechnicalLabel code="404">Out of specification</TechnicalLabel>
        <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,6rem)] font-bold uppercase leading-[0.9] text-steel-50">
          This page is
          <br />
          <span className="text-signal">out of alignment</span>
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-steel-400">
          The page you were looking for is not part of the KHS-LG site. Head back and keep
          exploring the bearing range.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <MagneticButton to="/" variant="primary">
            Back Home
          </MagneticButton>
          <MagneticButton to="/products" variant="ghost">
            Explore Products
          </MagneticButton>
        </div>
      </div>
    </main>);

}