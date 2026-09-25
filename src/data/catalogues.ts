import { products } from './products';

export type CatalogueGroup = 'Bearings' | 'V-Belts & Timing Belts';

export interface CatalogueRecord {
  id: string;
  group: CatalogueGroup;
  sequence: number;
  title: string;
  image?: string;
  description: string;
  keywords: string[];
  series: string[];
  productSlug?: string;
  pdfAvailable: boolean;
  pdfUrl: string | null;
  pdfFileName: string | null;
  downloadType: 'pdf' | 'external' | null;
}

export interface CatalogueLead {
  catalogueName: string;
  catalogueId: string;
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  city: string;
  industry: string;
  message: string;
  timestamp: string;
}

export const catalogueGroups: { id: CatalogueGroup; code: string; title: string; description: string }[] = [
  { id: 'Bearings', code: '01', title: 'Bearings', description: 'Precision bearing solutions for industrial, OEM and motion applications.' },
  { id: 'V-Belts & Timing Belts', code: '02', title: 'V-Belts & Timing Belts', description: 'Power transmission solutions for industrial applications.' }
];

const bearingDefinitions = [
  ['taper-roller-bearings', 'Taper Roller Bearings', 'Combined radial and axial loads in one geometry.', ['30000 Series', '32000 Series', '33000 Series']],
  ['spherical-roller-bearings', 'Spherical Roller Bearings', 'Self-aligning motion under demanding conditions.', ['22200 Series', '22300 Series', '23000 Series']],
  ['deep-groove-ball-bearings', 'Deep Groove Ball Bearings', 'The most widely used bearing type in motion systems.', ['6000 Series', '6200 Series', '6300 Series']],
  ['miniature-ball-bearings', 'Miniature Ball Bearings', 'Small envelope, precision motion.', ['MR Series', 'R Series', 'Flanged Series']],
  ['cylindrical-roller-bearings', 'Cylindrical Roller Bearings', 'High radial capacity through line contact.', ['NU Series', 'NJ Series', 'N Series']],
  ['linear-motion-shafts-with-support', 'Linear Motion Shafts with Support', 'Supported linear shafts for stable, guided industrial movement.', ['Supported Shaft Series', 'Shaft Support Series']],
  ['linear-motion-bearings', 'Linear Motion Bearings', 'Guided motion along a straight axis.', ['LM Series', 'LME Series', 'Linear Guide Series']],
  ['pillow-block-bearings', 'Pillow Block Bearings', 'Mounted bearing units for dependable shaft support.', ['UC Series', 'UCP Series', 'UCF Series']],
  ['thrust-needle-roller-bearings', 'Thrust Needle Roller Bearings', 'Compact axial-load support for constrained assemblies.', ['AXK Series', 'AS Series']],
  ['stud-and-yoke-track-roller-bearings', 'Stud and Yoke Type Track Roller Bearings', 'Track-running solutions for cam, guide and conveyor applications.', ['CF Series', 'KR Series', 'NUKR Series']],
  ['machined-type-needle-roller-bearings', 'Machined Type Needle Roller Bearings', 'High radial capacity in compact precision housings.', ['NA Series', 'RNA Series', 'NKI Series']],
  ['rod-end-bearings', 'Rod End Bearings', 'Articulating linkage solutions for controlled mechanical movement.', ['SI Series', 'SA Series']],
  ['radial-spherical-plain-bearings', 'Radial Spherical Plain Bearings', 'Plain spherical motion for alignment and oscillating loads.', ['GE Series', 'GEZ Series']],
  ['one-way-clutch', 'One Way Clutch', 'One-direction motion control for overrunning and indexing systems.', ['CSK Series', 'HF Series']],
  ['cylindrical-roller-thrust-bearings', 'Cylindrical Roller Thrust Bearings', 'High axial-load capacity with robust roller contact.', ['811 Series', '812 Series']],
  ['drawn-cup-needle-roller-clutches', 'Drawn Cup Needle Roller Clutches', 'Compact one-way clutch assemblies for precision mechanisms.', ['HF Series', 'HFL Series']],
  ['permaglide-dry-bush', 'Permaglide Dry Bush', 'Maintenance-reduced dry-running bearing surfaces.', ['P Series', 'E Series']],
  ['needle-roller-and-cage-assemblies', 'Needle Roller and Cage Assemblies', 'Low-section rolling elements for compact shaft arrangements.', ['K Series', 'KZK Series']],
  ['track-roller-bearings', 'Track Roller Bearings', 'Profiled rolling support for cam and track guidance.', ['NATR Series', 'NUTR Series']],
  ['flat-roller-cages', 'Flat Roller Cages', 'Guided roller cage assemblies for linear precision systems.', ['Flat Cage Series']],
  ['precision-angular-contact-bearings', 'Precision Angular Contact Bearings', 'High-speed precision support for combined radial and axial loads.', ['7000 Series', '7200 Series', '7300 Series']],
  ['self-aligning-ball-bearings', 'Self-Aligning Ball Bearings', 'Compensate for shaft and housing alignment variation.', ['1200 Series', '1300 Series', '2200 Series']],
  ['thrust-ball-bearings', 'Thrust Ball Bearings', 'Dedicated axial-load support for rotating assemblies.', ['51100 Series', '51200 Series']],
  ['spherical-roller-thrust-bearings', 'Spherical Roller Thrust Bearings', 'Heavy axial-load support with self-aligning capability.', ['29200 Series', '29300 Series', '29400 Series']],
  ['dual-shaft-guides', 'Dual Shaft Guides', 'Parallel shaft guidance for stable linear motion.', ['Dual Guide Series']],
  ['drawn-cup-needle-roller-bearings', 'Drawn Cup Needle Roller Bearings', 'Thin-section needle rollers for compact radial applications.', ['HK Series', 'HMK Series', 'SCE Series']]
] as const;

