export interface BearingRecord {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  series: string;
  innerDiameter: number;
  outerDiameter: number;
  width: number;
  dynamicLoadRating?: number;
  staticLoadRating?: number;
  slug: string;
}

export interface DimensionRange {
  min: string;
  max: string;
}

export interface BearingFilters {
  query: string;
  innerDiameter: DimensionRange;
  outerDiameter: DimensionRange;
  width: DimensionRange;
}

export const bearingRecords: BearingRecord[] = [
  { id: 'NJ204ECP3', partNumber: 'NJ204ECP3', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 20, outerDiameter: 47, width: 14, dynamicLoadRating: 32, staticLoadRating: 23, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ204ET2X', partNumber: 'NJ204ET2X', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 20, outerDiameter: 47, width: 14, dynamicLoadRating: 31, staticLoadRating: 25, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ304E', partNumber: 'NJ304E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 20, outerDiameter: 52, width: 15, dynamicLoadRating: 34, staticLoadRating: 27, slug: 'cylindrical-roller-bearings' },
  { id: '22x58x17', partNumber: '22x58x17', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: '22x58x17 Series', innerDiameter: 22, outerDiameter: 58, width: 17, dynamicLoadRating: 36, staticLoadRating: 38, slug: 'cylindrical-roller-bearings' },
  { id: 'NU205E', partNumber: 'NU205E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NU Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 33, staticLoadRating: 28, slug: 'cylindrical-roller-bearings' },
  { id: 'MLNU205EXAT2X', partNumber: 'MLNU205EXAT2X', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'MLNU Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 38, staticLoadRating: 28, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ205', partNumber: 'NJ205', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 33, staticLoadRating: 28, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ205E', partNumber: 'NJ205E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 36, staticLoadRating: 27, slug: 'cylindrical-roller-bearings' },
  { id: 'N205E', partNumber: 'N205E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'N Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 33, staticLoadRating: 28, slug: 'cylindrical-roller-bearings' },
  { id: 'NUP205E', partNumber: 'NUP205E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NUP Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 33, staticLoadRating: 28, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ2205E', partNumber: 'NJ2205E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 52, width: 18, dynamicLoadRating: 32, staticLoadRating: 30, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ2205ET2X', partNumber: 'NJ2205ET2X', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 39, staticLoadRating: 35, slug: 'cylindrical-roller-bearings' },
  { id: 'NJ305E', partNumber: 'NJ305E', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 46, staticLoadRating: 38, slug: 'cylindrical-roller-bearings' },
  { id: 'NU305', partNumber: 'NU305', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NU Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 33, staticLoadRating: 25, slug: 'cylindrical-roller-bearings' },
  { id: 'NJK305', partNumber: 'NJK305', name: 'Cylindrical Roller Bearing', category: 'Roller Bearings', series: 'NJK Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 56, staticLoadRating: 48, slug: 'cylindrical-roller-bearings' }
];

function normalise(value: string) {
  return value.trim().toLowerCase();
}

function numericValue(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function matchesRange(value: number, range: DimensionRange) {
  const min = numericValue(range.min);
  const max = numericValue(range.max);
  return (min === undefined || value >= min) && (max === undefined || value <= max);
}

function textRank(record: BearingRecord, query: string) {
  const term = normalise(query);
  if (!term) return 0;
  const partNumber = normalise(record.partNumber);
  const series = normalise(record.series);
  const name = normalise(record.name);
  const category = normalise(record.category);
  if (partNumber === term) return 0;
  if (partNumber.startsWith(term)) return 1;
  if (series.includes(term)) return 2;
  if (name.includes(term) || category.includes(term)) return 3;
  return 4;
}

export function searchProducts(query: string, records = bearingRecords) {
  const term = normalise(query);
  if (!term) return records;
  return records
    .filter((record) => [record.partNumber, record.name, record.category, record.series].some((value) => normalise(value).includes(term)))
    .sort((a, b) => textRank(a, term) - textRank(b, term));
}

export function filterByDimensions(records: BearingRecord[], dimensions: Pick<BearingFilters, 'innerDiameter' | 'outerDiameter' | 'width'>) {
  return records.filter((record) =>
    matchesRange(record.innerDiameter, dimensions.innerDiameter) &&
    matchesRange(record.outerDiameter, dimensions.outerDiameter) &&
    matchesRange(record.width, dimensions.width)
  );
}

export function filterProducts(filters: BearingFilters, records = bearingRecords) {
  return filterByDimensions(searchProducts(filters.query, records), filters);
}

export function getProductSuggestions(query: string, records = bearingRecords) {
  return searchProducts(query, records).slice(0, 6);
}