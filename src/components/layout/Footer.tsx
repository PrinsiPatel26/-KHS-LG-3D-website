import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { company, markets } from '../../data/company';
import { products } from '../../data/products';
import { Logo } from './Navbar';

const COLUMNS: {title: string;links: {label: string;to: string;}[];}[] = [
{
  title: 'Products',
  links: products.slice(0, 6).map((p) => ({ label: p.name, to: `/products/${p.slug}` }))
},
{
  title: 'Company',
  links: [
    { label: 'Catalogue', to: '/catalogue' },
    { label: 'Applications', to: '/applications' },
    { label: 'Technology', to: '/technology' },
    { label: 'Quality', to: '/quality' },
    { label: 'Careers', to: '/careers' },
    { label: 'About KHS-LG', to: '/about' }]

}];


export function Footer() {
  return (
    <footer className="relative border-t border-ink-700 bg-ink-950">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel-500">
              {company.legalName} — precision bearing solutions trusted across industries
              worldwide.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-tech text-signal">
              {company.certification}
            </p>
          </div>

          {COLUMNS.map((col) =>
          <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) =>
              <li key={link.label + link.to}>
                    <Link
                  to={link.to}
                  className="text-sm text-steel-300 transition-colors duration-200 hover:text-signal">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>
          )}

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-steel-300">
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-signal"
                  href={company.emailHref}>
                  
                  <MailIcon className="h-4 w-4 text-signal" aria-hidden />
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-signal"
                  href={company.phoneHref}>
                  
                  <PhoneIcon className="h-4 w-4 text-signal" aria-hidden />
                  {company.phone}
                </a>
              </li>
            </ul>
            <p className="mt-6 whitespace-pre-line break-words text-xs leading-relaxed text-steel-500">
              {company.factoryOffice}
            </p>
            <h2 className="mt-8 font-mono text-[10px] uppercase tracking-tech text-steel-500">
              Export markets
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-steel-500">
              {markets.map((m) => m.country).join(' · ')}
            </p>
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