const bearingImages: Record<string, string> = {
  'taper-roller-bearings': '/taper roller.webp',
  'spherical-roller-bearings': '/spheriphle roller.webp',
  'deep-groove-ball-bearings': '/depp grove roller.webp',
  'miniature-ball-bearings': '/miniature ball bearing.webp',
  'cylindrical-roller-bearings': '/cylindrical roller bearing.webp',
  'linear-motion-shafts-with-support': '/linear motion shaft with support.webp',
  'linear-motion-bearings': '/linear motion bearing.webp',
  'pillow-block-bearings': '/pillow-block-bearing.webp',
  'thrust-needle-roller-bearings': '/thrust-needle-roller-bearing.webp',
  'stud-and-yoke-track-roller-bearings': '/track-roller-bearing-stud-yoke.webp',
  'machined-type-needle-roller-bearings': '/machined-needle-roller-bearing.webp',
  'radial-spherical-plain-bearings': '/radial-spherical-plain-bearing.webp',
  'one-way-clutch': '/one-way-clutch-bearing.webp',
  'drawn-cup-needle-roller-clutches': '/drawn-cup-needle-roller-clutch.webp',
  'permaglide-dry-bush': '/permaglide-dry-bush.webp',
  'needle-roller-and-cage-assemblies': '/needle-roller-and-cage-assembly.webp',
  'track-roller-bearings': '/track-roller-bearing.webp',
  'flat-roller-cages': '/flat-roller-bearing.webp',
  'precision-angular-contact-bearings': '/precision-angular-contact-bearing.webp',
  'self-aligning-ball-bearings': '/self-aligning-ball-bearing.webp',
  'dual-shaft-guides': '/dual-shaft-guide.webp',
  'drawn-cup-needle-roller-bearings': '/drawn-cup-needle-roller-bearing.webp'
};

const productBySlug = new Map(products.map((product) => [product.slug, product]));

type CatalogueDocument = Pick<CatalogueRecord, 'pdfAvailable' | 'pdfUrl' | 'pdfFileName' | 'downloadType'>;

const bearingDocuments: Record<string, CatalogueDocument> = {
  'taper-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing', pdfFileName: 'TRB_V4.pdf', downloadType: 'external' },
  'spherical-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1YRcNxrLDpNZzICiGKU6rFogHk7KNsEnS/view?usp=sharing', pdfFileName: 'SRB_V3.pdf', downloadType: 'external' },
  'deep-groove-ball-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing', pdfFileName: 'Deep Groove Ball Bearing_V7_1.pdf', downloadType: 'external' },
  'miniature-ball-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'cylindrical-roller-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'linear-motion-shafts-with-support': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'linear-motion-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1xSpNU2KxiztdonxZ4tqvfKs4PgjksqA8/view?usp=sharing', pdfFileName: 'Linear-Motion-Bearings_V2.pdf', downloadType: 'external' },
  'pillow-block-bearings': { pdfAvailable: true, pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf', pdfFileName: 'Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf', downloadType: 'pdf' },
  'thrust-needle-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1ph9S7mUIvVcCztHV5dfix5Ax4aRZGK4B/view?usp=sharing', pdfFileName: 'Thrust needle roller bearings_V1 (1).pdf', downloadType: 'external' },
  'stud-and-yoke-track-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1V7HrKUSc8gXyoqqgvNMUL6Mrcf7G65U0/view?usp=sharing', pdfFileName: 'Stud-yoke-type-track-roller-bearings_V4 (1).pdf', downloadType: 'external' },
  'machined-type-needle-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/16Je1Rk6QT_NVN4f-UCDkEl5GaHB14bWk/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'rod-end-bearings': { pdfAvailable: true, pdfUrl: 'https://khslg.com/wp-content/uploads/2026/08/ROD-END-Bearings_V2-1.pdf', pdfFileName: 'ROD-END-Bearings_V2-1.pdf', downloadType: 'pdf' },
  'radial-spherical-plain-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1OROXPqiS_P-dIEuBDqK0cHMs8OWBni2p/view', pdfFileName: null, downloadType: 'external' },
  'one-way-clutch': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'cylindrical-roller-thrust-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'drawn-cup-needle-roller-clutches': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1kuPQzZtzUMa_NZRcFOLrTcLH1WO-Nmc8/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'permaglide-dry-bush': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'needle-roller-and-cage-assemblies': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'track-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1rGqm8PLsRDNLvrcjGvnsdVXTTEhEJ9L0/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'flat-roller-cages': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1-4uxDpKL3yifw_X7LH0kd7a4EUVjZhh-/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'precision-angular-contact-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view', pdfFileName: null, downloadType: 'external' },
  'self-aligning-ball-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1rVcLmek8uJsImMbeOSW9S3EBmSHtgVGb/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'thrust-ball-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'spherical-roller-thrust-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1h7I5-VE-kHyyH1PGV9WDgdXTY5b75Apz/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'dual-shaft-guides': { pdfAvailable: true, pdfUrl: 'https://www.khslg.com/wp-content/uploads/2019/11/KHS-LG-dual-guides.pdf', pdfFileName: 'KHS-LG-dual-guides.pdf', downloadType: 'pdf' },
  'drawn-cup-needle-roller-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null }
};

