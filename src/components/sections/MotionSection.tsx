import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, LayersIcon, CheckCircle2Icon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';

export function MotionSection() {
  return (
    <section
      aria-labelledby="motion-heading"
      className="relative overflow-hidden border-t border-ink-700 bg-ink-900 py-12 lg:py-20">
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            code="01 / Company"
            eyebrow="INDUSTRIAL EXPERIENCE. GLOBAL REACH."
            lines={['One Source for', 'Industrial Motion.']}
            className="max-w-none" />
          
          <div id="motion-heading" className="sr-only">
            One source for industrial motion
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-300">
              KHS Innovation & Engineering LLP is a one-stop solution for all types of bearings, linear motion and power transmission requirements. Backed by over 50 years of industry experience, we support OEMs, machine manufacturers, maintenance teams and industrial distributors with a comprehensive product range, technical application support, quality-controlled supply and dependable availability across India and international markets.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
              {[
                { k: 'Experience', v: '50+ Years', sub: 'Built across generations' },
                { k: 'Quality Control', v: 'ISO 9001:2015', sub: 'Verified industrial standards' },
                { k: 'Inventory Depth', v: '13,500+ SKUs', sub: 'Bearings, shafts & drives' }
              ].map((item) => (
                <div key={item.k} className="bg-ink-950 p-5">
                  <dt className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold uppercase leading-tight text-steel-50">
                    {item.v}
                  </dd>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-tech text-steel-500">
                    {item.sub}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                data-cursor="open"
                className="group inline-flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-steel-50 transition-colors hover:text-signal">
                About KHS-LG
                <span className="relative h-px w-10 bg-signal transition-all duration-300 ease-precision group-hover:w-16" />
                <ArrowUpRightIcon className="h-4 w-4 text-signal" aria-hidden />
              </Link>
              <Link
                to="/products"
                className="font-mono text-xs uppercase tracking-tech text-steel-400 hover:text-signal transition-colors flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Explore 13,500+ SKUs &rarr;
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Complete KHS-LG Product Family Composition (Communicates: Not only bearings) */}
        <Reveal delay={0.12} className="relative">
          <div className="relative overflow-hidden border border-ink-700 bg-ink-950 p-6 sm:p-8 shadow-2xl">
            {/* Top Header Badge */}
            <div className="flex items-center justify-between border-b border-ink-800 pb-4">
              <div className="flex items-center gap-2.5">
                <LayersIcon className="h-4 w-4 text-signal" aria-hidden />
                <span className="font-mono text-xs font-bold uppercase tracking-tech text-steel-200">
                  Comprehensive Motion Portfolio
                </span>
              </div>
              <span className="border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-tech text-signal">
                3 Core Pillars
              </span>
            </div>

            {/* 3 Categories Pills */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="border border-signal/30 bg-ink-900/90 py-2 px-1">
                <span className="block font-mono text-[9px] uppercase tracking-tech text-signal font-bold">01</span>
                <span className="block font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider text-steel-100">Bearings</span>
              </div>
              <div className="border border-signal/30 bg-ink-900/90 py-2 px-1">
                <span className="block font-mono text-[9px] uppercase tracking-tech text-signal font-bold">02</span>
                <span className="block font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider text-steel-100">Linear Motion</span>
              </div>
              <div className="border border-signal/30 bg-ink-900/90 py-2 px-1">
                <span className="block font-mono text-[9px] uppercase tracking-tech text-signal font-bold">03</span>
                <span className="block font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider text-steel-100">Power Trans.</span>
              </div>
            </div>

            {/* Multi-product Grid Preview */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {/* Product 1: Pillow Block Bearing */}
              <div className="group/item relative flex flex-col items-center border border-ink-800 bg-ink-900/80 p-3 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900">
                <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src="/assets/products/pillow-block-bearing.png"
                    alt="Pillow Block Bearing"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-display text-[11px] font-semibold uppercase leading-tight text-steel-200">
                  Pillow Blocks
                </span>
                <span className="font-mono text-[8px] uppercase tracking-tech text-steel-500">Mounted Units</span>
              </div>

              {/* Product 2: Linear Shaft with Support */}
              <div className="group/item relative flex flex-col items-center border border-ink-800 bg-ink-900/80 p-3 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900">
                <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src="/assets/products/linear-motion-shaft-with-support.png"
                    alt="Linear Motion Shaft"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-display text-[11px] font-semibold uppercase leading-tight text-steel-200">
                  Linear Shafts
                </span>
                <span className="font-mono text-[8px] uppercase tracking-tech text-steel-500">Hard Chrome</span>
              </div>

              {/* Product 3: Power Transmission V-Belt */}
              <div className="group/item relative flex flex-col items-center border border-ink-800 bg-ink-900/80 p-3 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900">
                <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src="/assets/products/v-belt.png"
                    alt="Power Transmission V-Belt"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-display text-[11px] font-semibold uppercase leading-tight text-steel-200">
                  V & Timing Belts
                </span>
                <span className="font-mono text-[8px] uppercase tracking-tech text-steel-500">Power Drives</span>
              </div>

              {/* Product 4: Spherical Roller Bearing */}
              <div className="group/item relative flex flex-col items-center border border-ink-800 bg-ink-900/80 p-3 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900">
                <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src="/assets/products/spherical-roller-bearing.png"
                    alt="Spherical Roller Bearing"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-display text-[11px] font-semibold uppercase leading-tight text-steel-200">
                  Roller Bearings
                </span>
                <span className="font-mono text-[8px] uppercase tracking-tech text-steel-500">Heavy Radial</span>
              </div>

              {/* Product 5: Linear Motion Bearing Bushing */}
              <div className="group/item relative flex flex-col items-center border border-ink-800 bg-ink-900/80 p-3 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900">
                <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src="/assets/products/linear-motion-bearing.png"
                    alt="Linear Motion Bearing"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-display text-[11px] font-semibold uppercase leading-tight text-steel-200">
                  Linear Bushings
                </span>
                <span className="font-mono text-[8px] uppercase tracking-tech text-steel-500">Axial Travel</span>
              </div>

              {/* Product 6: One-Way Clutch / Bush */}
              <div className="group/item relative flex flex-col items-center border border-ink-800 bg-ink-900/80 p-3 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900">
                <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src="/assets/products/one-way-clutch-bearing.png"
                    alt="One-Way Clutches & Bushes"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-display text-[11px] font-semibold uppercase leading-tight text-steel-200">
                  Clutches & Bushes
                </span>
                <span className="font-mono text-[8px] uppercase tracking-tech text-steel-500">Transmission</span>
              </div>
            </div>

            {/* Bottom Statement Card */}
            <div className="mt-6 flex items-center justify-between border-t border-ink-800 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-signal shrink-0" aria-hidden />
                <p className="text-xs text-steel-300 font-medium">
                  <strong className="text-steel-100">KHS-LG is not only a bearing company</strong> — verified single source for industrial motion.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);
}