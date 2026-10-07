import indiaMap from '@svg-maps/india';
import { useEffect, useMemo, useState } from 'react';
import { TechnicalLabel } from '../ui/SectionHeading';
import { dealerCities } from '../../data/network';
import { NetworkInfoPanel } from './NetworkInfoPanel';

const INDIA_MAP_WIDTH = 612;
const INDIA_MAP_HEIGHT = 696;
const INDIA_VIEWBOX_PADDING = 72;
const INDIA_BOUNDS = {
  north: 37.1,
  south: 6.7,
  west: 68.1,
  east: 97.4
};
const ZONAL_OFFICE_CITY_IDS = new Set(['ahmedabad', 'bangalore', 'delhi', 'pune']);
const zonalOfficeCities = dealerCities.filter((city) => ZONAL_OFFICE_CITY_IDS.has(city.id));

function projectIndiaPosition(latitude: number, longitude: number) {
  return {
    x: ((longitude - INDIA_BOUNDS.west) / (INDIA_BOUNDS.east - INDIA_BOUNDS.west)) * INDIA_MAP_WIDTH,
    y: ((INDIA_BOUNDS.north - latitude) / (INDIA_BOUNDS.north - INDIA_BOUNDS.south)) * INDIA_MAP_HEIGHT
  };
}

const cityDescriptions: Record<string, string> = {
  ahmedabad: 'Ahmedabad serves as an important industrial and commercial centre in Gujarat, making it a relevant location within KHS-LG\'s domestic distribution network.',
  ahmednagar: 'Ahmednagar is a significant industrial node in Maharashtra, supporting regional demand across manufacturing and engineering applications.',
  amritsar: 'Amritsar strengthens KHS-LG\'s presence across northern India, connecting industrial and commercial demand within the region.',
  aurangabad: 'Aurangabad remains a key manufacturing and industrial centre in Maharashtra, supporting demand across industrial and engineering applications.',
  baddi: 'Baddi is a growing industrial hub in Himachal Pradesh, adding relevance to KHS-LG\'s network across key business and manufacturing corridors.',
  bangalore: 'Bangalore is a major technology and industrial centre, helping connect demand for precision motion solutions across high-growth sectors.',
  baroda: 'Baroda continues to be an important industrial and engineering location in Gujarat, supporting access to industrial customers across the region.',
  bhavnagar: 'Bhavnagar contributes to the industrial ecosystem in Gujarat, supporting the reach of KHS-LG\'s domestic distribution network.',
  bhubaneshwar: 'Bhubaneshwar serves as an important eastern industrial centre, extending access across Odisha and surrounding demand clusters.',
  chandigarh: 'Chandigarh is a strategic northern hub, connecting KHS-LG\'s distribution network with industrial customers in the region.',
  chennai: 'Chennai is a major industrial and manufacturing centre in South India, making it an important location within the domestic network.',
  coimbatore: 'Coimbatore is a well-established engineering and manufacturing base, supporting demand for industrial bearing solutions across the region.',
  delhi: 'Delhi is a major commercial and industrial market, providing a strong connection point within KHS-LG\'s distribution network.',
  faridabad: 'Faridabad reflects the industrial strength of the National Capital Region, supporting access to manufacturing and engineering demand.',
  gwalior: 'Gwalior supports industrial demand across central India, extending KHS-LG\'s network into a key manufacturing belt.',
  hissar: 'Hissar is an established industrial centre in Haryana, contributing to KHS-LG\'s network across northern manufacturing hubs.',
  indore: 'Indore is an important commercial and industrial centre in central India, helping strengthen access to regional demand.',
  jabalpur: 'Jabalpur supports industrial activity in central India and adds depth to KHS-LG\'s domestic market reach.',
  jaipur: 'Jaipur is an important industrial and commercial centre in Rajasthan, contributing to the growth of KHS-LG\'s network across western India.',
  jalandhar: 'Jalandhar supports industrial demand in Punjab and adds a relevant node in KHS-LG\'s northern distribution footprint.',
  jamnagar: 'Jamnagar is a strategic industrial city in Gujarat, relevant to KHS-LG\'s domestic coverage across engineering and process applications.',
  jamshedpur: 'Jamshedpur is an established industrial hub in eastern India, supporting KHS-LG\'s connectivity with manufacturing demand.',
  jodhpur: 'Jodhpur is an important western market in Rajasthan, strengthening KHS-LG\'s access across key regional industrial corridors.',
  kanpur: 'Kanpur remains a vital industrial centre in Uttar Pradesh, helping connect KHS-LG\'s bearing solutions with demand across the north.',
  kochi: 'Kochi strengthens KHS-LG\'s reach in the southern coastal market, connecting industrial demand in Kerala and nearby regions.',
  kolkata: 'Kolkata is a major eastern commercial and industrial centre, supporting KHS-LG\'s access to demand in eastern India.',
  lucknow: 'Lucknow represents an important commercial and industrial centre in Uttar Pradesh, extending reach across northern India.',
  ludhiana: 'Ludhiana is a major engineering and industrial hub in Punjab, reinforcing KHS-LG\'s network across high-demand manufacturing regions.',
  mangalore: 'Mangalore adds access along the western coastal corridor, supporting KHS-LG\'s domestic connectivity across industrial sectors.',
  mumbai: 'Mumbai is a major commercial and industrial hub, providing an important connection point within KHS-LG\'s distribution network.',
  nagpur: 'Nagpur is a significant central Indian industrial centre, helping broaden KHS-LG\'s access to regional engineering demand.',
  nasik: 'Nasik contributes to the industrial ecosystem of Maharashtra, supporting strategic distribution across western India.',
  panipat: 'Panipat is a key industrial node in Haryana, contributing to demand across manufacturing and engineering applications.',
  patna: 'Patna supports KHS-LG\'s reach into eastern India, connecting industrial demand across the region.',
  pune: 'Pune is a major manufacturing and engineering centre, making it a strategic part of KHS-LG\'s domestic distribution reach.',
  raipur: 'Raipur helps connect KHS-LG\'s domestic network to demand across central India and industrial corridors in Chhattisgarh.',
  ranchi: 'Ranchi provides access to industrial and commercial demand in eastern India, extending the network across key regional centres.',
  rajkot: 'Rajkot is an established engineering and industrial centre in Gujarat, supporting demand across manufacturing and industrial applications.',
  secunderabad: 'Secunderabad supports KHS-LG\'s network across Telangana and the wider southern industrial corridor.',
  surat: 'Surat is a major industrial centre in Gujarat, strengthening KHS-LG\'s connection with manufacturing demand across western India.',
  vapi: 'Vapi is a relevant industrial location in Gujarat, adding further reach within KHS-LG\'s distribution network.',
  visakhapatnam: 'Visakhapatnam is an important industrial port city in Andhra Pradesh, extending KHS-LG\'s domestic reach along the eastern coastline.'
};