export const bearingCatalogues: CatalogueRecord[] = bearingDefinitions.map(([id, title, description, series], index) => {
  const product = productBySlug.get(id);
  return {
    id,
    group: 'Bearings' as const,
    sequence: index + 1,
    title,
    image: bearingImages[id],
    description: product?.description ?? description,
    keywords: [title, description, ...series],
    series: [...series],
    productSlug: product?.slug,
    ...(bearingDocuments[id] ?? { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null })
  };
});

const vBeltsDefinitions = [
  ['classical-wrapped-v-belt', 'Classical Wrapped V-Belt', 'General industrial wrapped V-belt for dependable power transmission.', ['A', 'B', 'C']],
  ['wedge-cogged-v-belt', 'Wedge Cogged V-Belt', 'Cogged profile improves flexibility and heat performance in demanding drives.', ['SPZ', 'SPA', 'SPB']],
  ['poly-ribbed-v-belt', 'Poly Ribbed V-Belt', 'Multi-rib drive solution for compact power transmission with high efficiency.', ['PK', 'PH', 'PL']],
  ['laminated-v-belt', 'Laminated V-Belt', 'Layered construction for stable transmission under variable load conditions.', ['Banded', 'Laminated']],
  ['industrial-variable-speed-v-belt', 'Industrial Variable Speed V-Belt', 'Adjustable speed belt for variable-pitch drive solutions.', ['VS', 'CVT']],
  ['industrial-rubber-timing-belt', 'Industrial Rubber Timing Belt', 'Synchronous rubber timing belt for accurate industrial motion control.', ['TR', 'HTD', 'STD']],
  ['industrial-pu-timing-belt', 'Industrial PU Timing Belt', 'Precision polyurethane timing belt for indexed and continuous motion systems.', ['PU', 'AT', 'T-Series']],
  ['hexagonal-v-belt', 'Hexagonal V-Belt', 'Hexagonal cross-section designed for compact and flexible drive layouts.', ['Hex', 'H']],
  ['wedge-narrow-v-belt', 'Wedge Narrow V-Belt', 'High-power narrow wedge profile for efficient compact drives.', ['3V', '5V', '8V']],
  ['classical-raw-edge-cogged-v-belt', 'Classical Raw Edge Cogged V-Belt', 'Raw-edge cogged classical belt for enhanced flexibility and lower heat buildup.', ['A', 'B', 'C']],
  ['banded-v-belt', 'Banded V-Belt', 'Multi-rib joined belt for balanced load sharing and stable operation.', ['Banded', 'Joined']] 
] as const;

const vBeltsCatalogues: CatalogueRecord[] = vBeltsDefinitions.map(([id, title, description, series], index) => ({
  id,
  group: 'V-Belts & Timing Belts',
  sequence: index + 1,
  title,
  description,
  keywords: [title, description, ...series],
  series: [...series],
  pdfAvailable: false,
  pdfUrl: null,
  pdfFileName: null,
  downloadType: null
}));

export const catalogues: CatalogueRecord[] = [...bearingCatalogues, ...vBeltsCatalogues];
export const bearingCatalogueTotal = bearingCatalogues.length;
export const vBeltsCatalogueTotal = vBeltsCatalogues.length;

export function getCatalogueById(id: string | undefined) { return catalogues.find((catalogue) => catalogue.id === id); }
export function searchCatalogues(query: string, records = catalogues) {
  const term = query.trim().toLowerCase();
  if (!term) return records;
  return records.filter((catalogue) => [catalogue.title, catalogue.group, catalogue.description, ...catalogue.keywords, ...catalogue.series].join(' ').toLowerCase().includes(term));
}
export function submitCatalogueLead(catalogue: CatalogueRecord, form: Omit<CatalogueLead, 'catalogueName' | 'catalogueId' | 'timestamp'>) {
  const lead: CatalogueLead = { catalogueName: catalogue.title, catalogueId: catalogue.id, ...form, timestamp: new Date().toISOString() };
  const existing = JSON.parse(window.localStorage.getItem('khs-lg-catalogue-leads') ?? '[]') as CatalogueLead[];
  window.localStorage.setItem('khs-lg-catalogue-leads', JSON.stringify([...existing, lead]));
  return lead;
}
