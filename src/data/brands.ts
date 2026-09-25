export type BrandCategory = {
  name: string;
  description: string;
  image: string;
};

export type BrandFeature = {
  title: string;
  description: string;
};

export type BrandDefinition = {
  slug: string;
  name: string;
  company: string;
  country: string;
  tag: string;
  accent: string;
  accentSoft: string;
  category: string;
  summary: string;
  heroHeading: string[];
  heroDescription: string;
  aboutHeading: string;
  about: string[];
  categoriesHeading: string;
  categories: BrandCategory[];
  whyHeading: string;
  features: BrandFeature[];
  applicationsHeading: string;
  applications: string[];
  applicationImage: string;
  ctaHeading: string;
  ctaDescription: string;
  productLabel: string;
  productImage: string;
};

export const brands: BrandDefinition[] = [
  {
    slug: 'iko',
    name: 'IKO',
    company: 'Nippon Thompson',
    country: 'Japan',
    tag: 'NIPPON THOMPSON · JAPAN',
    accent: '#d84d4d',
    accentSoft: 'rgba(216, 77, 77, 0.16)',
    category: 'Precision bearings / linear motion',
    summary: 'High-precision needle roller bearings and linear motion solutions.',
    heroHeading: ['Precision', 'in motion.'],
    heroDescription: 'High-precision bearing and linear motion solutions engineered for demanding industrial applications.',
    aboutHeading: 'Precision where motion matters.',
    about: [
      'IKO (Nippon Thompson Japan) is a Japanese manufacturer specializing in precision bearings, needle roller bearings and linear motion products. Its product portfolio supports applications where accuracy, compact construction, smooth movement and dependable service are important.',
      'IKO products are used across industrial machinery, automation, robotics, machine tools, semiconductor equipment and other precision applications.'
    ],
    categoriesHeading: 'IKO product categories',
    categories: [
      { name: 'Needle roller bearings', description: 'Compact rolling solutions for applications with limited radial space.', image: '/machined-needle-roller-bearing.webp' },
      { name: 'Cam & roller followers', description: 'Track-running components for controlled linear or oscillating motion.', image: '/track-roller-bearing-stud-yoke.webp' },
      { name: 'Spherical plain bearings', description: 'Articulating bearing solutions for alignment and oscillating movement.', image: '/radial-spherical-plain-bearing.webp' },
      { name: 'Linear motion bearings', description: 'Guided movement components for precise machine travel.', image: '/linear motion bearing.webp' },
      { name: 'Rod end bearings', description: 'Compact joint components for linkages and adjustable mechanisms.', image: '/rod-end.png' },
      { name: 'Cylindrical roller bearings', description: 'Radial load support for demanding industrial assemblies.', image: '/cylindrical roller bearing.webp' }
    ],
    whyHeading: 'Why IKO?',
    features: [
      { title: 'High-precision engineering', description: 'Precision-focused components for demanding motion applications.' },
      { title: 'Compact design', description: 'Bearing and motion solutions designed for space-conscious machinery.' },
      { title: 'High load capability', description: 'Solutions designed for demanding industrial loads depending on product series.' },
      { title: 'Smooth motion', description: 'Products for controlled rotary and linear movement.' },
      { title: 'Long service life', description: 'Engineered for dependable operation when correctly selected and maintained.' },
      { title: 'Industrial application range', description: 'Suitable product families for automation, machinery and precision equipment.' }
    ],
    applicationsHeading: 'IKO applications',
    applications: ['Automation', 'Robotics', 'Machine tools', 'Packaging machinery', 'Semiconductor equipment', 'Medical equipment', 'Printing machinery', 'Precision machinery'],
    applicationImage: '/linear motion shaft with support.webp',
    ctaHeading: 'Looking for an IKO product or series?',
    ctaDescription: 'Send us the IKO part number or your application requirement and our team can help you identify the appropriate product or series.',
    productLabel: 'Needle roller / linear motion',
    productImage: '/needle-roller-and-cage-assembly.webp'
  },
  {
    slug: 'won',
    name: 'WON ST',
    company: 'WON Linear Motion',
    country: 'South Korea',
    tag: 'WON LINEAR MOTION · KOREA',
    accent: '#4c9fd7',
    accentSoft: 'rgba(76, 159, 215, 0.16)',
    category: 'Linear motion systems',
    summary: 'Precision linear motion systems and components for industrial automation.',
    heroHeading: ['Precision', 'linear motion.'],
    heroDescription: 'Precision linear motion components for smooth, accurate and reliable industrial movement.',
    aboutHeading: 'Motion with a measured response.',
    about: [
      'WON ST is a Korean manufacturer specializing in linear motion components and precision motion systems. Its product portfolio includes linear guides, LM units, shafts, bushings, ball splines and other motion components used in automation and precision machinery.',
      'WON ST solutions are relevant to applications where smooth movement, positioning accuracy, rigidity and dependable operation are important.'
    ],
    categoriesHeading: 'WON product categories',
    categories: [
      { name: 'Super ball bush', description: 'Recirculating ball bushing assemblies for guided linear travel.', image: '/linear motion bearing.webp' },
      { name: 'Linear motion shafts', description: 'Precision shafts designed to work with linear bearing systems.', image: '/linear motion shaft with support.webp' },
      { name: 'Slide units', description: 'Ready-to-integrate units for compact guided movement.', image: '/dual-shaft-guide.webp' },
      { name: 'Cross roller guideways', description: 'Rigid guidance for accurate positioning and controlled travel.', image: '/dual-shaft-guide.webp' },
      { name: 'Linear ball bushings', description: 'Low-friction linear supports for automation equipment.', image: '/linear motion bearing.webp' },
      { name: 'TR guide ways', description: 'Guided motion components for precision machinery assemblies.', image: '/linear motion shaft with support.webp' },
      { name: 'Compact ball splines', description: 'Linear and rotary motion capability in a compact profile.', image: '/linear motion shaft with support.webp' },
      { name: 'Housing type ball bushings', description: 'Housed linear bearings for simplified machine integration.', image: '/dual-shaft-guide.webp' }
    ],
    whyHeading: 'Why WON?',
    features: [
      { title: 'High-precision linear motion', description: 'Components developed for controlled and repeatable machine travel.' },
      { title: 'Smooth movement', description: 'Guidance solutions for consistent linear operation.' },
      { title: 'High rigidity', description: 'Product families suited to applications where stiffness is important.' },
      { title: 'Low friction', description: 'Rolling-element guidance designed to support efficient movement.' },
      { title: 'Long service life', description: 'Dependable operation when the component is correctly selected and maintained.' },
      { title: 'Automation-ready solutions', description: 'Linear motion formats suited to automation and precision machinery.' }
    ],
    applicationsHeading: 'WON applications',
    applications: ['Automation', 'Robotics', 'Machine tools', 'Packaging machinery', 'Semiconductor equipment', 'Electronics manufacturing', 'Medical equipment', 'Precision machinery'],
    applicationImage: '/dual-shaft-guide.webp',
    ctaHeading: 'Looking for a WON product or series?',
    ctaDescription: 'Send us the WON part number, shaft size or application requirement and our team can help identify the appropriate product or series.',
    productLabel: 'Linear motion guide',
    productImage: '/linear motion bearing.webp'
  },
  {
    slug: 'stieber',
    name: 'STIEBER',
    company: 'Stieber Clutch',
    country: 'Germany',
    tag: 'STIEBER · GERMANY',
    accent: '#4fae8b',
    accentSoft: 'rgba(79, 174, 139, 0.16)',
    category: 'Freewheels / overrunning clutches',
    summary: 'Freewheels, overrunning clutches and backstops for demanding drive systems.',
    heroHeading: ['German engineering.', 'Controlled motion.'],
    heroDescription: 'Freewheels, overrunning clutches and backstop solutions for demanding industrial drive systems.',
    aboutHeading: 'Controlled torque. Reliable motion.',
    about: [
      'STIEBER specializes in freewheels, overrunning clutches and backstop solutions for industrial drive systems. Its products are used where controlled motion, reverse-rotation prevention and dependable torque transmission are important.',
      'The brand brings German engineering heritage to drive applications where the right clutch or freewheel selection matters to the overall machine.'
    ],
    categoriesHeading: 'STIEBER product series',
    categories: [
      { name: 'ASNU series', description: 'Overrunning clutch solutions for controlled one-way torque transmission.', image: '/one-way-clutch-bearing.webp' },
      { name: 'AS series', description: 'Freewheel components for industrial drive and indexing applications.', image: '/drawn-cup-needle-roller-clutch.webp' },
      { name: 'CSK series', description: 'Compact clutch formats for integrated machine arrangements.', image: '/one-way-clutch-bearing.webp' },
      { name: 'CSK P series', description: 'Protected freewheel configurations for selected drive applications.', image: '/drawn-cup-needle-roller-clutch.webp' },
      { name: 'CSK PP series', description: 'Sealed options for applications requiring additional protection.', image: '/one-way-clutch-bearing.webp' },
      { name: 'DC series', description: 'Industrial clutch solutions for demanding torque transmission requirements.', image: '/permaglide-dry-bush.webp' }
    ],
    whyHeading: 'Why STIEBER?',
    features: [
      { title: 'German engineering', description: 'Engineering heritage focused on dependable industrial drive components.' },
      { title: 'Reliable torque transmission', description: 'Freewheel and clutch solutions for controlled drive behavior.' },
      { title: 'High load and torque capability', description: 'Performance depends on the selected series and application conditions.' },
      { title: 'Long service life', description: 'Designed for dependable operation when correctly specified and maintained.' },
      { title: 'Robust industrial construction', description: 'Product families built around demanding drive-system requirements.' },
      { title: 'Demanding drive systems', description: 'Suitable solutions for selected conveyors, gearboxes and industrial drives.' }
    ],
    applicationsHeading: 'STIEBER applications',
    applications: ['Conveyors', 'Gearboxes', 'Industrial drives', 'Material handling', 'Mining equipment', 'Packaging machinery', 'Machine tools', 'Fans & blowers', 'Heavy machinery', 'Automation systems'],
    applicationImage: '/drawn-cup-needle-roller-clutch.webp',
    ctaHeading: 'Looking for a STIEBER product or series?',
    ctaDescription: 'Send us the Stieber part number, torque requirement or application details and our team can help identify the appropriate product or series.',
    productLabel: 'Freewheel / clutch',
    productImage: '/one-way-clutch-bearing.webp'
  }
];

export const getBrand = (slug?: string) => brands.find((brand) => brand.slug === slug);
