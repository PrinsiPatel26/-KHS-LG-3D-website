import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';

interface FeaturedProduct {
  name: string;
  code: string;
  category: string;
  motion: string;
  image: string;
  short: string;
  link: string;
}

const FEATURED_HOMEPAGE_PRODUCTS: FeaturedProduct[] = [
  {
    name: 'Linear Shafts',
    code: 'LNS',
    category: 'Linear Motion',
    motion: 'Precision Stroke',
    image: '/assets/products/linear-motion-shaft-with-support.png',
    short: 'Hard-chrome induction-hardened linear shafts and supported rail systems engineered for maximum stiffness and low runout.',
    link: '/products?category=linear-shafts'
  },
  {
    name: 'Linear Motion Bearings',
    code: 'LMB',
    category: 'Linear Motion',
    motion: 'Linear Travel',
    image: '/assets/products/linear-motion-bearing.png',
    short: 'Recirculating linear ball bushings engineered for smooth, low-friction axial travel in precision automation and machine tools.',
    link: '/products?category=linear-motion'
  },
  {
    name: 'Spherical Roller Bearings',
    code: 'SRB',
    category: 'Bearings',
    motion: 'Self-Aligning',
    image: '/assets/products/spherical-roller-bearing.png',
    short: 'Heavy-duty self-aligning double-row roller bearings engineered to absorb severe radial shock loads and shaft misalignment.',
    link: '/products?category=rolling-bearings'
  },
  {
    name: 'Pillow Block Bearings',
    code: 'PBB',
    category: 'Bearing Units',
    motion: 'Mounted Unit',
    image: '/assets/products/pillow-block-bearing.png',
    short: 'Rigid cast-iron housing units with self-aligning insert bearings, built for continuous operation across conveyors and drive shafts.',
    link: '/products?category=bearing-units-housings'
  },
  {
    name: 'Deep Groove Ball Bearings',
    code: 'DGBB',
    category: 'Bearings',
    motion: 'High Speed',
    image: '/assets/products/deep-groove-ball-bearing.png',
    short: 'Precision chrome ball bearings running quietly at high rotational velocities while carrying radial and moderate axial thrust.',
    link: '/products?category=rolling-bearings&sub=ball-bearings'
  },
  {
    name: 'Taper Roller Bearings',
    code: 'TRB',
    category: 'Bearings',
    motion: 'Combined Load',
    image: '/assets/products/taper-roller-bearing.png',
    short: 'High-capacity tapered roller cup-and-cone assemblies engineered for combined radial and axial thrust in gearboxes and vehicle axles.',
    link: '/products?category=rolling-bearings'
  }
];

export function Products3D({ limit = 6 }: { limit?: number }) {
  const list = FEATURED_HOMEPAGE_PRODUCTS.slice(0, limit);

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative border-t border-ink-700 bg-ink-900 py-12 lg:py-20">
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            code="03 / Range"
            eyebrow="13,500+ SKUs across industrial motion categories"
            lines={['Engineered for', 'Every Motion.']}
            body="A complete bearing, linear motion and power transmission range engineered for demanding industrial speeds, loads and environments."
          />
          
          <div id="products-heading" className="sr-only">
            Engineered for every motion
          </div>
        </div>

        {/* Exactly 6 Visually Uniform Featured Cards */}
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((product, i) => (
            <FeaturedCard key={product.name} product={product} index={i} />
          ))}
        </ul>

        {/* SHOW ALL PRODUCTS CTA directly underneath */}
        <div className="mt-14 flex flex-col items-center justify-center text-center">
          <Reveal delay={0.15}>
            <Link
              to="/products"
              data-cursor="open"
              className="group inline-flex items-center gap-3 border border-signal bg-signal px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink-950 shadow-[0_0_20px_rgba(245,196,0,0.3)] transition-all duration-300 hover:bg-signal-bright hover:shadow-[0_0_30px_rgba(245,196,0,0.55)] hover:scale-[1.02]">
              Show All Products
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
          <p className="mt-3 font-mono text-xs uppercase tracking-tech text-steel-400">
            Explore the complete 13,500+ KHS-LG SKU range
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ product, index }: { product: FeaturedProduct; index: number }) {
  return (
    <li className="group relative flex h-full flex-col justify-between border border-ink-800 bg-ink-950 p-7 transition-all duration-300 hover:border-signal/50 hover:bg-ink-900/90 lg:p-8">
      <Reveal delay={Math.min(index * 0.05, 0.25)} className="flex h-full flex-col justify-between">
        <div>
          {/* Card Top: Code and Motion Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-tech text-signal">
                {product.code}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                {product.category}
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-tech text-steel-400">
              {product.motion}
            </span>
          </div>

          {/* Centered Uniform Product Image Container */}
          <div className="relative mx-auto my-7 flex h-44 w-44 items-center justify-center transition-transform duration-500 ease-precision group-hover:-translate-y-2 group-hover:scale-[1.06] sm:h-48 sm:w-48">
            <div
              className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 ease-precision group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle, rgba(245,196,0,0.20) 0%, transparent 68%)'
              }}
              aria-hidden
            />
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 max-h-36 max-w-36 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:drop-shadow-[0_16px_32px_rgba(245,196,0,0.25)] sm:max-h-40 sm:max-w-40"
              loading="lazy"
            />
          </div>

          {/* Title & Short Description */}
          <h3 className="font-display text-2xl font-bold uppercase leading-tight text-steel-50 transition-colors duration-300 group-hover:text-signal">
            {product.name}
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-steel-400">
            {product.short}
          </p>
        </div>

        {/* Bottom Link */}
        <div className="mt-6 border-t border-ink-800/80 pt-4">
          <Link
            to={product.link}
            className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-signal transition-colors group-hover:text-signal-bright"
          >
            Explore Specifications
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-signal shadow-[0_0_8px_#F5C400] transition-[width] duration-400 ease-precision group-hover:w-full"
          aria-hidden
        />
      </Reveal>
    </li>
  );
}