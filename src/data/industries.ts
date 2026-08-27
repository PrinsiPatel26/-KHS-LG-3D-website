export interface Industry {
  slug: string;
  name: string;
  code: string;
  headline: string;
  body: string;
  points: string[];
}

/** Industries as identified on khslg.com. */
export const industries: Industry[] = [
{
  slug: 'manufacturing',
  name: 'Manufacturing',
  code: 'IND / 01',
  headline: 'Production lines that cannot stop',
  body: 'Bearings supplied into manufacturing plants where continuous rotation, predictable service life and fast availability decide output.',
  points: ['Plant machinery', 'Production equipment', 'Drive assemblies']
},
{
  slug: 'industrial',
  name: 'Industrial',
  code: 'IND / 02',
  headline: 'Heavy duty, continuous motion',
  body: 'A broad industrial range covering gearboxes, material handling and heavy equipment, backed by a distributor network across 35+ export countries.',
  points: ['Gearboxes and drives', 'Material handling', 'Heavy equipment']
},
{
  slug: 'automobile',
  name: 'Automobile',
  code: 'IND / 03',
  headline: 'Motion engineered for the road',
  body: 'Bearings for automobile assemblies, supplied to OEMs who need consistent quality batch after batch.',
  points: ['OEM assemblies', 'Wheel and hub applications', 'Transmission components']
}];