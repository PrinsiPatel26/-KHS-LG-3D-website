import { ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../data/blog';
import { BearingGlyph } from '../ui/BearingGlyph';

export function BlogVisual({ post, large = false }: { post: BlogPost; large?: boolean }) {
  const shape = post.category === 'Linear Motion' || post.category === 'Maintenance' ? 'linear' : post.category === 'Engineering' ? 'roller' : 'ball';
  return (
    <div className={`relative overflow-hidden border border-ink-700 bg-ink-950 flex items-center justify-center ${large ? 'w-full aspect-[16/9] max-h-[520px]' : 'w-full aspect-[16/9]'}`}>
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <>
          <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center opacity-75">
            <div className="absolute h-48 w-48 rounded-full border border-signal/10" aria-hidden />
            <div className="absolute h-36 w-36 rounded-full border border-signal/10" aria-hidden />
            <div className="h-32 w-32 sm:h-40 sm:w-40"><BearingGlyph shape={shape} rollers={12} /></div>
          </div>
        </>
      )}
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="group flex h-full flex-col border border-ink-700 bg-ink-950 transition-colors duration-300 hover:border-signal/60">
    <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
      <BlogVisual post={post} />
    </Link>
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-tech text-steel-500"><span className="text-signal">{post.category}</span><span>{new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span><span>{post.readTime}</span></div>
      <h2 className="mt-5 font-display text-2xl font-semibold uppercase leading-[0.98] text-steel-50 transition-colors group-hover:text-signal">{post.title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-steel-500">{post.excerpt}</p>
      <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 font-display text-sm font-semibold uppercase tracking-[0.14em] text-signal">Read article <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden /></Link>
    </div>
  </article>;
}