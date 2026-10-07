import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BlogVisual } from '../components/sections/BlogCard';
import { ArticleBlock, getAllPosts, getPostBySlug, getRelatedPosts } from '../data/blog';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { useSeo } from '../hooks/useSeo';

function anchor(text: string) { return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function formatDate(date: string) { return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }); }

function ArticleContent({ content }: { content: ArticleBlock[] }) {
  return <div className="space-y-8">{content.map((block, index) => {
    if (block.type === 'heading') { const Heading = block.level === 3 ? 'h3' : 'h2'; return <Heading key={index} id={anchor(block.text)} className={block.level === 3 ? 'pt-4 font-display text-xl font-semibold uppercase text-steel-50' : 'pt-8 font-display text-3xl font-bold uppercase leading-none text-steel-50 sm:text-4xl'}>{block.text}</Heading>; }
    if (block.type === 'paragraph') return <p key={index} className="text-base leading-[1.85] text-steel-300">{block.text}</p>;
    if (block.type === 'quote') return <blockquote key={index} className="border-l-2 border-signal bg-ink-900 px-6 py-5 font-display text-xl uppercase leading-tight text-steel-50">{block.text}</blockquote>;
    if (block.type === 'table') return <div key={index} className="overflow-x-auto border border-ink-700"><table className="w-full min-w-[560px] text-left"><thead className="bg-ink-900"><tr>{block.headers.map((header) => <th key={header} className="px-4 py-3 font-mono text-[9px] uppercase tracking-tech text-signal">{header}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-ink-700">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-sm leading-relaxed text-steel-300">{cell}</td>)}</tr>)}</tbody></table></div>;
    const List = block.ordered ? 'ol' : 'ul';
    return <List key={index} className={`space-y-3 pl-6 text-base leading-relaxed text-steel-300 ${block.ordered ? 'list-decimal' : 'list-disc marker:text-signal'}`}>{block.items.map((item) => <li key={item} className="pl-2">{item}</li>)}</List>;
  })}</div>;
}

export function BlogArticle() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  useSeo({
    title: post?.title ?? 'Article not found',
    description: post?.excerpt ?? 'This KHS-LG article could not be found.',
    path: `/blog/${slug ?? ''}`,
    structuredData: post ? { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, datePublished: post.date, author: { '@type': 'Organization', name: post.author }, articleSection: post.category } : undefined
  });
  if (!post) return <main className="min-h-screen bg-ink-950 px-5 pb-24 pt-40 text-center"><TechnicalLabel code="404" className="justify-center">Article not found</TechnicalLabel><h1 className="mt-6 font-display text-5xl font-bold uppercase text-steel-50">No such insight</h1><Link to="/blog" className="mt-8 inline-block font-mono text-[10px] uppercase tracking-tech text-signal">Back to blog</Link></main>;

  const posts = getAllPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const previous = posts[index + 1];
  const next = posts[index - 1];
  const related = getRelatedPosts(post);
  const headings = post.content.filter((block): block is Extract<ArticleBlock, { type: 'heading' }> => block.type === 'heading');
  return <main className="bg-ink-950">
    <header className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-6 pt-24 sm:pb-8 sm:pt-26 lg:pb-8 lg:pt-28"><div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden /><div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8"><nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-500"><li><Link to="/" className="hover:text-signal">Home</Link></li><li><ChevronRightIcon className="h-3 w-3 text-ink-600" aria-hidden /></li><li><Link to="/blog" className="hover:text-signal">Blog</Link></li><li><ChevronRightIcon className="h-3 w-3 text-ink-600" aria-hidden /></li><li className="text-signal">Article</li></ol></nav><div className="mt-6 max-w-5xl sm:mt-7"><TechnicalLabel code={post.category}>{post.author} / {formatDate(post.date)} / {post.readTime}</TechnicalLabel><h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-[0.88] text-steel-50">{post.title}</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-steel-400">{post.excerpt}</p></div></div></header>
    <section className="border-b border-ink-700 bg-ink-900 py-6 sm:py-8"><div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8"><BlogVisual post={post} large /></div></section>
    <section className="bg-ink-950 py-12 lg:py-16"><div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[260px_1fr] lg:gap-16"><aside className="lg:sticky lg:top-24 lg:h-fit"><p className="font-mono text-[10px] uppercase tracking-tech text-signal">Table of contents</p><ol className="mt-5 space-y-3 border-l border-ink-700 pl-4">{headings.map((heading, i) => <li key={`${heading.text}-${i}`} className={heading.level === 3 ? 'pl-3' : ''}><a href={`#${anchor(heading.text)}`} className="text-xs leading-relaxed text-steel-500 transition-colors hover:text-signal">{String(i + 1).padStart(2, '0')} {heading.text}</a></li>)}</ol></aside><article className="min-w-0"><ArticleContent content={post.content} /><div className="mt-14 border border-signal/50 bg-ink-900 p-7 sm:p-10"><p className="font-mono text-[10px] uppercase tracking-tech text-signal">Need the right component?</p><h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-steel-50">Talk to the KHS-LG engineering team.</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-400">Share your application, dimensions or current failure pattern and we will help identify a suitable bearing or linear-motion solution.</p><MagneticButton to="/contact" variant="primary" className="mt-7">Request a Quote</MagneticButton></div></article></div></section>
    <section className="border-t border-ink-700 bg-ink-900 py-10 lg:py-12"><div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8"><div className="grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2"><div className="bg-ink-950 p-6 sm:p-8">{previous ? <Link to={`/blog/${previous.slug}`} className="group block"><p className="font-mono text-[10px] uppercase tracking-tech text-steel-500"><ArrowLeftIcon className="mr-2 inline h-3.5 w-3.5" aria-hidden />Previous article</p><p className="mt-4 font-display text-xl font-semibold uppercase text-steel-50 group-hover:text-signal">{previous.title}</p></Link> : <p className="font-mono text-[10px] uppercase tracking-tech text-steel-600">First article in archive</p>}</div><div className="bg-ink-950 p-6 text-left sm:p-8 sm:text-right">{next ? <Link to={`/blog/${next.slug}`} className="group block"><p className="font-mono text-[10px] uppercase tracking-tech text-steel-500">Next article <ArrowRightIcon className="ml-2 inline h-3.5 w-3.5" aria-hidden /></p><p className="mt-4 font-display text-xl font-semibold uppercase text-steel-50 group-hover:text-signal">{next.title}</p></Link> : <p className="font-mono text-[10px] uppercase tracking-tech text-steel-600">Latest article in archive</p>}</div></div><div className="mt-12"><p className="font-mono text-[10px] uppercase tracking-tech text-signal">Related insights</p><div className="mt-6 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-3">{related.map((item) => <div key={item.slug} className="bg-ink-950"><Link to={`/blog/${item.slug}`} className="group block p-6"><p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">{item.category}</p><h2 className="mt-4 font-display text-xl font-semibold uppercase leading-tight text-steel-50 group-hover:text-signal">{item.title}</h2><span className="mt-6 inline-block font-mono text-[10px] uppercase tracking-tech text-signal">Read article {'->'}</span></Link></div>)}</div></div></div></section>
  </main>;
}