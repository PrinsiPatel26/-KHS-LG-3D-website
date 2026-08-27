export interface Product {
  slug: string;
  name: string;
  code: string;
  short: string;
  description: string;
  motion: string;
  applications: string[];
  features: string[];
  components: string[];
}

/**
 * Product categories as listed on khslg.com. No specifications,
 * tolerances or capacities are invented here.
 */
export const products: Product[] = [
{
  slug: 'taper-roller-bearings',
  name: 'Taper Roller Bearings',
  code: 'TRB',
  short: 'Combined radial and axial loads in one geometry.',
  description:
  'Taper roller bearings use tapered rollers running on tapered raceways, allowing them to carry combined radial and axial loads. They are a core part of the KHS-LG bearing range supplied to OEMs and industrial customers.',
  motion: 'Combined load',
  applications: ['Automobile assemblies', 'Industrial gearboxes', 'Heavy machinery'],
  features: [
  'Tapered rollers on tapered raceways',
  'Carries combined radial and axial loads',
  'Supplied through the KHS-LG distributor network'],

  components: ['Outer ring (cup)', 'Inner ring (cone)', 'Tapered rollers', 'Cage']
},
{
  slug: 'spherical-roller-bearings',
  name: 'Spherical Roller Bearings',
  code: 'SRB',
  short: 'Self-aligning motion under demanding conditions.',
  description:
  'Spherical roller bearings are designed to accommodate misalignment and shaft deflection while carrying heavy loads, making them a dependable choice for demanding industrial equipment.',
  motion: 'Self-aligning',
  applications: ['Manufacturing plant equipment', 'Material handling', 'Industrial drives'],
  features: [
  'Accommodates misalignment and shaft deflection',
  'Built for heavy industrial duty',
  'Part of the 4,500+ product KHS-LG range'],

  components: ['Outer ring', 'Inner ring', 'Spherical rollers', 'Cage']
},
{
  slug: 'deep-groove-ball-bearings',
  name: 'Deep Groove Ball Bearings',
  code: 'DGBB',
  short: 'The most widely used bearing type in motion systems.',
  description:
  'Deep groove ball bearings are the most widely used bearing type, running quietly at speed while handling radial and moderate axial loads. KHS-LG supplies them across manufacturing, industrial and automobile applications.',
  motion: 'High speed',
  applications: ['Electric motors', 'Manufacturing machinery', 'Automobile components'],
  features: [
  'Radial and moderate axial load capability',
  'Quiet running at speed',
  'Available in sealed and open executions'],

  components: ['Outer ring', 'Inner ring', 'Ball complement', 'Cage', 'Seals']
},
{
  slug: 'miniature-ball-bearings',
  name: 'Miniature Ball Bearings',
  code: 'MBB',
  short: 'Small envelope, precision motion.',
  description:
  'Miniature ball bearings deliver precise motion inside compact assemblies where space is limited, supporting instrumentation, small motors and automation components.',
  motion: 'Compact precision',
  applications: ['Automation devices', 'Small motors', 'Instrumentation'],
  features: [
  'Compact envelope for tight assemblies',
  'Smooth low-friction rotation',
  'Supplied to OEM product designs'],

  components: ['Outer ring', 'Inner ring', 'Ball complement', 'Cage']
},
{
  slug: 'cylindrical-ball-bearings',
  name: 'Cylindrical Ball Bearings',
  code: 'CRB',
  short: 'High radial capacity through line contact.',
  description:
  'Cylindrical bearings use line contact between rolling elements and raceways to deliver high radial load capacity, suited to heavy-duty industrial equipment and drive systems.',
  motion: 'Radial load',
  applications: ['Industrial gearboxes', 'Heavy drives', 'Manufacturing equipment'],
  features: [
  'Line contact for high radial capacity',
  'Suited to heavy-duty industrial duty',
  'Engineered for continuous operation'],

  components: ['Outer ring', 'Inner ring', 'Cylindrical rollers', 'Cage']
},
{
  slug: 'linear-motion-bearings',
  name: 'Linear Motion Bearings',
  code: 'LMB',
  short: 'Guided motion along a straight axis.',
  description:
  'Linear motion bearings guide movement along a straight axis with low friction, supporting automation systems, machine tools and precision positioning equipment.',
  motion: 'Linear travel',
  applications: ['Automation systems', 'Machine tools', 'Positioning equipment'],
  features: [
  'Low-friction guided linear travel',
  'Supports precision positioning',
  'Integrated into automation product design'],

  components: ['Outer sleeve', 'Ball tracks', 'Rolling elements', 'Retainer']
}];


export function getProduct(slug: string | undefined): Product | undefined {
  return products.find((p) => p.slug === slug);
}