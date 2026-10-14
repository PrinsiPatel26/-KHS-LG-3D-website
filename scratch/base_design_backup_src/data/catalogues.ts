import { products } from './products';

export type CatalogueGroup = 'Bearings' | 'Linear Shafts' | 'Linear Motion' | 'Power Transmission';

export interface CatalogueRecord {
  id: string;
  group: CatalogueGroup;
  categoryTag?: string;
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
  { id: 'Linear Shafts', code: '02', title: 'Linear Shafts', description: 'Hard-chrome shafts, supported linear rails, and precision shaft support units.' },
  { id: 'Linear Motion', code: '03', title: 'Linear Motion', description: 'Linear guideways, dual shaft guides, and recirculating ball bushing units.' },
  { id: 'Power Transmission', code: '04', title: 'Power Transmission', description: 'Power transmission solutions including timing belts and V-belts.' }
];

export const bearingImages: Record<string, string> = {
  'taper-roller-bearings': '/assets/products/taper-roller-bearing.png',
  'spherical-roller-bearings': '/assets/products/spherical-roller-bearing.png',
  'deep-groove-ball-bearings': '/assets/products/deep-groove-roller-bearing.png',
  'miniature-ball-bearings': '/assets/products/miniature-ball-bearing.png',
  'cylindrical-roller-bearings': '/assets/products/cylindrical-roller-bearing.png',
  'linear-motion-shafts-with-support': '/assets/products/linear-motion-shaft-with-support.png',
  'linear-motion-bearings': '/assets/products/linear-motion-bearing.png',
  'pillow-block-bearings': '/assets/products/pillow-block-bearing.png',
  'thrust-needle-roller-bearings': '/assets/products/thrust-needle-roller-bearing.png',
  'stud-and-yoke-track-roller-bearings': '/assets/products/track-roller-bearing-stud-yoke.png',
  'machined-type-needle-roller-bearings': '/assets/products/machined-needle-roller-bearing.png',
  'rod-end-bearings': '/rod-end.png',
  'radial-spherical-plain-bearings': '/assets/products/radial-spherical-plain-bearing.png',
  'one-way-clutch': '/assets/products/one-way-clutch-bearing.png',
  'cylindrical-roller-thrust-bearings': '/assets/products/cylindrical-roller-bearing.png',
  'drawn-cup-needle-roller-clutches': '/assets/products/drawn-cup-needle-roller-clutch.png',
  'permaglide-dry-bush': '/assets/products/permaglide-dry-bush.png',
  'needle-roller-and-cage-assemblies': '/assets/products/needle-roller-and-cage-assembly.png',
  'track-roller-bearings': '/assets/products/track-roller-bearing.png',
  'flat-roller-cages': '/assets/products/flat-roller-bearing.png',
  'precision-angular-contact-bearings': '/assets/products/precision-angular-contact-bearing.png',
  'self-aligning-ball-bearings': '/assets/products/self-aligning-ball-bearing.png',
  'thrust-ball-bearings': '/assets/products/thrust-ball-bearing.png',
  'spherical-roller-thrust-bearings': '/assets/products/spherical-roller-bearing.png',
  'dual-shaft-guides': '/assets/products/dual-shaft-guide.png',
  'drawn-cup-needle-roller-bearings': '/assets/products/drawn-cup-needle-roller-bearing.png',

  // Linear Shafts series
  'shaft-custom-made': '/assets/products/shaft-custom-made.png',
  'shaft-s-st': '/assets/products/shaft-s-st.png',
  'shaft-s-stu': '/assets/products/shaft-s-stu.png',
  'shaft-st': '/assets/products/shaft-st.png',
  'shaft-stu': '/assets/products/shaft-stu.png',
  'shaft-was-solid': '/assets/products/shaft-was-solid.png',
  'hard-chrome-shafts': '/assets/products/linear-motion-shaft.png',
  'shafts-with-support': '/assets/products/linear-motion-shaft-with-support.png',
  'shaft-supporting-units': '/assets/products/shaft-support-unit.png'
};

