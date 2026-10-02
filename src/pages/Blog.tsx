import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { BlogCard, BlogVisual } from '../components/sections/BlogCard';
import { getFeaturedPost, getLatestPosts, searchPosts } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

const PAGE_SIZE = 6;

export function Blog() {
  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';
  const sort = params.get('sort') === 'oldest' ? 'oldest' : 'newest';
  const featured = getFeaturedPost();
  const categories = ['All', ...Array.from(new Set(getLatestPosts().map((post) => post.category)))];
  const posts = useMemo(() => {
    const list = searchPosts(query).filter((post) => category === 'All' || post.category === category);
    return sort === 'oldest' ? [...list].reverse() : list;
  }, [category, query, sort]);
  const visiblePosts = posts.filter((post) => post.slug !== featured.slug).slice(0, visible);

  useSeo({
    title: 'Engineering Insights',
    description: 'KHS-LG engineering insights on bearings, linear motion, maintenance, manufacturing and OEM solutions.',
    path: '/blog',
    structuredData: { '@context': 'https://schema.org', '@type': 'Blog', name: 'KHS-LG Engineering Insights', blogPost: getLatestPosts().map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: `https://khslg.com/blog/${post.slug}`, datePublished: post.date })) }
  });

  const updateParams = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'All' && value !== 'newest') next.set(key, value); else next.delete(key);
    setParams(next);
    setVisible(PAGE_SIZE);
  };

  return <main>
    <PageHero code="Insights / Blog" eyebrow="Engineering knowledge for better motion solutions" lines={['Precision', 'in practice.']} body="Field knowledge for bearings, linear motion, maintenance, industrial applications and OEM manufacturing." breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
    <section className="relative border-b border-ink-700 bg-ink-900 py-12 lg:py-16">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-px border border-ink-700 bg-ink-700 lg:grid-cols-[1.2fr_0.8fr]">
          <Link to={`/blog/${featured.slug}`} className="group bg-ink-950 p-6 sm:p-9 lg:p-12"><div className="mb-7 flex items-center justify-between font-mono text-[9px] uppercase tracking-tech text-signal"><span>Featured insight</span><span>{featured.date}</span></div><div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center"><BlogVisual post={featured} large /><div><h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-bold uppercase leading-[0.9] text-steel-50 transition-colors group-hover:text-signal">{featured.title}</h2><p className="mt-6 max-w-xl text-sm leading-relaxed text-steel-400">{featured.excerpt}</p><span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.14em] text-signal">Read article <span aria-hidden>{'->'}</span></span></div></div></Link>
          <div className="flex flex-col justify-end bg-ink-950 p-6 sm:p-9 lg:p-12"><p className="font-mono text-[10px] uppercase tracking-tech text-steel-500">Knowledge / Application / Reliability</p><p className="mt-6 max-w-md font-display text-3xl font-semibold uppercase leading-none text-steel-50 sm:text-4xl">Better decisions begin with the right technical question.</p><p className="mt-6 max-w-md text-sm leading-relaxed text-steel-500">Browse the KHS-LG archive for practical guidance before a machine stops, a specification is released or a new line is commissioned.</p></div>
        </div>
      </div>
    </section>
    <section className="bg-ink-950 py-12 lg:py-18">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-7 border-b border-ink-700 pb-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-tech text-signal">Latest insights</p><h2 className="mt-4 font-display text-4xl font-bold uppercase text-steel-50 sm:text-5xl">The working archive</h2></div><p className="max-w-md text-sm leading-relaxed text-steel-500">{posts.length} {posts.length === 1 ? 'article' : 'articles'} found</p></div>
        <div className="mt-8 grid gap-3 border border-ink-700 bg-ink-700 p-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative block"><span className="sr-only">Search articles</span><SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-signal" aria-hidden /><input value={query} onChange={(event) => updateParams('q', event.target.value)} placeholder="Search articles..." className="w-full border border-ink-700 bg-ink-950 py-3 pl-10 pr-4 font-mono text-sm text-steel-50 placeholder:text-steel-600 focus:border-signal focus:outline-none" /></label>
          <label className="flex items-center gap-2 border border-ink-700 bg-ink-950 px-3"><SlidersHorizontalIcon className="h-4 w-4 text-signal" aria-hidden /><span className="sr-only">Filter category</span><select value={category} onChange={(event) => updateParams('category', event.target.value)} className="w-full bg-transparent py-3 font-mono text-[10px] uppercase tracking-tech text-steel-300 outline-none"><option value="All">All categories</option>{categories.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <select value={sort} onChange={(event) => updateParams('sort', event.target.value)} aria-label="Sort articles" className="border border-ink-700 bg-ink-950 px-3 py-3 font-mono text-[10px] uppercase tracking-tech text-steel-300 outline-none focus:border-signal"><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select>
        </div>
        {visiblePosts.length > 0 ? <><div className="mt-10 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-3">{visiblePosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>{visible < posts.length - (posts.some((post) => post.slug === featured.slug) ? 1 : 0) && <button type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)} className="mx-auto mt-10 block border border-signal px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal hover:text-ink-950">Load more</button>}</> : <div className="mt-10 border border-ink-700 px-6 py-14 text-center"><p className="font-display text-2xl uppercase text-steel-50">No articles found matching your search.</p><button type="button" onClick={() => { setParams(new URLSearchParams()); setVisible(PAGE_SIZE); }} className="mt-5 font-mono text-[10px] uppercase tracking-tech text-signal">Clear filters</button></div>}
      </div>
    </section>
  </main>;
}