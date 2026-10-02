import React, { useState } from 'react';
import { CheckCircle2Icon, MailIcon, PhoneIcon, AlertCircleIcon, Loader2Icon, MapPinIcon, ArrowUpRightIcon } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { company } from '../data/company';
import { products } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import { useSearchParams } from 'react-router-dom';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  companyName: '',
  phone: '',
  email: '',
  requirement: products[0].name,
  message: ''
};

export function Contact() {
  const [searchParams] = useSearchParams();
  const requestedBrand = searchParams.get('brand');
  const requestedProduct = searchParams.get('product') ?? searchParams.get('category');
  const requestedRequirement = requestedBrand && requestedProduct ? `${requestedBrand} — ${requestedProduct}` : null;
  const [form, setForm] = useState<FormState>(() => requestedRequirement ? { ...EMPTY, requirement: requestedRequirement, message: `I am interested in ${requestedRequirement}. Please share availability, specifications and quotation.` } : EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const mapDestination = company.factoryOffice.split('\n').slice(1).map((line) => line.replace(/,$/, '')).join(', ');

  useSeo({
    title: 'Contact',
    description: `Contact KHS-LG — ${company.email}, ${company.phone}. Request a quote for precision bearing solutions.`,
    path: '/contact'
  });

  const update = (key: keyof FormState) => (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Enter your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Tell us about the application';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    window.setTimeout(() => {
      setStatus('success');
      setForm(EMPTY);
    }, 900);
  };

  return (
    <main>
      <PageHero
        code="Contact"
        eyebrow="Request a quote"
        lines={["Let's build", 'Better motion.']}
        body="Send us the application, the size and the motion you need. The KHS-LG team will come back with the right bearing from the range."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      

      <section className="bg-ink-900 py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <TechnicalLabel code="Direct">Get in touch</TechnicalLabel>
            <ul className="mt-8 space-y-px border border-ink-700 bg-ink-700">
              <li className="bg-ink-950 p-6">
                <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Email</p>
                <a
                  className="mt-2 flex items-center gap-2.5 font-display text-lg font-semibold uppercase text-steel-50 transition-colors hover:text-signal"
                  href={company.emailHref}>
                  
                  <MailIcon className="h-4 w-4 text-signal" aria-hidden />
                  {company.email}
                </a>
              </li>
              <li className="bg-ink-950 p-6">
                <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Phone</p>
                <a
                  className="mt-2 flex items-center gap-2.5 font-display text-lg font-semibold uppercase text-steel-50 transition-colors hover:text-signal"
                  href={company.phoneHref}>
                  
                  <PhoneIcon className="h-4 w-4 text-signal" aria-hidden />
                  {company.phone}
                </a>
              </li>
              <li className="bg-ink-950 p-6">
                <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                  Company
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">
                  {company.legalName}
                  <br />
                  <span className="text-signal">{company.certification}</span>
                </p>
              </li>
            </ul>
            <div className="mt-8 space-y-px border border-ink-700 bg-ink-700">
              {([
                ['Factory Office / Correspondence Address', company.factoryOffice],
                ['Registered Office', company.registeredOffice],
                ['Corporate Office', company.corporateOffice]
              ] as const).map(([label, address]) => (
                <section key={label} className="bg-ink-950 p-6">
                  <h2 className="font-mono text-[9px] uppercase tracking-tech text-steel-500">{label}</h2>
                  <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-steel-300">{address}</p>
                </section>
              ))}
              <section className="bg-ink-950 p-6">
                <h2 className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Zonal Offices</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">{company.zonalOffices.join(' · ')}</p>
              </section>
              <section className="bg-ink-950 p-6">
                <h2 className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Sales</h2>
                <a className="mt-2 inline-flex max-w-full break-all text-sm text-steel-300 transition-colors hover:text-signal" href={company.salesEmailHref}>{company.salesEmail}</a>
              </section>
            </div>
            <div className="mt-8 overflow-hidden border border-ink-700 bg-ink-950">
              <iframe
                title="Map to KHS Innovation & Engineering LLP factory office in Sonale, Bhiwandi"
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapDestination)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapDestination)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border-t border-ink-700 px-5 py-4 font-mono text-[10px] uppercase tracking-tech text-steel-300 transition-colors hover:text-signal"
              >
                <MapPinIcon className="h-4 w-4 text-signal" aria-hidden />
                Get directions
                <ArrowUpRightIcon className="ml-auto h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="border border-ink-700 bg-ink-950 p-6 sm:p-9">
            <h2 className="font-display text-2xl font-bold uppercase text-steel-50">
              Request a quote
            </h2>
            <p className="mt-2 text-sm text-steel-500">
              Fields marked with <span className="text-signal">*</span> are required.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                required
                value={form.name}
                onChange={update('name')}
                error={errors.name}
                autoComplete="name" />
              
              <Field
                label="Company"
                value={form.companyName}
                onChange={update('companyName')}
                autoComplete="organization" />
              
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                autoComplete="tel" />
              
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                error={errors.email}
                autoComplete="email" />
              

              <div className="sm:col-span-2">
                <label
                  htmlFor="requirement"
                  className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                  
                  Product / Requirement
                </label>
                <select
                  id="requirement"
                  value={form.requirement}
                  onChange={update('requirement')}
                  className="mt-2 w-full border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-steel-50 outline-none transition-colors focus:border-signal">
                  
                  {requestedRequirement && <option value={requestedRequirement}>{requestedRequirement}</option>}
                  {products.map((p) =>
                  <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  )}
                  <option value="Other requirement">Other requirement</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                  
                  Message <span className="text-signal">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  className="mt-2 w-full resize-y border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-steel-50 outline-none transition-colors focus:border-signal" />
                
                {errors.message &&
                <p className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
                    <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden />
                    {errors.message}
                  </p>
                }
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <MagneticButton type="submit" variant="yellow">
                {status === 'submitting' ? 'Sending' : 'Request a Quote'}
              </MagneticButton>

              <div aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.12em]">
                {status === 'submitting' &&
                <span className="flex items-center gap-2 text-steel-400">
                    <Loader2Icon className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    Sending enquiry
                  </span>
                }
                {status === 'success' &&
                <span className="flex items-center gap-2 text-signal">
                    <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden />
                    Enquiry ready — we will reply by email
                  </span>
                }
                {status === 'error' &&
                <span className="flex items-center gap-2 text-steel-300">
                    <AlertCircleIcon className="h-3.5 w-3.5 text-signal" aria-hidden />
                    Check the highlighted fields
                  </span>
                }
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>);

}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  autoComplete








}: {label: string;value: string;onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;error?: string;required?: boolean;type?: string;autoComplete?: string;}) {
  const id = label.toLowerCase().replace(/\s/g, '-');
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
        {label} {required && <span className="text-signal">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-steel-50 outline-none transition-colors focus:border-signal" />
      
      {error &&
      <p className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
          <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      }
    </div>);

}