const bearingDefinitions = [
  ['taper-roller-bearings', 'Taper Roller Bearings', 'Combined radial and axial loads in one geometry.', ['30000 Series', '32000 Series', '33000 Series']],
  ['spherical-roller-bearings', 'Spherical Roller Bearings', 'Self-aligning motion under demanding conditions.', ['22200 Series', '22300 Series', '23000 Series']],
  ['deep-groove-ball-bearings', 'Deep Groove Ball Bearings', 'The most widely used bearing type in motion systems.', ['6000 Series', '6200 Series', '6300 Series']],
  ['miniature-ball-bearings', 'Miniature Ball Bearings', 'Small envelope, precision motion.', ['MR Series', 'R Series', 'Flanged Series']],
  ['cylindrical-roller-bearings', 'Cylindrical Roller Bearings', 'High radial capacity through line contact.', ['NU Series', 'NJ Series', 'N Series']],
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
  ['drawn-cup-needle-roller-bearings', 'Drawn Cup Needle Roller Bearings', 'Thin-section needle rollers for compact radial applications.', ['HK Series', 'HMK Series', 'SCE Series']]
] as const;

type CatalogueDocument = Pick<CatalogueRecord, 'pdfAvailable' | 'pdfUrl' | 'pdfFileName' | 'downloadType'>;

const bearingDocuments: Record<string, CatalogueDocument> = {
  'taper-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing', pdfFileName: 'TRB_V4.pdf', downloadType: 'external' },
  'spherical-roller-bearings': { pdfAvailable: true, pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf', pdfFileName: 'iko-spherical-bushings-catalogue.pdf', downloadType: 'pdf' },
  'deep-groove-ball-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing', pdfFileName: 'Deep Groove Ball Bearing_V7_1.pdf', downloadType: 'external' },
  'miniature-ball-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'cylindrical-roller-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'pillow-block-bearings': { pdfAvailable: true, pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf', pdfFileName: 'Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf', downloadType: 'pdf' },
  'thrust-needle-roller-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1ph9S7mUIvVcCztHV5dfix5Ax4aRZGK4B/view?usp=sharing', pdfFileName: 'Thrust needle roller bearings_V1 (1).pdf', downloadType: 'external' },
  'stud-and-yoke-track-roller-bearings': { pdfAvailable: true, pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf', pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf', downloadType: 'pdf' },
  'machined-type-needle-roller-bearings': { pdfAvailable: true, pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf', pdfFileName: 'iko-needle-roller-cages-catalogue.pdf', downloadType: 'pdf' },
  'rod-end-bearings': { pdfAvailable: true, pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf', pdfFileName: 'iko-rod-ends-l-balls-catalogue.pdf', downloadType: 'pdf' },
  'radial-spherical-plain-bearings': { pdfAvailable: true, pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf', pdfFileName: 'iko-spherical-bushings-catalogue.pdf', downloadType: 'pdf' },
  'one-way-clutch': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'cylindrical-roller-thrust-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'drawn-cup-needle-roller-clutches': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1kuPQzZtzUMa_NZRcFOLrTcLH1WO-Nmc8/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'permaglide-dry-bush': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'needle-roller-and-cage-assemblies': { pdfAvailable: true, pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf', pdfFileName: 'iko-needle-roller-cages-catalogue.pdf', downloadType: 'pdf' },
  'track-roller-bearings': { pdfAvailable: true, pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf', pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf', downloadType: 'pdf' },
  'flat-roller-cages': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1-4uxDpKL3yifw_X7LH0kd7a4EUVjZhh-/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'precision-angular-contact-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view', pdfFileName: null, downloadType: 'external' },
  'self-aligning-ball-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1rVcLmek8uJsImMbeOSW9S3EBmSHtgVGb/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'thrust-ball-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null },
  'spherical-roller-thrust-bearings': { pdfAvailable: true, pdfUrl: 'https://drive.google.com/file/d/1h7I5-VE-kHyyH1PGV9WDgdXTY5b75Apz/view?usp=sharing', pdfFileName: null, downloadType: 'external' },
  'drawn-cup-needle-roller-bearings': { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null }
};

