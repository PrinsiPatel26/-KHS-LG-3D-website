import { useState } from 'react';
import { ArrowLeftIcon, ArrowUpRightIcon, DownloadIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CatalogueDownloadModal } from './Catalogue';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { getCatalogueById } from '../data/catalogues';
import { useSeo } from '../hooks/useSeo';

export function CatalogueDetail() {
  const { slug } = useParams();
  const catalogue = getCatalogueById(slug);
  const [downloadOpen, setDownloadOpen] = useState(false);

  useSeo({
    title: catalogue ? `${catalogue.title} Catalogue` : 'Catalogue not found',
    description: catalogue?.description ?? 'This KHS-LG catalogue could not be found.',
    path: `/catalogue/${slug ?? ''}`
  });

  if (!catalogue) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 pt-24 text-center">
        <div>
          <TechnicalLabel code="404" className="justify-center">Catalogue not found</TechnicalLabel>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase text-steel-50">No such document</h1>
          <Link to="/catalogue" className="mt-8 inline-block font-mono text-[10px] uppercase tracking-tech text-signal">
            Back to catalogue
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-ink-950">
      <section className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-8 pt-24 sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div className="relative flex min-h-[340px] items-center justify-center border border-ink-700 bg-ink-900 p-8">
              <div className="industrial-grid absolute inset-0 opacity-25" aria-hidden />
              {catalogue.image ? (
                <img
                  src={catalogue.image}
                  alt={catalogue.title}
                  className="relative z-10 max-h-64 w-64 object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="h-56 w-56">
                  <BearingGlyph shape={catalogue.group === 'Bearings' ? 'ball' : 'linear'} rollers={14} />
                </div>
              )}
              <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-tech text-steel-600">
                KHS-LG / DOCUMENT PREVIEW
              </span>
            </div>

            <div>
              <TechnicalLabel code={catalogue.group}>{catalogue.title}</TechnicalLabel>
              <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold uppercase leading-[0.88] text-steel-50">
                {catalogue.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400">
                {catalogue.description}
              </p>

              {catalogue.series.length > 0 && (
                <div className="mt-8">
                  <p className="font-mono text-[10px] uppercase tracking-tech text-signal">Available series</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {catalogue.series.map((series) => (
                      <li key={series} className="border-l border-signal/60 pl-3 text-sm text-steel-300">
                        {series}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!catalogue.pdfUrl}
                  onClick={() => catalogue.pdfUrl && window.open(catalogue.pdfUrl, '_blank', 'noopener,noreferrer')}
                  className="inline-flex items-center gap-2 border border-ink-600 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-steel-400 hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-50"
                >
                  View PDF <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setDownloadOpen(true)}
                  className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 hover:bg-signal-bright"
                >
                  Download Brochure <DownloadIcon className="h-4 w-4" aria-hidden />
                </button>
              </div>

              {!catalogue.pdfUrl && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-tech text-steel-600">
                  Approved PDF asset pending upload
                </p>
              )}

              <MagneticButton to="/catalogue" variant="ghost" className="mt-8" icon={<ArrowLeftIcon className="h-4 w-4" aria-hidden />}>
                Back to catalogue
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <TechnicalLabel code="Product information">Built for the working engineer</TechnicalLabel>
          <div className="mt-8 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
            <div className="bg-ink-950 p-6">
              <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Catalogue group</p>
              <p className="mt-3 font-display text-xl uppercase text-steel-50">{catalogue.group}</p>
            </div>
            <div className="bg-ink-950 p-6">
              <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Series covered</p>
              <p className="mt-3 font-display text-xl uppercase text-steel-50">
                {catalogue.series.length ? `${catalogue.series.length} series` : 'Range'}
              </p>
            </div>
            <div className="bg-ink-950 p-6">
              <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Access</p>
              <p className="mt-3 font-display text-xl uppercase text-signal">Form-gated PDF</p>
            </div>
          </div>
        </div>
      </section>

      {downloadOpen && <CatalogueDownloadModal catalogue={catalogue} onClose={() => setDownloadOpen(false)} />}
    </main>
  );
}
