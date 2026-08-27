import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from '../../data/navigation';


export function Logo({ className }: {className?: string;}) {
  return (
    <Link
      to="/"
      aria-label="KHS-LG home"
      className={cn(
        'group inline-flex items-center transition-opacity duration-200 ease-precision hover:opacity-85',
        className
      )}>
      <img
        src="/khslogo2-removebg-preview.png"
        alt="KHS-LG"
        className="h-12 w-40 origin-left object-contain sm:h-20 sm:w-60 sm:scale-x-150" />
    </Link>);

}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-[90] border-b transition-[background-color,border-color,height,backdrop-filter] duration-300 ease-precision',
          scrolled ?
          'h-16 border-signal/20 bg-ink-950/80 backdrop-blur-md lg:h-[70px]' :
          'h-20 border-steel-500/10 bg-transparent lg:h-24'
        )}>
        
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8">
          
          <Logo />

          <ul className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {NAV_ITEMS.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                className={({ isActive }) =>
                cn(
                  'group relative whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ease-precision',
                  isActive ? 'text-signal' : 'text-steel-300 hover:text-steel-50'
                )
                }>
                
                  {({ isActive }) =>
                <>
                      <span className="2xl:hidden">{item.short}</span>
                      <span className="hidden 2xl:inline">{item.label}</span>
                      <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )} />
                  
                    </>
                }
                </NavLink>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              data-cursor="open"
              className="hidden whitespace-nowrap border border-signal px-5 py-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-signal transition-colors duration-200 ease-precision hover:bg-signal hover:text-ink-950 xl:inline-block">
              
              Request a Quote
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 border border-steel-500/30 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-tech text-steel-300 transition-colors duration-200 ease-precision hover:border-signal hover:text-signal xl:hidden">
              
              <MenuIcon className="h-4 w-4" aria-hidden />
              Menu
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>);

}