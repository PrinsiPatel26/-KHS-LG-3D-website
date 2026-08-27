import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { BearingGlyph } from '../ui/BearingGlyph';
import { Product, products } from '../../data/products';

const SHAPE: Record<string, 'ball' | 'roller' | 'linear'> = {
  'taper-roller-bearings': 'roller',
  'spherical-roller-bearings': 'roller',
  'deep-groove-ball-bearings': 'ball',
  'miniature-ball-bearings': 'ball',
  'cylindrical-ball-bearings': 'roller',
  'linear-motion-bearings': 'linear'
};

export function Products3D({ limit }: {limit?: number;}) {
  const list = limit ? products.slice(0, limit) : products;

  return (
    <section
      aria-labelledby="products-heading"
      className="relative border-t border-ink-700 bg-ink-900 py-24 lg:py-32">
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            code="03 / Range"
            eyebrow="4,500+ products across six categories"
            lines={['Engineered for', 'Every Motion']} />
          
          <div id="products-heading" className="sr-only">
            Engineered for every motion
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/products"
              data-cursor="open"
              className="group inline-flex items-center gap-3 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.16em] text-steel-50 transition-colors hover:text-signal">
              
              All Products
              <span className="h-px w-10 bg-signal transition-all duration-300 ease-precision group-hover:w-16" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-3">
          {list.map((product, i) =>
          <ProductCard key={product.slug} product={product} index={i} />
          )}
        </ul>
      </div>
    </section>);

}

export function ProductCard({ product, index }: {product: Product;index: number;}) {
  return (
    <li className="bg-ink-950">
      <Reveal delay={Math.min(index * 0.05, 0.25)}>
        <Link
          to={`/products/${product.slug}`}
          data-cursor="open"
          className="group flex h-full flex-col p-7 transition-colors duration-300 ease-precision hover:bg-ink-800 lg:p-9">
          
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[9px] uppercase tracking-tech text-signal">
              {product.code}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
              {product.motion}
            </p>
          </div>

          <div className="relative mx-auto my-8 h-40 w-40 transition-transform duration-500 ease-precision group-hover:-translate-y-1.5 group-hover:scale-[1.04] sm:h-48 sm:w-48">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-precision group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle, rgba(245,180,0,0.16) 0%, transparent 65%)'
              }}
              aria-hidden />
            
            <BearingGlyph shape={SHAPE[product.slug] ?? 'ball'} rollers={12} />
          </div>

          <h3 className="font-display text-2xl font-semibold uppercase leading-tight text-steel-50">
            {product.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-steel-500">{product.short}</p>

          <div className="mt-auto pt-7">
            <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
              {product.applications[0]}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-signal">
              Explore
              <ArrowUpRightIcon
                className="h-3.5 w-3.5 transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden />
              
            </span>
          </div>
        </Link>
      </Reveal>
    </li>);

}