const productBySlug = new Map(products.map((product) => [product.slug, product]));

export const bearingCatalogues: CatalogueRecord[] = bearingDefinitions.map(([id, title, description, series], index) => {
  const product = productBySlug.get(id);
  return {
    id,
    group: 'Bearings' as const,
    categoryTag: 'Rolling & Plain Bearings',
    sequence: index + 1,
    title,
    image: bearingImages[id],
    description: product?.description ?? description,
    keywords: [title, description, ...series, 'Bearings'],
    series: [...series],
    productSlug: product?.slug,
    ...(bearingDocuments[id] ?? { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null })
  };
});

// Linear Shafts catalogue items matching reference UI
const linearShaftsDefinitions = [
  ['shaft-custom-made', 'Custom-made', 'Custom precision linear shafts machined to OEM drawing tolerances and hardening specs.', ['Custom Machined Ends', 'Special Diameters', 'Flanged Ends', 'Keyways & Tapers']],
  ['shaft-s-st', 'S-ST', 'Precision aluminum shaft support unit designed for secure end clamping and rigid alignment.', ['S-ST 12', 'S-ST 16', 'S-ST 20', 'S-ST 25', 'S-ST 30']],
  ['shaft-s-stu', 'S-STU', 'Heavy-duty flanged shaft support unit for rigid machine base mounting.', ['S-STU 12', 'S-STU 16', 'S-STU 20', 'S-STU 25', 'S-STU 30']],
  ['shaft-st', 'ST', 'Pre-assembled linear shaft with continuous aluminum support rail for deflection-free motion.', ['ST 16', 'ST 20', 'ST 25', 'ST 30', 'ST 40']],
  ['shaft-stu', 'STU', 'Open continuous linear shaft and support rail system designed for long-stroke industrial travel.', ['STU 16', 'STU 20', 'STU 25', 'STU 30', 'STU 40']],
  ['shaft-was-solid', 'WAS - Solid Shaft', 'Induction-hardened hard-chrome plated solid linear shafts precision ground to h6 tolerance.', ['WAS 12', 'WAS 16', 'WAS 20', 'WAS 25', 'WAS 30', 'WAS 40', 'WAS 50']],
  ['hard-chrome-shafts', 'Hard-Chrome Shafts', 'Precision linear motion shafts with high-grade hard chrome plating for extreme wear protection.', ['C45E', 'Cf53', '100Cr6', 'X46Cr13']],
  ['shafts-with-support', 'Shafts with Support', 'Supported shaft rails engineered to eliminate shaft bending in heavy automated machines.', ['SA Series', 'TBR Series', 'SBR Series']],
  ['shaft-supporting-units', 'Shaft Supporting Units', 'Precision machined end support units and clamping blocks for linear assemblies.', ['SK Series', 'SHF Series', 'WA Series']]
] as const;

export const linearShaftsCatalogues: CatalogueRecord[] = linearShaftsDefinitions.map(([id, title, description, series], index) => ({
  id,
  group: 'Linear Shafts' as const,
  categoryTag: 'Shaft Guidance Systems',
  sequence: index + 1,
  title,
  image: bearingImages[id],
  description,
  keywords: [title, description, ...series, 'Linear Shafts', 'Hard-Chrome'],
  series: [...series],
  productSlug: id,
  pdfAvailable: true,
  pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
  pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
  downloadType: 'pdf'
}));

// Linear Motion Guideways and Units
const linearMotionDefinitions = [
  ['linear-motion-bearings', 'Linear Motion Bearings', 'Guided motion along a straight axis with recirculating balls.', ['LM Series', 'LME Series', 'LMEK Series', 'LMF Series']],
  ['dual-shaft-guides', 'Dual Shaft Guides', 'Parallel twin-shaft guidance blocks and rails for high-stability linear motion.', ['Dual Guide Series', 'Compact Series']],
  ['linear-motion-shafts-with-support', 'Linear Motion Shafts with Support', 'Supported linear shafts for stable, guided industrial movement.', ['Supported Shaft Series', 'Shaft Support Series']]
] as const;

