import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpRightIcon, CheckIcon } from 'lucide-react';
import { ProductViewer } from '../components/sections/ProductViewer';
import { ProductExplorer } from '../components/sections/ProductExplorer';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/RevealText';
import { RollerShape } from '../components/3d/BearingModel';
import { getProduct, products } from '../data/products';
import { useSeo } from '../hooks/useSeo';

const SHAPE: Record<string, RollerShape> = {
  'taper-roller-bearings': 'taper',
  'spherical-roller-bearings': 'cylinder',
  'deep-groove-ball-bearings': 'ball',
  'miniature-ball-bearings': 'ball',
  'cylindrical-ball-bearings': 'cylinder',
  'linear-motion-bearings': 'linear'
};

export function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);

  useSeo({
    title: product ? product.name : 'Product not found',
    description: product ?
    `${product.name} from KHS-LG — ${product.short} Part of the 4,500+ product KHS-LG bearing range.` :
    'This KHS-LG bearing category could not be found.',
    path: `/products/${slug ?? ''}`,
    structuredData: product ?
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      category: 'Bearings',
      brand: { '@type': 'Brand', name: 'KHS-LG' }
    } :
    undefined
  });

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 pt-24">
        <div className="text-center">
          <TechnicalLabel code="404" className="justify-center">
            Category not found
          </TechnicalLabel>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase text-steel-50">
            No such bearing category
          </h1>
          <MagneticButton to="/products" variant="ghost" className="mt-8">
            Back to Products
          </MagneticButton>
        </div>
      </main>);

  }

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <main className="bg-ink-950">
      <section className="relative border-b border-ink-700 pt-28 pb-16 sm:pt-36 lg:pt-40">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-500 transition-colors hover:text-signal">
            
            <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden />
            All Products
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <ProductViewer rollerShape={SHAPE[product.slug] ?? 'ball'} />

            <div>
              <TechnicalLabel code={product.code}>{product.motion}</TechnicalLabel>
              <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-bold uppercase leading-[0.9] text-steel-50">
                {product.name}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-steel-300">
                {product.description}
              </p>

              <div className="mt-10 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2">
                <div className="bg-ink-900 p-6">
                  <h2 className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                    Applications
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {product.applications.map((a) =>
                    <li key={a} className="flex items-start gap-2.5 text-sm text-steel-300">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-signal" aria-hidden />
                        {a}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-ink-900 p-6">
                  <h2 className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                    Features
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((f) =>
                    <li key={f} className="flex items-start gap-2.5 text-sm text-steel-300">
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden />
                        {f}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border border-ink-700 bg-ink-900 p-6">
                <h2 className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                  Specifications
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-steel-400">
                  Dimensions, tolerances and load ratings are confirmed per order. Send us the
                  application and required size and the KHS-LG team will specify the bearing.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <MagneticButton to="/contact" variant="yellow">
                    Request a Quote
                  </MagneticButton>
                  <MagneticButton to="/applications" variant="ghost">
                    View Applications
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductExplorer
        parts={product.components}
        rollerShape={SHAPE[product.slug] ?? 'ball'}
        title={['Inside the', product.name]}
        code={`EXP / ${product.code}`} />
      

      <section aria-label="Other bearing categories" className="bg-ink-950 py-20">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <TechnicalLabel code="Range">Other categories</TechnicalLabel>
          <ul className="mt-8 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-3">
            {others.map((other, i) =>
            <li key={other.slug} className="bg-ink-900">
                <Reveal delay={i * 0.05}>
                  <Link
                  to={`/products/${other.slug}`}
                  data-cursor="open"
                  className="group flex items-center justify-between gap-4 p-7 transition-colors hover:bg-ink-800">
                  
                    <span>
                      <span className="block font-mono text-[9px] uppercase tracking-tech text-signal">
                        {other.code}
                      </span>
                      <span className="mt-2 block font-display text-xl font-semibold uppercase text-steel-50">
                        {other.name}
                      </span>
                    </span>
                    <ArrowUpRightIcon
                    className="h-4 w-4 shrink-0 text-signal transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden />
                  
                  </Link>
                </Reveal>
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>);

}