export function DealerNetworkSection() {
  const [selectedCityId, setSelectedCityId] = useState('ahmedabad');
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => document.visibilityState === 'visible');
  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!isDocumentVisible || dealerCities.length < 2) return;
    const timeoutId = window.setTimeout(() => {
      const currentIndex = dealerCities.findIndex((city) => city.id === selectedCityId);
      const nextIndex = (currentIndex + 1) % dealerCities.length;
      setSelectedCityId(dealerCities[nextIndex].id);
    }, 3000);
    return () => window.clearTimeout(timeoutId);
  }, [selectedCityId, timerResetKey, isDocumentVisible]);

  const selectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setTimerResetKey((current) => current + 1);
  };

  const selectedCity = useMemo(() => {
    return dealerCities.find((city) => city.id === selectedCityId) ?? dealerCities[0];
  }, [selectedCityId]);
  const selectedPosition = projectIndiaPosition(selectedCity.latitude, selectedCity.longitude);
  const focusTranslateX = (INDIA_MAP_WIDTH / 2 - selectedPosition.x) * 0.025;
  const focusTranslateY = (INDIA_MAP_HEIGHT / 2 - selectedPosition.y) * 0.025;
  const mapFocusTransform = `translate(${INDIA_MAP_WIDTH / 2 + focusTranslateX} ${INDIA_MAP_HEIGHT / 2 + focusTranslateY}) scale(1.015) translate(${-INDIA_MAP_WIDTH / 2} ${-INDIA_MAP_HEIGHT / 2})`;
  const dealerCount = dealerCities.filter((city) => city.active).length;

  return (
    <section aria-label="Our dealer network" className="relative overflow-hidden border-y border-ink-700 bg-ink-900 py-12 lg:py-16">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full border border-signal/10" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <TechnicalLabel code="Our network">Strong across India. Closer to every market.</TechnicalLabel>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Our network</p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold uppercase leading-[0.92] text-steel-50">Our dealer network</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-steel-400">
            Strong across India. Closer to every market. Our growing domestic network connects customers with bearing solutions across key industrial and commercial centres.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.85fr_0.85fr] lg:items-stretch">
          <div className="rounded-[20px] border border-ink-700 bg-ink-950/70 p-2 sm:p-5">
            <div className="relative overflow-hidden rounded-[14px] border border-ink-700 bg-[#070b10] p-1 sm:p-4">
              <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_48%,rgba(255,245,138,0.1),transparent_32%)]" aria-hidden />
              <svg viewBox={`${-INDIA_VIEWBOX_PADDING} ${-INDIA_VIEWBOX_PADDING} ${INDIA_MAP_WIDTH + INDIA_VIEWBOX_PADDING * 2} ${INDIA_MAP_HEIGHT + INDIA_VIEWBOX_PADDING * 2}`} preserveAspectRatio="xMidYMid meet" className="relative z-10 mx-auto block h-auto w-full max-w-[560px] transition-transform duration-700 ease-out" role="img" aria-label="Accurate India dealer network map">
                <g className="india-map-focus transition-transform duration-700 ease-out motion-reduce:transition-none" style={{ transform: mapFocusTransform, transformOrigin: `${INDIA_MAP_WIDTH / 2}px ${INDIA_MAP_HEIGHT / 2}px` }}>
                  <g aria-hidden="true" fill="#12181e" stroke="#9a8c45" strokeWidth="1.2">
                    {indiaMap.locations.map((location) => <path key={location.id} d={location.path} />)}
                  </g>
                  {dealerCities.map((city) => {
                    const position = projectIndiaPosition(city.latitude, city.longitude);
                    const active = city.id === selectedCityId;
                    return (
                      <g key={city.id} className="cursor-pointer" onClick={() => selectCity(city.id)} role="button" tabIndex={0} aria-pressed={active} aria-label={`View ${city.city} dealer network`} onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectCity(city.id);
                        }
                      }}>
                        <title>{city.city} - {city.state}</title>
                        <circle cx={position.x} cy={position.y} r={active ? 6 : 3.5} fill={active ? '#fff58a' : '#db5e5e'} stroke={active ? '#fff58a' : '#ffb5b5'} strokeWidth={active ? 1.6 : 1} />
                        <circle cx={position.x} cy={position.y} r={active ? 15 : 8} fill="rgba(255,245,138,0.08)" className={active ? 'network-pulse' : ''} />
                      </g>
                    );
                  })}
                </g>
              </svg>
              <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-steel-600">India / dealer locations</div>
            </div>
          </div>

          <div className="order-2 flex flex-col justify-center lg:order-none">
            <NetworkInfoPanel
              title={selectedCity.city}
              subtitle={`${selectedCity.state} · ${selectedCity.country}`}
              detailLabel="Dealer Network"
              detailValue="India"
              description={cityDescriptions[selectedCity.id] ?? 'This important industrial location supports KHS-LG\'s domestic distribution network across the region.'}
              accentLabel="Active"
            />
          </div>

        </div>

        <nav aria-label="Zonal office map locations" className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[9px] uppercase tracking-tech text-steel-500">Zonal offices</span>
          {zonalOfficeCities.map((city) => {
            const active = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectCity(city.id)}
                className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${active ? 'border-signal bg-signal text-ink-950' : 'border-ink-600 text-steel-400 hover:border-signal/60 hover:text-signal'}`}
              >
                {city.city}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[16px] border border-ink-700 bg-ink-950/70 p-5">
            <p className="font-display text-4xl font-semibold uppercase text-signal">{dealerCount}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">Dealer Cities</p>
          </div>
          <div className="rounded-[16px] border border-ink-700 bg-ink-950/70 p-5">
            <p className="font-display text-4xl font-semibold uppercase text-signal">Pan-India</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">Distribution Network</p>
          </div>
          <div className="rounded-[16px] border border-ink-700 bg-ink-950/70 p-5">
            <p className="font-display text-4xl font-semibold uppercase text-signal">Key</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">Industrial Locations</p>
          </div>
        </div>
      </div>
    </section>
  );
}