export const linearMotionCatalogues: CatalogueRecord[] = linearMotionDefinitions.map(([id, title, description, series], index) => ({
  id,
  group: 'Linear Motion' as const,
  categoryTag: 'Linear Motion Systems',
  sequence: index + 1,
  title,
  image: bearingImages[id],
  description,
  keywords: [title, description, ...series, 'Linear Motion', 'Guideways'],
  series: [...series],
  productSlug: id,
  pdfAvailable: true,
  pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
  pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
  downloadType: 'pdf'
}));

// Power Transmission (V-Belts & Timing Belts)
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

export const vBeltsCatalogues: CatalogueRecord[] = vBeltsDefinitions.map(([id, title, description, series], index) => {
  const isTiming = id.includes('timing');
  return {
    id,
    group: 'Power Transmission' as const,
    categoryTag: isTiming ? 'Timing Belts' : 'V-Belts',
    sequence: index + 1,
    title,
    image: isTiming ? '/assets/products/timing-belt.png' : '/assets/products/v-belt.png',
    description,
    keywords: [title, description, ...series, 'Belts', 'Power Transmission'],
    series: [...series],
    pdfAvailable: false,
    pdfUrl: null,
    pdfFileName: null,
    downloadType: null
  };
});

export const catalogues: CatalogueRecord[] = [
  ...bearingCatalogues,
  ...linearShaftsCatalogues,
  ...linearMotionCatalogues,
  ...vBeltsCatalogues
];

export const bearingCatalogueTotal = bearingCatalogues.length;
export const linearShaftsCatalogueTotal = linearShaftsCatalogues.length;
export const linearMotionCatalogueTotal = linearMotionCatalogues.length;
export const vBeltsCatalogueTotal = vBeltsCatalogues.length;

export function getCatalogueById(id: string | undefined) {
  return catalogues.find((catalogue) => catalogue.id === id);
}

export function searchCatalogues(query: string, records = catalogues) {
  const term = query.trim().toLowerCase();
  if (!term) return records;
  return records.filter((catalogue) =>
    [catalogue.title, catalogue.group, catalogue.categoryTag, catalogue.description, ...catalogue.keywords, ...catalogue.series]
      .join(' ')
      .toLowerCase()
      .includes(term)
  );
}

export function submitCatalogueLead(
  catalogue: CatalogueRecord,
  form: Omit<CatalogueLead, 'catalogueName' | 'catalogueId' | 'timestamp'>
) {
  const lead: CatalogueLead = {
    catalogueName: catalogue.title,
    catalogueId: catalogue.id,
    ...form,
    timestamp: new Date().toISOString()
  };
  const existing = JSON.parse(window.localStorage.getItem('khs-lg-catalogue-leads') ?? '[]') as CatalogueLead[];
  window.localStorage.setItem('khs-lg-catalogue-leads', JSON.stringify([...existing, lead]));
  return lead;
}

export interface ProductPdfInfo {
  pdfUrl: string;
  pdfFileName: string;
  title: string;
  downloadType: 'pdf' | 'external';
}

