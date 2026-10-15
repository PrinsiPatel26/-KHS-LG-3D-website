import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon, ArrowUpRightIcon } from 'lucide-react';
import { company } from '../../data/company';
import { Logo } from './Navbar';

const FOOTER_NAV = [
  {
    title: 'Products',
    links: [
      { label: 'Ball Bearings', to: '/products' },
      { label: 'Roller Bearings', to: '/products' },
      { label: 'Bearing Units & Housings', to: '/products' },
      { label: 'Linear Motion', to: '/products' },
      { label: 'Linear Shafts & Supports', to: '/products' },
      { label: 'Rod Ends & Spherical Plain Bearings', to: '/products' },
      { label: 'Bushes & One-Way Clutches', to: '/products' },
      { label: 'Power Transmission', to: '/products' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Catalogue', to: '/catalogue' },
      { label: 'Technical Datasheets', to: '/catalogue' },
      { label: 'Product Search', to: '/products' },
      { label: 'Industries', to: '/industries' },
      { label: 'Blog', to: '/blog' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About KHS-LG', to: '/about' },
      { label: 'Quality', to: '/quality' },
      { label: 'Partner Brands', to: '/our-brands' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative border-t border-signal/20 bg-ink-950 overflow-hidden">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full opacity-[0.08] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #F5C400 0%, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel-400">
              {company.legalName} — precision bearings, linear motion and power transmission solutions trusted across industries worldwide.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 border border-signal/30 bg-ink-900/80 px-3 py-1 font-mono text-[10px] uppercase tracking-tech text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_6px_#F5C400]" />
              {company.certification} • 50+ Years Experience
            </div>
          </div>

          {FOOTER_NAV.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[10px] uppercase tracking-tech text-signal font-semibold">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs sm:text-sm text-steel-400 transition-colors duration-200 hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-tech text-signal font-semibold">
              Contact & Locations
            </h2>
            <ul className="mt-5 space-y-3 text-xs sm:text-sm text-steel-300">
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-signal text-steel-400"
                  href={company.emailHref}
                >
                  <MailIcon className="h-4 w-4 text-signal shrink-0" aria-hidden />
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-signal text-steel-400"
                  href={company.phoneHref}
                >
                  <PhoneIcon className="h-4 w-4 text-signal shrink-0" aria-hidden />
                  {company.phone}
                </a>
              </li>
            </ul>

            <div className="mt-5 border-t border-ink-800 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                Head Office
              </p>
              <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-steel-400">
                {company.factoryOffice}
              </p>
              <Link
                to="/contact"
                className="group mt-3 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-signal hover:underline"
              >
                Our Locations
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
            <li>
              <Link className="transition-colors hover:text-signal" to="/contact">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-signal" to="/contact">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>);

}