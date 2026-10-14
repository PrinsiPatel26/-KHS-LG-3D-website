import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, DownloadIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { BearingGlyph } from '../ui/BearingGlyph';
import { Product, products } from '../../data/products';
import { bearingImages, getProductPdf } from '../../data/catalogues';

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
      className="relative border-t border-ink-700 bg-ink-900 py-12 lg:py-18">
      
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
        </div>

        <ul className="mt-14 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-3">
          {list.map((product, i) =>
            <ProductCard key={product.slug} product={product} index={i} />
          )}
        </ul>

        <div className="mt-12 flex justify-end">
          <Reveal delay={0.15}>
            <Link
              to="/products"
              data-cursor="open"
              className="group inline-flex items-center gap-3 border border-signal bg-signal px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-950 transition-all duration-300 hover:bg-signal-bright shadow-[0_0_20px_rgba(245,196,0,0.3)] hover:shadow-[0_0_30px_rgba(245,196,0,0.55)] hover:scale-[1.02]">
              Show All Products
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>);

}

export function ProductCard({ product, index }: {product: Product;index: number;}) {
  return (
    <li className="group relative bg-ink-950 transition-all duration-300 hover:bg-ink-900">
      <Reveal delay={Math.min(index * 0.05, 0.25)}>
        <Link
          to={`/products/${product.slug}`}
          data-cursor="open"
          className="relative flex h-full flex-col p-7 transition-colors duration-300 ease-precision lg:p-9">
          
          <div className="flex items-start justify-between gap-4">
            <span className="border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-tech text-signal">
              {product.code}
            </span>
            <p className="font-mono text-[9px] uppercase tracking-tech text-steel-400">
              {product.motion}
            </p>
          </div>

          <div className="relative mx-auto my-8 flex h-40 w-40 items-center justify-center transition-transform duration-500 ease-precision group-hover:-translate-y-2 group-hover:scale-[1.06] sm:h-48 sm:w-48">
            <div
              className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 ease-precision group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle, rgba(245,196,0,0.25) 0%, transparent 68%)'
              }}
              aria-hidden />
            
            {bearingImages[product.slug] ? (
              <img
                src={bearingImages[product.slug]}
                alt={product.name}
                className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:drop-shadow-[0_16px_32px_rgba(245,196,0,0.25)]"
                loading="lazy"
              />
            ) : (
              <BearingGlyph shape={SHAPE[product.slug] ?? 'ball'} rollers={12} />
            )}
          </div>

          <h3 className="font-display text-2xl font-semibold uppercase leading-tight text-steel-50 transition-colors duration-300 group-hover:text-signal">
            {product.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-steel-400">{product.short}</p>

          <div className="mt-auto pt-7">
            <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
              {product.applications[0]}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-signal">
                Explore
                <ArrowUpRightIcon
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden />
              </span>
              {(() => {
                const pdf = getProductPdf(product.slug);
                if (!pdf || !pdf.pdfUrl) return null;
                return (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(pdf.pdfUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="relative z-20 inline-flex items-center gap-1.5 border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-tech text-signal transition-colors hover:bg-signal hover:text-ink-950"
                    title={`Download ${pdf.title}`}
                  >
                    <DownloadIcon className="h-3 w-3" aria-hidden />
                    PDF
                  </button>
                );
              })()}
            </div>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-signal shadow-[0_0_8px_#F5C400] transition-[width] duration-400 ease-precision group-hover:w-full"
            aria-hidden />
        </Link>
      </Reveal>
    </li>);
}