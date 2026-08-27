import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon, ArrowUpRightIcon } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { company } from '../../data/company';
import { cn } from '../../utils/cn';

export function MobileMenu({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-[110] overflow-y-auto bg-ink-950 xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu">
        
          <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
          <div className="relative flex min-h-full flex-col px-5 pb-10 pt-6 sm:px-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                KHS-LG / <span className="text-signal">Navigation</span>
              </p>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center gap-2 border border-steel-500/30 px-3 py-2 font-mono text-[10px] uppercase tracking-tech text-steel-300">
              
                <XIcon className="h-4 w-4" aria-hidden />
                Close
              </button>
            </div>

            <ul className="mt-10 flex-1 space-y-1">
              {NAV_ITEMS.map((item, i) =>
            <motion.li
              key={item.to}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.36,
                delay: 0.05 + i * 0.045,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="border-b border-ink-700">
              
                  <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                cn(
                  'flex items-center justify-between py-4 font-display text-3xl font-semibold uppercase tracking-[0.04em] transition-colors',
                  isActive ? 'text-signal' : 'text-steel-50'
                )
                }>
                
                    {({ isActive }) =>
                <>
                        <span>{item.label}</span>
                        <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isActive ? 'bg-signal' : 'bg-ink-600'
                    )} />
                  
                      </>
                }
                  </NavLink>
                </motion.li>
            )}
            </ul>

            <div className="mt-10 space-y-4">
              <NavLink
              to="/contact"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 bg-signal py-4 font-display text-base font-bold uppercase tracking-[0.16em] text-ink-950">
              
                Request a Quote
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </NavLink>
              <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-steel-500">
                <a className="block" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <a className="block" href={`tel:${company.phone.replace(/\s/g, '')}`}>
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}