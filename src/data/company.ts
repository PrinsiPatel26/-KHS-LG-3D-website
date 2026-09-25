export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export const company = {
  name: 'KHS-LG',
  legalName: 'KHS Innovation & Engineering LLP',
  tagline: 'Precision in Motion',
  headline: ['Precision', 'In Motion'],
  legacyHeadline: 'The Name Behind Unstoppable Motion',
  intro:
  'KHS Innovation & Engineering LLP is a one-stop destination for all types of bearing solutions. With over 50+ years of experience, KHS-LG has emerged as a leading bearings provider in the market and has worked with various notable companies and organizations functioning across a diverse range of industries.',
  shortIntro:
  'Precision bearing solutions trusted across industries worldwide — engineered for reliable motion, performance and industrial excellence.',
  experience: '50+ years of experience',
  certification: 'ISO 9001:2015',
  email: 'info@khsbearings.com',
  phone: '+91 9175275964',
  website: 'https://khslg.com/'
};

export const COMPANY_PHONE = '+91 9175275964';
export const COMPANY_PHONE_RAW = '919175275964';
export const COMPANY_WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE_RAW}`;

export const stats: Stat[] = [
{ value: 12000, suffix: '+', label: 'OEMs', note: 'Served across industries' },
{ value: 50, suffix: '+', label: 'Distributors', note: 'Supply network' },
{ value: 35, suffix: '+', label: 'Export Countries', note: 'Global reach' },
{ value: 4500, suffix: '+', label: 'Products', note: 'Bearing range' }];


export const markets: {country: string;lat: number;lon: number;}[] = [
{ country: 'Bangladesh', lat: 23.685, lon: 90.3563 },
{ country: 'Brazil', lat: -14.235, lon: -51.9253 },
{ country: 'Egypt', lat: 26.8206, lon: 30.8025 },
{ country: 'Hungary', lat: 47.1625, lon: 19.5033 },
{ country: 'India', lat: 20.5937, lon: 78.9629 },
{ country: 'Indonesia', lat: -0.7893, lon: 113.9213 },
{ country: 'Lithuania', lat: 55.1694, lon: 23.8813 },
{ country: 'Nepal', lat: 28.3949, lon: 84.124 },
{ country: 'Nigeria', lat: 9.082, lon: 8.6753 },
{ country: 'Qatar', lat: 25.3548, lon: 51.1839 },
{ country: 'Saudi Arabia', lat: 23.8859, lon: 45.0792 },
{ country: 'Turkey', lat: 38.9637, lon: 35.2433 },
{ country: 'Zambia', lat: -13.1339, lon: 27.8493 }];


export const timeline = [
{
  step: 'Foundation',
  title: 'A one-stop bearing destination',
  body: 'KHS Innovation & Engineering LLP was built around a single idea — become the one-stop destination for every type of bearing solution.'
},
{
  step: 'Experience',
  title: 'Over 50 years in motion',
  body: 'More than five decades of hands-on bearing experience across manufacturing, industrial and automobile applications.'
},
{
  step: 'Engineering',
  title: 'High technology support',
  body: 'The products and services offered by KHS-LG are high technology, assisting manufacturers in their product design.'
},
{
  step: 'Expansion',
  title: '12,000+ OEMs, 4,500+ products',
  body: 'A widening range of bearings supported by a distributor network that keeps industrial lines running.'
},
{
  step: 'Global Presence',
  title: 'Exporting to 35+ countries',
  body: 'Bearings shipped to markets across Asia, Europe, Africa, the Middle East and South America.'
}];


export const inspectionProcess = [
{ code: '01', name: 'Measure', body: 'Dimensional checks before anything moves forward.' },
{ code: '02', name: 'Inspect', body: 'Surfaces, rings and rolling elements reviewed in detail.' },
{ code: '03', name: 'Verify', body: 'Each batch verified against the order specification.' },
{ code: '04', name: 'Precision', body: 'Only bearings that meet the standard continue.' },
{ code: '05', name: 'Dispatch', body: 'Packed and released for dispatch to the customer.' }];