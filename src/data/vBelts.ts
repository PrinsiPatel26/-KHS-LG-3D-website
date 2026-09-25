export interface VBeltsProduct {
  id: string;
  sequence: number;
  name: string;
  category: 'V-Belts & Timing Belts';
  description: string;
  series: string[];
  pdfAvailable: boolean;
  pdfUrl: string | null;
  pdfFileName: string | null;
}

export interface VBeltsDocumentSet {
  brochure: {
    available: boolean;
    url: string | null;
    fileName: string | null;
  };
  catalogue: {
    available: boolean;
    url: string | null;
    fileName: string | null;
  };
  products: VBeltsProduct[];
}

export const vBeltCatalogue: VBeltsDocumentSet = {
  brochure: {
    available: false,
    url: null,
    fileName: null
  },
  catalogue: {
    available: false,
    url: null,
    fileName: null
  },
  products: [
    {
      id: 'classical-wrapped-v-belt',
      sequence: 1,
      name: 'Classical Wrapped V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Standard wrapped V-belt for robust power transmission in general industrial applications.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'wedge-cogged-v-belt',
      sequence: 2,
      name: 'Wedge Cogged V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Cogged construction improves flexibility and heat dissipation in high-load transmission systems.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'poly-ribbed-v-belt',
      sequence: 3,
      name: 'Poly Ribbed V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Multi-rib configuration that balances power transmission efficiency and compact drive layouts.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'laminated-v-belt',
      sequence: 4,
      name: 'Laminated V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Layered belt construction for dependable power transfer across a broad duty range.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'industrial-variable-speed-v-belt',
      sequence: 5,
      name: 'Industrial Variable Speed V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Variable-speed transmission solution designed for adjustable drive ratios and efficient motion control.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'industrial-rubber-timing-belt',
      sequence: 6,
      name: 'Industrial Rubber Timing Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Accurate synchronous power transmission for applications requiring controlled timing and load sharing.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'industrial-pu-timing-belt',
      sequence: 7,
      name: 'Industrial PU Timing Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Polyurethane timing belt solution selected for precision indexing and high wear resistance.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'hexagonal-v-belt',
      sequence: 8,
      name: 'Hexagonal V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Hexagonal profile belt designed for applications that require a compact, flexible drive arrangement.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'wedge-narrow-v-belt',
      sequence: 9,
      name: 'Wedge Narrow V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Compact wedge profile for space-conscious systems needing efficient power transfer.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'classical-raw-edge-cogged-v-belt',
      sequence: 10,
      name: 'Classical Raw Edge Cogged V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Raw-edge, cogged belt for higher flexibility and reduced heat buildup in demanding drives.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    },
    {
      id: 'banded-v-belt',
      sequence: 11,
      name: 'Banded V-Belt',
      category: 'V-Belts & Timing Belts',
      description: 'Multi-belt banded drive solution designed for balanced load sharing and stable operation.',
      series: [],
      pdfAvailable: false,
      pdfUrl: null,
      pdfFileName: null
    }
  ]
};

export const vBeltTotalCount = vBeltCatalogue.products.length;

export function getVBeltsProductById(id: string | undefined) {
  return vBeltCatalogue.products.find((product) => product.id === id);
}
