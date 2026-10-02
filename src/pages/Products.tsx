import { PageHero } from '../components/layout/PageHero';
import { ProductCard } from '../components/sections/Products3D';
import { ProductExplorer } from '../components/sections/ProductExplorer';
import { CTASection } from '../components/sections/CTASection';
import { products } from '../data/products';
import { useSeo } from '../hooks/useSeo';

export function Products() {
  useSeo({
    title: 'Bearing Products',
    description:
    'Explore the KHS-LG bearing range: taper roller, spherical roller, deep groove ball, miniature ball, cylindrical and linear motion bearings.',
    path: '/products',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `https://khslg.com/products/${p.slug}`
      }))
    }
  });

  return (
    <main>
      <PageHero
        code="Products"
        eyebrow="Six categories · 4,500+ products"
        lines={['Engineered for', 'Every motion']}
        body="A complete bearing range from one source — selected with you for the load, speed and envelope your application actually works in."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
      

      <section aria-label="Product categories" className="bg-ink-900 py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <ul className="grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, i) =>
            <ProductCard key={product.slug} product={product} index={i} />
            )}
          </ul>
        </div>
      </section>

      <ProductExplorer />
      <CTASection />
    </main>);

}