export const LOCAL_PDF_CATALOGUES: Record<string, ProductPdfInfo> = {
  // 1. IKO Spherical Bushings
  'spherical-roller-bearings': {
    pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf',
    pdfFileName: 'iko-spherical-bushings-catalogue.pdf',
    title: 'IKO Spherical Bushings Catalogue',
    downloadType: 'pdf'
  },
  'radial-spherical-plain-bearings': {
    pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf',
    pdfFileName: 'iko-spherical-bushings-catalogue.pdf',
    title: 'IKO Spherical Bushings Catalogue',
    downloadType: 'pdf'
  },

  // 2. IKO Rod Ends / L-Balls
  'rod-end-bearings': {
    pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf',
    pdfFileName: 'iko-rod-ends-l-balls-catalogue.pdf',
    title: 'IKO Rod Ends & L-Balls Catalogue',
    downloadType: 'pdf'
  },

  // 3. IKO Cam Followers & Roller Followers & Double Hex
  'stud-and-yoke-track-roller-bearings': {
    pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
    pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
    title: 'IKO Cam & Roller Followers Catalogue',
    downloadType: 'pdf'
  },
  'stud-type-track-roller-bearings': {
    pdfUrl: '/assets/iko-double-hex-cam-followers-catalogue.pdf',
    pdfFileName: 'iko-double-hex-cam-followers-catalogue.pdf',
    title: 'IKO Double Hex Cam Followers Catalogue',
    downloadType: 'pdf'
  },
  'yoke-type-track-roller-bearings': {
    pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
    pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
    title: 'IKO Roller Followers Catalogue',
    downloadType: 'pdf'
  },
  'track-roller-bearings': {
    pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
    pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
    title: 'IKO Cam & Roller Followers Catalogue',
    downloadType: 'pdf'
  },

  // 4. IKO Needle Rollers & Cages
  'needle-roller-and-cage-assemblies': {
    pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
    pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
    title: 'IKO Needle Roller & Cage Assemblies Catalogue',
    downloadType: 'pdf'
  },
  'machined-type-needle-roller-bearings': {
    pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
    pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
    title: 'IKO Needle Roller Bearings Catalogue',
    downloadType: 'pdf'
  },

  // 5. WON ST Linear Motion Guide & Shafts Catalogue
  'linear-motion-bearings': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Linear Motion Guide & Crossed Roller Catalogue',
    downloadType: 'pdf'
  },
  'linear-motion-bearings-with-housing': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Linear Motion Guide Catalogue',
    downloadType: 'pdf'
  },
  'dual-shaft-guides': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Dual Shaft Guides Catalogue',
    downloadType: 'pdf'
  },
  'dual-shaft-guides-blocks': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Dual Shaft Guides Catalogue',
    downloadType: 'pdf'
  },
  'cross-roller-guideway': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Crossed Roller Guideway Catalogue',
    downloadType: 'pdf'
  },
  'hard-chrome-shafts': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Precision Shafts & Guideway Catalogue',
    downloadType: 'pdf'
  },
  'shafts-with-support': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Shafts with Support Catalogue',
    downloadType: 'pdf'
  },
  'shaft-supporting-units': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Shaft Supporting Units Catalogue',
    downloadType: 'pdf'
  },
  'linear-motion-shafts-with-support': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WON ST Supported Linear Shafts Catalogue',
    downloadType: 'pdf'
  },
  'shaft-custom-made': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'Precision Linear Shafts Catalogue',
    downloadType: 'pdf'
  },
  'shaft-s-st': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'S-ST Shaft Support Units Catalogue',
    downloadType: 'pdf'
  },
  'shaft-s-stu': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'S-STU Flanged Shaft Support Units Catalogue',
    downloadType: 'pdf'
  },
  'shaft-st': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'ST Supported Shaft Rails Catalogue',
    downloadType: 'pdf'
  },
  'shaft-stu': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'STU Supported Shaft Rails Catalogue',
    downloadType: 'pdf'
  },
  'shaft-was-solid': {
    pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
    pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
    title: 'WAS Solid Induction Hardened Shafts Catalogue',
    downloadType: 'pdf'
  },

  // 6. ISO 9001:2015 Certification
  'khs-iso-9001-certification': {
    pdfUrl: '/assets/khs-iso-9001-certification.pdf',
    pdfFileName: 'khs-iso-9001-certification.pdf',
    title: 'KHS Innovation & Engineering ISO 9001:2015 Registration Certificate',
    downloadType: 'pdf'
  }
};

export function getProductPdf(idOrSlug: string | undefined): ProductPdfInfo | null {
  if (!idOrSlug) return null;
  if (LOCAL_PDF_CATALOGUES[idOrSlug]) {
    return LOCAL_PDF_CATALOGUES[idOrSlug];
  }
  const cat = getCatalogueById(idOrSlug);
  if (cat && cat.pdfUrl && cat.pdfAvailable) {
    return {
      pdfUrl: cat.pdfUrl,
      pdfFileName: cat.pdfFileName ?? `${cat.id}.pdf`,
      title: cat.title,
      downloadType: cat.downloadType ?? 'pdf'
    };
  }
  return null;
}

