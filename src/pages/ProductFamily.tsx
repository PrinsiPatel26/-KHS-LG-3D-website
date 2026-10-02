import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpRightIcon } from 'lucide-react';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { productFamilies } from '../data/productFamilies';
import { useSeo } from '../hooks/useSeo';
export function ProductFamily() {
  const { slug } = useParams();
  const family = productFamilies.find((item) => item.id === slug);

  useSeo({
    title: family ? family.title : 'Product family not found',
    description: family ? `Explore KHS-LG ${family.title.toLowerCase()} catalogue products.` : 'This KHS-LG product family could not be found.',
    path: `/products/${slug ?? ''}`
  });

  if (!family) return <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 pt-24 text-center"><div><TechnicalLabel code="404" className="justify-center">Product family not found</TechnicalLabel><h1 className="mt-6 font-display text-4xl font-bold uppercase text-steel-50">No such product family</h1><Link to="/products" className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-signal"><ArrowLeftIcon className="h-3 w-3" aria-hidden /> Back to Products</Link></div></main>;

  return <main className="bg-ink-950"><section className="relative border-b border-ink-700 bg-ink-950 pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24"><div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden /><div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8"><Link to="/products" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-500 hover:text-signal"><ArrowLeftIcon className="h-3 w-3" aria-hidden /> All Products</Link><TechnicalLabel code={`${family.products.length} products`} className="mt-8">Product family</TechnicalLabel><h1 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,7vw,6rem)] font-bold uppercase leading-[0.88] text-steel-50">{family.title}</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400">Explore the KHS-LG catalogue products in this technical family.</p></div></section><section className="bg-ink-900 py-14 sm:py-20"><div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8"><ul className="grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-3">{family.products.map((product) => <li key={product.id} className="bg-ink-950"><Link to={`/catalogue/${product.routeId}`} className="group block p-6 transition-colors hover:bg-ink-800 sm:p-7"><div className="flex items-center justify-between gap-4"><span className="font-mono text-[10px] uppercase tracking-tech text-signal">{String(product.sequence).padStart(2, '0')}</span><ArrowUpRightIcon className="h-4 w-4 text-steel-600 transition-colors group-hover:text-signal" aria-hidden /></div><h2 className="mt-12 font-display text-xl font-semibold uppercase leading-tight text-steel-50 group-hover:text-signal">{product.title}</h2><p className="mt-3 text-sm leading-relaxed text-steel-500">{product.description}</p></Link></li>)}</ul></div></section></main>;
}
