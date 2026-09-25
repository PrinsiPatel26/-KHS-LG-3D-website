import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';
import { cn } from '../../utils/cn';

export function BrandMegaMenu({ open, onClose, scrolled = false }: { open: boolean; onClose: () => void; scrolled?: boolean }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (target.closest('[data-brand-menu-trigger]')) return;
      if (!menuRef.current?.contains(target)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[105] bg-ink-950/35" style={{ top: scrolled ? '70px' : '96px' }} aria-hidden />
      <div ref={menuRef} className={cn('fixed inset-x-0 z-[9999] border-y border-ink-700 bg-ink-950 shadow-2xl animate-[fadeIn_180ms_ease-out]', scrolled ? 'top-[64px] lg:top-[70px]' : 'top-20 lg:top-24')} role="region" aria-label="KHS-LG brand navigation">
        <div className="mx-auto max-h-[min(520px,calc(100vh-96px))] w-full max-w-[1400px] overflow-y-auto px-5 py-7 sm:px-8 lg:py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-ink-700 pb-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">Our brands</p>
              <p className="mt-2 text-sm text-steel-400">Premium global brands supplied by KHS-LG.</p>
            </div>
            <Link to="/our-brands" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-400 transition-colors hover:text-signal">
              View all brands <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-3">
            {brands.map((brand) => (
              <Link key={brand.slug} to={`/our-brands/${brand.slug}`} onClick={onClose} className="group relative overflow-hidden bg-ink-950 p-6 transition-colors hover:bg-ink-900" style={{ '--brand-accent': brand.accent, '--brand-accent-soft': brand.accentSoft } as CSSProperties}>
                <span className="absolute left-0 top-0 h-px w-10 bg-[var(--brand-accent)] transition-all duration-300 group-hover:w-full" aria-hidden />
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-3xl font-bold uppercase tracking-[0.03em] text-steel-50">{brand.name}</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-steel-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                </div>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--brand-accent)]">{brand.tag}</p>
                <p className="mt-8 max-w-xs text-sm leading-relaxed text-steel-400">{brand.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-steel-300 group-hover:text-[var(--brand-accent)]">Explore {brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function BrandMobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-2 border-l border-ink-700 pl-4">
      {brands.map((brand) => (
        <Link key={brand.slug} to={`/our-brands/${brand.slug}`} onClick={onNavigate} className="group flex items-center justify-between border-b border-ink-700 py-3 text-steel-300">
          <span>
            <strong className="block font-display text-xl uppercase text-steel-50 group-hover:text-signal">{brand.name}</strong>
            <small className="font-mono text-[9px] uppercase tracking-tech" style={{ color: brand.accent }}>{brand.country}</small>
          </span>
          <ArrowUpRightIcon className="h-4 w-4 text-steel-600 group-hover:text-signal" aria-hidden />
        </Link>
      ))}
      <Link to="/our-brands" onClick={onNavigate} className="pt-2 font-mono text-[10px] uppercase tracking-tech text-signal">View all brands</Link>
    </div>
  );
}
