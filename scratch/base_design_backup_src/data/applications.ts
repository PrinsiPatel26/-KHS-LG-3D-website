export interface Application {
  code: string;
  name: string;
  body: string;
  bearings: string[];
}

export interface ApplicationSector {
  id: string;
  code: string;
  name: string;
  tagline: string;
  overview: string;
  machinery: string[];
  operatingConditions: string[];
  bearings: { name: string; slug: string }[];
  highlight: string;
}

export const applicationSectors: ApplicationSector[] = [
  {
    id: 'construction-mining',
    code: 'APP / 01',
    name: 'Construction & Mining Equipment',
    tagline: 'Endurance under extreme radial shock, heavy vibration, and abrasive dust',
    overview: 'Open-cast mines, quarries, and construction sites subject bearings to brutal shock loads, contamination, and 24/7 continuous duty. KHS-LG provides high-capacity spherical roller bearings, taper roller bearings, and heavy-duty plummer blocks engineered to prevent catastrophic downtime.',
    machinery: [
      'Stone Crushers & Jaw Crushers',
      'Heavy Earthmoving Equipment & Excavators',
      'Mining Conveyors & Transfer Terminals',
      'Mobile Cranes & Gantry Units',
      'Concrete Batching & Asphalt Plants'
    ],
    operatingConditions: [
      'Heavy shock and impact loads',
      'Severe particulate and abrasive dust contamination',
      'Severe shaft deflection and angular misalignment',
      'Continuous 24/7 high-temperature vibration'
    ],
    bearings: [
      { name: 'Spherical Roller Bearings', slug: 'spherical-roller-bearings' },
      { name: 'Taper Roller Bearings', slug: 'taper-roller-bearings' },
      { name: 'Heavy Duty Pillow Block Units', slug: 'pillow-block-bearings' },
      { name: 'Cylindrical Roller Bearings', slug: 'cylindrical-roller-bearings' }
    ],
    highlight: 'Selected for severe shock resistance and self-aligning tolerance up to 2 degrees under full load.'
  },
  {
    id: 'steel-rolling-mills',
    code: 'APP / 02',
    name: 'Steel Plants & Rolling Mills',
    tagline: 'Flawless rotation through radiant heat, cooling water ingress, and crushing roll forces',
    overview: 'Steel manufacturing requires bearings capable of enduring continuous casting temperatures, scale, cooling water, and extreme roll forces. KHS-LG bearings are proven across continuous casters, tube mills, hot rolling stands, and runout tables.',
    machinery: [
      'Continuous Casting Machines (CCM)',
      'Hot & Cold Steel Rolling Mills',
      'Tube Mills & Section Mills',
      'Run-out Tables & Roller Hearth Tables',
      'Ladle Turrets & Billet Handling Units'
    ],
    operatingConditions: [
      'Elevated ambient temperatures up to 300°C',
      'Ingress of mill scale, steam, and high-pressure water',
      'High roll-separating forces',
      'Severe cyclic thermal expansion'
    ],
    bearings: [
      { name: 'Multi-Row Cylindrical Roller Bearings', slug: 'cylindrical-roller-bearings' },
      { name: 'Spherical Roller Bearings', slug: 'spherical-roller-bearings' },
      { name: 'Spherical Roller Thrust Bearings', slug: 'spherical-roller-thrust-bearings' },
      { name: 'Radial Spherical Plain Bearings', slug: 'radial-spherical-plain-bearings' }
    ],
    highlight: 'Engineered with specialized heat stabilization, brass cages, and high-temp grease passages.'
  },
  {
    id: 'cement-plants',
    code: 'APP / 03',
    name: 'Cement Plants & Stone Crushers',
    tagline: 'Rugged solutions designed for massive radial weights and fine abrasive clinker dust',
    overview: 'From rotary kilns to grinding mills and clinker crushers, cement processing plants present continuous heavy loads and pervasive dust. KHS-LG heavy-duty spherical roller bearings and pillow block units deliver maximum uptime in these unforgiving environments.',
    machinery: [
      'Rotary Kilns & Roller Supports',
      'Raw Mills & Ball Mills',
      'Clinker Crushers & Hammer Mills',
      'Vibrating Screens & Feeders',
      'Bucket Elevators & Screw Conveyors'
    ],
    operatingConditions: [
      'Pervasive abrasive dust and clinker grit',
      'Massive radial forces at low to medium rotational speeds',
      'Axial shaft expansion across long kiln spans',
      'Heavy vibration and unbalance forces'
    ],
    bearings: [
      { name: 'Spherical Roller Bearings', slug: 'spherical-roller-bearings' },
      { name: 'Pillow Block Bearings', slug: 'pillow-block-bearings' },
      { name: 'Taper Roller Bearings', slug: 'taper-roller-bearings' },
      { name: 'Cylindrical Roller Thrust Bearings', slug: 'cylindrical-roller-thrust-bearings' }
    ],
    highlight: 'Equipped with heavy-duty labyrinth sealing and reinforced brass cages for vibration resistance.'
  },
  {
    id: 'automotive-assemblies',
    code: 'APP / 04',
    name: 'Automobile & Commercial Vehicles',
    tagline: 'Precision engineered for high speeds, transmissions, steering, and heavy tractor axles',
    overview: 'KHS-LG is an established partner to automotive OEMs and Tier-1 suppliers. Our comprehensive bearing range powers automobile drivetrains, differentials, wheel hubs, steering linkages, and rugged tractor-trolley axles with reliable batch-after-batch consistency.',
    machinery: [
      'Automotive Transmissions & Manual/Auto Gearboxes',
      'Wheel Hubs & Differential Axles',
      'Tractor-Trolley Axles & Commercial Trailer Hubs',
      'Steering Columns & Suspension Linkages',
      'Engine Auxiliary Drives, Alternators & Water Pumps'
    ],
    operatingConditions: [
      'High rotational speeds and tight concentricity',
      'Combined simultaneous radial and axial thrust loads',
      'Wide operating temperature spectrum (-40°C to +150°C)',
      'Strict NVH (Noise, Vibration, Harshness) requirements'
    ],
    bearings: [
      { name: 'Taper Roller Bearings', slug: 'taper-roller-bearings' },
      { name: 'Deep Groove Ball Bearings', slug: 'deep-groove-ball-bearings' },
      { name: 'Needle Roller & Cage Assemblies', slug: 'needle-roller-and-cage-assemblies' },
      { name: 'Rod End Bearings', slug: 'rod-end-bearings' }
    ],
    highlight: 'Precision ground to ensure silent running, low rolling friction, and extended service intervals.'
  },
  {
    id: 'electric-motors',
    code: 'APP / 05',
    name: 'Electric Motors, Fans & Blowers',
    tagline: 'Quiet running, low-friction and energy-efficient rotation for continuous industrial drives',
    overview: 'Electric motors, cooling tower fans, and high-volume industrial blowers require bearings that run smoothly, quietly, and with minimum energy consumption. KHS-LG deep groove ball bearings and cylindrical roller bearings maximize motor efficiency and operational life.',
    machinery: [
      'Three-Phase Industrial Electric Motors',
      'High-Pressure Centrifugal Blowers',
      'Cooling Tower & Induced Draft Fans',
      'Exhaust & Ventilation Air Handling Units',
      'HVAC Compressor Motor Drives'
    ],
    operatingConditions: [
      'Continuous high rotational velocity',
      'Low acoustic noise and vibration (V2/V3 vibration grades)',
      'Low starting and running torque loss',
      'Long-life grease lubrication with zero relubrication needs'
    ],
    bearings: [
      { name: 'Deep Groove Ball Bearings', slug: 'deep-groove-ball-bearings' },
      { name: 'Precision Angular Contact Bearings', slug: 'precision-angular-contact-bearings' },
      { name: 'Cylindrical Roller Bearings', slug: 'cylindrical-roller-bearings' }
    ],
    highlight: 'Optimized internal clearances (C3) and synthetic rubber seals to retain grease and block dirt.'
  },
  {
    id: 'material-handling-cranes',
    code: 'APP / 06',
    name: 'Material Handling Equipment & Cranes',
    tagline: 'Heavy load capacity and accurate track guidance for logistics, hoists and overhead cranes',
    overview: 'Material handling systems demand dependable movement under heavy suspended loads and repetitive lifting cycles. KHS-LG provides high-capacity track rollers, cam followers, and mounted bearing units that power overhead cranes, hoists, and automated conveyor systems.',
    machinery: [
      'Overhead EOT Cranes & Gantry Hoists',
      'Industrial Belt Conveyors & Roller Beds',
      'Forklift Mast Guides & Telescopic Booms',
      'Automated Storage & Retrieval Systems (ASRS)',
      'Port & Container Handling Spreaders'
    ],
    operatingConditions: [
      'Intermittent shock loads during lifting and landing',
      'Outdoor weather, humidity, and coastal exposure',
      'Heavy lateral guidance forces along crane runway rails',
      'Oscillating rotational angles and slow pivot motion'
    ],
    bearings: [
      { name: 'Track Roller Bearings', slug: 'track-roller-bearings' },
      { name: 'Stud & Yoke Cam Followers', slug: 'stud-and-yoke-track-roller-bearings' },
      { name: 'Pillow Block Bearings', slug: 'pillow-block-bearings' },
      { name: 'Radial Spherical Plain Bearings', slug: 'radial-spherical-plain-bearings' }
    ],
    highlight: 'Thick outer rings with crowned profiles absorb heavy shock and prevent track edge gouging.'
  },
  {
    id: 'pumps-valves-compressors',
    code: 'APP / 07',
    name: 'Pumps, Valves & Compressors',
    tagline: 'Stiff shaft support preventing impellor deflection and protecting mechanical seal integrity',
    overview: 'Fluid machinery requires rigid shaft guidance to maintain micro-clearances between impellers and housings and safeguard mechanical seals. KHS-LG bearings deliver outstanding axial and radial stiffness across centrifugal pumps, vacuum pumps, and heavy-duty compressors.',
    machinery: [
      'Centrifugal & Multi-Stage Water Pumps',
      'Rotary Screw & Reciprocating Compressors',
      'Slurry & Chemical Processing Pumps',
      'Industrial Valve Actuators & Positioners',
      'Water Treatment & Desalination Pumps'
    ],
    operatingConditions: [
      'Continuous uninterrupted high-speed rotation',
      'High hydraulic thrust loads along the impeller shaft',
      'Contact with process fluids, moisture, and chemical vapors',
      'Strict low-deflection limits to protect mechanical seals'
    ],
    bearings: [
      { name: 'Precision Angular Contact Bearings', slug: 'precision-angular-contact-bearings' },
      { name: 'Deep Groove Ball Bearings', slug: 'deep-groove-ball-bearings' },
      { name: 'Cylindrical Roller Thrust Bearings', slug: 'cylindrical-roller-thrust-bearings' },
      { name: 'Drawn Cup Needle Roller Clutches', slug: 'drawn-cup-needle-roller-clutches' }
    ],
    highlight: 'Paired duplex arrangements (DB/DF) engineered for maximum rigidity and high axial thrust support.'
  },
  {
    id: 'agriculture-machinery',
    code: 'APP / 08',
    name: 'Agricultural Machinery & Equipment',
    tagline: 'Field-tested protection against mud, fertilizer, water washdown, and seasonal duty',
    overview: 'Agricultural machines work in harsh outdoor conditions with dirt, wet mud, crop debris, and fertilizer. KHS-LG supplies specially sealed mounted units, disc harrow bearings, and taper roller bearings that keep tractors and harvesting equipment operating when seasons peak.',
    machinery: [
      'Agricultural Tractors & Power Tillers',
      'Combine Harvesters & Threshers',
      'Disc Harrows, Cultivators & Seed Drills',
      'Round Balers & Hay Equipment',
      'Irrigation Drivetrains & Pumping Units'
    ],
    operatingConditions: [
      'Extreme soil, mud, and water slurry ingress',
      'Corrosive fertilizer and chemical exposure',
      'Long off-season idle periods followed by intensive harvesting cycles',
      'Heavy shock loads from uneven field terrain'
    ],
    bearings: [
      { name: 'Pillow Block Bearings', slug: 'pillow-block-bearings' },
      { name: 'Taper Roller Bearings', slug: 'taper-roller-bearings' },
      { name: 'Self-Aligning Ball Bearings', slug: 'self-aligning-ball-bearings' },
      { name: 'Hard-Chrome Shafts', slug: 'hard-chrome-shafts' }
    ],
    highlight: 'Multi-lip contact seals and galvanized zinc flinger shields lock out dirt and moisture.'
  },
  {
    id: 'packaging-textile',
    code: 'APP / 09',
    name: 'Packaging, Printing & Textile Machinery',
    tagline: 'High-speed synchronization, low inertia, and micro-precision for high-throughput lines',
    overview: 'High-speed packaging, printing presses, and textile weaving frames require smooth motion, zero backlash, and clean operation. KHS-LG miniature ball bearings, needle assemblies, and one-way clutches deliver crisp indexing and high line throughput.',
    machinery: [
      'Form-Fill-Seal (FFS) Packaging Machines',
      'Carton Folding & Box Gluing Equipment',
      'High-Speed Textile Spinning & Weaving Looms',
      'Flexographic & Offset Printing Presses',
      'Paper Slitter-Rewinders & Converting Lines'
    ],
    operatingConditions: [
      'High-frequency start-stop indexing cycles',
      'Low mechanical inertia for rapid accelerations',
      'Zero oil contamination allowed near fabrics and food cartons',
      'High synchronization accuracy across multiple driven rollers'
    ],
    bearings: [
      { name: 'Miniature Ball Bearings', slug: 'miniature-ball-bearings' },
      { name: 'Needle Roller & Cage Assemblies', slug: 'needle-roller-and-cage-assemblies' },
      { name: 'One Way Clutch', slug: 'one-way-clutch' },
      { name: 'Permaglide Dry Bush', slug: 'permaglide-dry-bush' }
    ],
    highlight: 'Clean-room lubrication options and ultra-light synthetic resin cages for high indexing rates.'
  },
  {
    id: 'automation-machine-tools',
    code: 'APP / 10',
    name: 'Industrial Automation & Machine Tools',
    tagline: 'Sub-micron repeatability, rigid linear travel, and multi-axis robotic guidance',
    overview: 'Modern factory automation and CNC machine tools depend on smooth, high-precision motion along straight axes. KHS-LG linear motion bearings, dual shaft guides, and supported linear shafts provide rigid, backlash-free travel for automated Cartesian gantries, robotics, and machine tools.',
    machinery: [
      'CNC Machining Centers & Turning Lathes',
      'Multi-Axis Pick-and-Place Robotic Arms',
      'Automated Cartesian Gantries & Linear Actuators',
      'Semiconductor & Optical Inspection Stages',
      'Automated Dispensing & Soldering Cells'
    ],
    operatingConditions: [
      'High positioning repeatability and sub-micron accuracy',
      'Backlash-free guidance under varying payload moments',
      'Continuous high-velocity linear travel up to 5 m/s',
      'Smooth travel with minimal friction variation'
    ],
    bearings: [
      { name: 'Linear Motion Bearings', slug: 'linear-motion-bearings' },
      { name: 'Dual Shaft Guides', slug: 'dual-shaft-guides' },
      { name: 'Hard-Chrome Shafts with Support', slug: 'shafts-with-support' },
      { name: 'Precision Angular Contact Bearings', slug: 'precision-angular-contact-bearings' }
    ],
    highlight: 'Precision induction-hardened guideways and recirculating balls deliver ultra-low friction.'
  }
];

// Backwards-compatible summary list
export const applications: Application[] = applicationSectors.map((s) => ({
  code: s.code,
  name: s.name,
  body: s.overview,
  bearings: s.bearings.map((b) => b.name)
}));

export const performanceAxes = [
  { code: 'P01', name: 'Load Capacity', body: 'Geometry selected for the heavy static, dynamic and shock forces your machine actually sees.' },
  { code: 'P02', name: 'Speed Capability', body: 'Rolling element kinematics and cage materials matched to the operating RPM envelope.' },
  { code: 'P03', name: 'Dimensional Precision', body: 'Inspected before dispatch per ISO standards, batch after batch.' },
  { code: 'P04', name: 'Environmental Sealing', body: 'Seals and shields engineered to withstand dust, water, heat and abrasive grit.' },
  { code: 'P05', name: 'Energy Efficiency', body: 'Low-friction raceway finishing minimizes drive torque and operational heat.' }
];