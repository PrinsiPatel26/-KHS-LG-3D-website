export type DealerCity = {
  id: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  active: boolean;
};

export type ExportCountry = {
  id: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  active: boolean;
};

export const dealerCities: DealerCity[] = [
  { id: 'ahmedabad', city: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, active: true },
  { id: 'ahmednagar', city: 'Ahmednagar', state: 'Maharashtra', country: 'India', latitude: 19.094, longitude: 74.738, active: true },
  { id: 'amritsar', city: 'Amritsar', state: 'Punjab', country: 'India', latitude: 31.634, longitude: 74.8723, active: true },
  { id: 'aurangabad', city: 'Aurangabad', state: 'Maharashtra', country: 'India', latitude: 19.8762, longitude: 75.3433, active: true },
  { id: 'baddi', city: 'Baddi', state: 'Himachal Pradesh', country: 'India', latitude: 30.9588, longitude: 76.7988, active: true },
  { id: 'bangalore', city: 'Bangalore', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, active: true },
  { id: 'baroda', city: 'Baroda', state: 'Gujarat', country: 'India', latitude: 22.3072, longitude: 73.1812, active: true },
  { id: 'bhavnagar', city: 'Bhavnagar', state: 'Gujarat', country: 'India', latitude: 21.7645, longitude: 72.1519, active: true },
  { id: 'bhubaneshwar', city: 'Bhubaneshwar', state: 'Odisha', country: 'India', latitude: 20.2961, longitude: 85.8245, active: true },
  { id: 'chandigarh', city: 'Chandigarh', state: 'Chandigarh', country: 'India', latitude: 30.7333, longitude: 76.7794, active: true },
  { id: 'chennai', city: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, active: true },
  { id: 'coimbatore', city: 'Coimbatore', state: 'Tamil Nadu', country: 'India', latitude: 11.0168, longitude: 76.9558, active: true },
  { id: 'delhi', city: 'Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.209, active: true },
  { id: 'faridabad', city: 'Faridabad', state: 'Haryana', country: 'India', latitude: 28.4089, longitude: 77.3178, active: true },
  { id: 'gwalior', city: 'Gwalior', state: 'Madhya Pradesh', country: 'India', latitude: 26.2183, longitude: 78.1828, active: true },
  { id: 'hissar', city: 'Hissar', state: 'Haryana', country: 'India', latitude: 29.1492, longitude: 75.7217, active: true },
  { id: 'indore', city: 'Indore', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, active: true },
  { id: 'jabalpur', city: 'Jabalpur', state: 'Madhya Pradesh', country: 'India', latitude: 23.1815, longitude: 79.9864, active: true },
  { id: 'jaipur', city: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, active: true },
  { id: 'jalandhar', city: 'Jalandhar', state: 'Punjab', country: 'India', latitude: 31.326, longitude: 75.5762, active: true },
  { id: 'jamnagar', city: 'Jamnagar', state: 'Gujarat', country: 'India', latitude: 22.4667, longitude: 70.0667, active: true },
  { id: 'jamshedpur', city: 'Jamshedpur', state: 'Jharkhand', country: 'India', latitude: 22.8046, longitude: 86.2029, active: true },
  { id: 'jodhpur', city: 'Jodhpur', state: 'Rajasthan', country: 'India', latitude: 26.2389, longitude: 73.0243, active: true },
  { id: 'kanpur', city: 'Kanpur', state: 'Uttar Pradesh', country: 'India', latitude: 26.4499, longitude: 80.3319, active: true },
  { id: 'kochi', city: 'Kochi', state: 'Kerala', country: 'India', latitude: 9.9312, longitude: 76.2673, active: true },
  { id: 'kolkata', city: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, active: true },
  { id: 'lucknow', city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, active: true },
  { id: 'ludhiana', city: 'Ludhiana', state: 'Punjab', country: 'India', latitude: 30.901, longitude: 75.8573, active: true },
  { id: 'mangalore', city: 'Mangalore', state: 'Karnataka', country: 'India', latitude: 12.9141, longitude: 74.856, active: true },
  { id: 'mumbai', city: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.076, longitude: 72.8777, active: true },
  { id: 'nagpur', city: 'Nagpur', state: 'Maharashtra', country: 'India', latitude: 21.1458, longitude: 79.0882, active: true },
  { id: 'nasik', city: 'Nasik', state: 'Maharashtra', country: 'India', latitude: 20.011, longitude: 73.7908, active: true },
  { id: 'panipat', city: 'Panipat', state: 'Haryana', country: 'India', latitude: 29.3909, longitude: 76.9635, active: true },
  { id: 'patna', city: 'Patna', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, active: true },
  { id: 'pune', city: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, active: true },
  { id: 'raipur', city: 'Raipur', state: 'Chhattisgarh', country: 'India', latitude: 21.2514, longitude: 81.6296, active: true },
  { id: 'ranchi', city: 'Ranchi', state: 'Jharkhand', country: 'India', latitude: 23.3441, longitude: 85.3096, active: true },
  { id: 'rajkot', city: 'Rajkot', state: 'Gujarat', country: 'India', latitude: 22.3039, longitude: 70.8022, active: true },
  { id: 'secunderabad', city: 'Secunderabad', state: 'Telangana', country: 'India', latitude: 17.4399, longitude: 78.4983, active: true },
  { id: 'surat', city: 'Surat', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, active: true },
  { id: 'vapi', city: 'Vapi', state: 'Gujarat', country: 'India', latitude: 20.372, longitude: 72.9049, active: true },
  { id: 'visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', latitude: 17.6868, longitude: 83.2185, active: true }
];

export const exportCountries: ExportCountry[] = [
  { id: 'bahrain', country: 'Bahrain', region: 'Middle East', latitude: 26.0667, longitude: 50.5577, active: true },
  { id: 'bangladesh', country: 'Bangladesh', region: 'South Asia', latitude: 23.685, longitude: 90.3563, active: true },
  { id: 'belarus', country: 'Belarus', region: 'Europe', latitude: 53.9006, longitude: 27.559, active: true },
  { id: 'brazil', country: 'Brazil', region: 'South America', latitude: -14.235, longitude: -51.9253, active: true },
  { id: 'bulgaria', country: 'Bulgaria', region: 'Europe', latitude: 42.6977, longitude: 23.3219, active: true },
  { id: 'uae', country: 'UAE', region: 'Middle East', latitude: 25.2048, longitude: 55.2708, active: true },
  { id: 'egypt', country: 'Egypt', region: 'Africa', latitude: 30.0444, longitude: 31.2357, active: true },
  { id: 'greece', country: 'Greece', region: 'Europe', latitude: 37.9838, longitude: 23.7275, active: true },
  { id: 'hungary', country: 'Hungary', region: 'Europe', latitude: 47.4979, longitude: 19.0402, active: true },
  { id: 'kenya', country: 'Kenya', region: 'Africa', latitude: -0.0236, longitude: 37.9062, active: true },
  { id: 'lebanon', country: 'Lebanon', region: 'Middle East', latitude: 33.8938, longitude: 35.5018, active: true },
  { id: 'lithuania', country: 'Lithuania', region: 'Europe', latitude: 54.6872, longitude: 25.2797, active: true },
  { id: 'nepal', country: 'Nepal', region: 'South Asia', latitude: 27.7172, longitude: 85.324, active: true },
  { id: 'nigeria', country: 'Nigeria', region: 'Africa', latitude: 9.0765, longitude: 7.3986, active: true },
  { id: 'oman', country: 'Oman', region: 'Middle East', latitude: 23.5859, longitude: 58.4059, active: true },
  { id: 'poland', country: 'Poland', region: 'Europe', latitude: 52.2297, longitude: 21.0122, active: true },
  { id: 'qatar', country: 'Qatar', region: 'Middle East', latitude: 25.2854, longitude: 51.531, active: true },
  { id: 'russia', country: 'Russia', region: 'Europe', latitude: 55.7558, longitude: 37.6173, active: true },
  { id: 'saudi-arabia', country: 'Saudi Arabia', region: 'Middle East', latitude: 24.7136, longitude: 46.6753, active: true },
  { id: 'serbia', country: 'Serbia', region: 'Europe', latitude: 44.7866, longitude: 20.4489, active: true },
  { id: 'south-africa', country: 'South Africa', region: 'Africa', latitude: -30.5595, longitude: 22.9375, active: true },
  { id: 'sri-lanka', country: 'Sri Lanka', region: 'South Asia', latitude: 6.9271, longitude: 79.8612, active: true },
  { id: 'tanzania', country: 'Tanzania', region: 'Africa', latitude: -6.369, longitude: 34.8888, active: true },
  { id: 'turkey', country: 'Turkey', region: 'Europe', latitude: 39.9334, longitude: 32.8597, active: true },
  { id: 'ukraine', country: 'Ukraine', region: 'Europe', latitude: 50.4501, longitude: 30.5234, active: true },
  { id: 'usa', country: 'USA', region: 'North America', latitude: 38.9072, longitude: -77.0369, active: true },
  { id: 'zimbabwe', country: 'Zimbabwe', region: 'Africa', latitude: -19.0154, longitude: 29.1549, active: true }
];
