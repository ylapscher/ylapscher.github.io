'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { visitedStates, livedStates } from '../data/us-states-data';
import { ErrorBoundary } from '../components/ErrorBoundary';

const worldGeoUrl = "/data/world-geo.json";
const usGeoUrl = "/data/us-states.json";

type CountryName = {
  [key: string]: boolean;
};

/**
 * Keys must match `properties.name` in public/data/world-geo.json or the
 * country silently fails to paint. Aruba, Curacao, Saint Lucia, Saint Martin,
 * Singapore and Vatican City have no geometry at this 110m resolution, and
 * Scotland is folded into the United Kingdom -- they are kept here so they
 * still appear in the list below.
 *
 * This is the full canonical set (193 UN member states, plus Vatican City,
 * Taiwan and Kosovo -- the usual travel-tracker count of ~196),
 * not just the places visited: the `false` entries are what power "Still to
 * Visit" below. Everything not personally verified stays `false`.
 */
const visitedCountries: CountryName = {
  "Afghanistan": false,
  "Albania": false,
  "Algeria": false,
  "Andorra": false,
  "Angola": false,
  "Antigua and Barbuda": false,
  "Argentina": true,
  "Armenia": false,
  "Aruba": true,
  "Australia": false,
  "Austria": true,
  "Azerbaijan": false,
  "Bahamas": true,
  "Bahrain": false,
  "Bangladesh": false,
  "Barbados": false,
  "Belarus": false,
  "Belgium": true,
  "Belize": true,
  "Benin": false,
  "Bhutan": false,
  "Bolivia": true,
  "Bosnia and Herz.": false,
  "Botswana": false,
  "Brazil": false,
  "Brunei": false,
  "Bulgaria": false,
  "Burkina Faso": false,
  "Burundi": false,
  "Cabo Verde": false,
  "Cambodia": true,
  "Cameroon": false,
  "Canada": true,
  "Central African Rep.": false,
  "Chad": false,
  "Chile": true,
  "China": false,
  "Colombia": true,
  "Comoros": false,
  "Congo": false,
  "Costa Rica": true,
  "Côte d'Ivoire": false,
  "Croatia": true,
  "Cuba": false,
  "Curacao": true,
  "Cyprus": false,
  "Czechia": true,
  "Dem. Rep. Congo": false,
  "Denmark": true,
  "Djibouti": false,
  "Dominica": false,
  "Dominican Rep.": true,
  "Ecuador": false,
  "Egypt": false,
  "El Salvador": false,
  "Eq. Guinea": false,
  "Eritrea": false,
  "Estonia": false,
  "eSwatini": false,
  "Ethiopia": false,
  "Fiji": false,
  "Finland": false,
  "France": true,
  "Gabon": false,
  "Gambia": false,
  "Georgia": false,
  "Germany": true,
  "Ghana": false,
  "Greece": true,
  "Grenada": false,
  "Guatemala": false,
  "Guinea": false,
  "Guinea-Bissau": false,
  "Guyana": false,
  "Haiti": false,
  "Honduras": true,
  "Hungary": true,
  "Iceland": false,
  "India": false,
  "Indonesia": false,
  "Iran": false,
  "Iraq": false,
  "Ireland": true,
  "Israel": true,
  "Italy": true,
  "Jamaica": true,
  "Japan": true,
  "Jordan": false,
  "Kazakhstan": false,
  "Kenya": false,
  "Kiribati": false,
  "Kosovo": false,
  "Kuwait": false,
  "Kyrgyzstan": false,
  "Laos": false,
  "Latvia": false,
  "Lebanon": false,
  "Lesotho": false,
  "Liberia": false,
  "Libya": false,
  "Liechtenstein": false,
  "Lithuania": false,
  "Luxembourg": false,
  "Macedonia": false,
  "Madagascar": false,
  "Malawi": false,
  "Malaysia": false,
  "Maldives": false,
  "Mali": false,
  "Malta": false,
  "Marshall Islands": false,
  "Mauritania": false,
  "Mauritius": false,
  "Mexico": true,
  "Micronesia": false,
  "Moldova": false,
  "Monaco": false,
  "Mongolia": false,
  "Montenegro": false,
  "Morocco": false,
  "Mozambique": false,
  "Myanmar": false,
  "Namibia": false,
  "Nauru": false,
  "Nepal": false,
  "Netherlands": true,
  "New Zealand": true,
  "Nicaragua": false,
  "Niger": false,
  "Nigeria": false,
  "North Korea": false,
  "Norway": true,
  "Oman": false,
  "Pakistan": false,
  "Palau": false,
  "Panama": false,
  "Papua New Guinea": false,
  "Paraguay": false,
  "Peru": true,
  "Philippines": false,
  "Poland": false,
  "Portugal": true,
  "Qatar": false,
  "Romania": false,
  "Russia": false,
  "Rwanda": false,
  "S. Sudan": false,
  "Saint Kitts and Nevis": false,
  "Saint Lucia": true,
  "Saint Martin": true,
  "Saint Vincent and the Grenadines": false,
  "Samoa": false,
  "San Marino": false,
  "Sao Tome and Principe": false,
  "Saudi Arabia": false,
  "Scotland": true,
  "Senegal": false,
  "Serbia": false,
  "Seychelles": false,
  "Sierra Leone": false,
  "Singapore": true,
  "Slovakia": false,
  "Slovenia": false,
  "Solomon Is.": false,
  "Somalia": false,
  "South Africa": false,
  "South Korea": false,
  "Spain": true,
  "Sri Lanka": false,
  "Sudan": false,
  "Suriname": false,
  "Sweden": true,
  "Switzerland": true,
  "Syria": false,
  "Taiwan": false,
  "Tajikistan": false,
  "Tanzania": false,
  "Thailand": true,
  "Timor-Leste": false,
  "Togo": false,
  "Tonga": false,
  "Trinidad and Tobago": false,
  "Tunisia": false,
  "Turkey": false,
  "Turkmenistan": false,
  "Tuvalu": false,
  "Uganda": false,
  "Ukraine": false,
  "United Arab Emirates": false,
  "United Kingdom": true,
  "United States of America": true,
  "Uruguay": false,
  "Uzbekistan": false,
  "Vanuatu": false,
  "Vatican City": true,
  "Venezuela": true,
  "Vietnam": false,
  "Yemen": false,
  "Zambia": false,
  "Zimbabwe": false,
};

const livedCountries: CountryName = {
  "United States of America": true,
  "Venezuela": true,
};

/** Geo names that read awkwardly in prose. Keys above stay geo-accurate. */
const displayNames: Record<string, string> = {
  "United States of America": "United States",
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  "Central African Rep.": "Central African Republic",
  "Congo": "Republic of the Congo",
  "Dem. Rep. Congo": "DR Congo",
  "Eq. Guinea": "Equatorial Guinea",
  "Macedonia": "North Macedonia",
  "S. Sudan": "South Sudan",
  "Solomon Is.": "Solomon Islands",
};

/** Neither is a state, so both stay out of the counts and the list. */
const nonStateEntities = ["District of Columbia", "Puerto Rico"];

// Add type for map data
type GeoData = Record<string, any>;

type GeoProperties = {
  NAME: string;
  name: string;
  rsmKey: string;
  properties: {
    NAME: string;
    name: string;
  };
};

export default function Travel() {
  // 1. All useState hooks
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(150);
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 600 });
  const [showUSMap, setShowUSMap] = useState(false);
  const [worldData, setWorldData] = useState<GeoData | null>(null);
  const [usData, setUsData] = useState<GeoData | null>(null);
  const [totalCountries, setTotalCountries] = useState<number>(0);

  // 2. All useRef hooks (Removed geographiesRef)

  // 3. All useEffect hooks
  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 800;
      const height = typeof window !== 'undefined' ? window.innerHeight : 600;
      setMapScale(showUSMap ? (width < 640 ? 600 : 800) : (width < 640 ? 100 : 150));
      setMapDimensions({ width, height });
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [showUSMap]);

  useEffect(() => {
    fetch(worldGeoUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.objects && data.objects.countries) {
          setWorldData(data);
          // Count total countries from the geometries
          const geometries = data.objects.countries.geometries;
          if (geometries && Array.isArray(geometries)) {
            setTotalCountries(geometries.length);
          }
        }
      });

    fetch(usGeoUrl)
      .then(response => response.json())
      .then(data => {
        setUsData(data);
      });
  }, []);

  // Calculate counts more directly - only count true values
  const visitedCount = showUSMap
    ? Object.entries(visitedStates).filter(([stateName, isVisited]) =>
        isVisited === true && !nonStateEntities.includes(stateName)
      ).length
    : Object.values(visitedCountries).filter(Boolean).length;
  const livedCount = Object.values(showUSMap ? livedStates : livedCountries).filter(Boolean).length;

  // Calculate totals and percentages
  const totalStates = 50; // Excluding DC and Puerto Rico
  
  const visitedPercentage = showUSMap
    ? Math.round((visitedCount / totalStates) * 100)
    : totalCountries > 0 ? Math.round((visitedCount / totalCountries) * 100) : 0;
  
  const livedPercentage = showUSMap
    ? Math.round((livedCount / totalStates) * 100)
    : totalCountries > 0 ? Math.round((livedCount / totalCountries) * 100) : 0;

  /**
   * One list, lived-in places flagged inline. Built from the union of the two
   * records rather than from `visited` alone, so a place marked lived-in but
   * never added to the visited record still shows up.
   */
  const visitedRecord = showUSMap ? visitedStates : visitedCountries;
  const livedRecord = showUSMap ? livedStates : livedCountries;
  const places = Array.from(
    new Set(
      [...Object.entries(visitedRecord), ...Object.entries(livedRecord)]
        .filter(([, value]) => value === true)
        .map(([name]) => name)
    )
  )
    .filter((name) => !nonStateEntities.includes(name))
    .sort((a, b) => (displayNames[a] ?? a).localeCompare(displayNames[b] ?? b))
    .map((name) => ({ name, hasLived: livedRecord[name] === true }));

  /** The other side of the same record: everywhere still marked `false`. */
  const stillToVisit = Object.entries(visitedRecord)
    .filter(([name, isVisited]) => isVisited === false && !nonStateEntities.includes(name))
    .map(([name]) => name)
    .sort((a, b) => (displayNames[a] ?? a).localeCompare(displayNames[b] ?? b));

  /**
   * The geographies arrive via fetch, so only the map itself waits on them.
   * Everything else -- headings, counts, the place list -- renders on the
   * server, which is what crawlers and no-JS visitors actually see.
   */
  const mapsReady = Boolean(worldData && usData);

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
          Travel Map
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Places I've visited and lived around the {showUSMap ? 'United States' : 'world'}
        </p>
        <button
          onClick={() => setShowUSMap(!showUSMap)}
          className="mb-6 px-4 py-2 bg-signal text-white rounded hover:brightness-110 transition-colors"
        >
          Show {showUSMap ? 'World' : 'US'} Map
        </button>
        <div className="flex justify-center gap-8">
          <div className="w-full max-w-xs">
            <p className="text-xl sm:text-2xl font-semibold text-[#60A5FA] mb-2">
              {visitedCount}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
              <div 
                className="bg-[#60A5FA] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${visitedPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {showUSMap ? 'States' : 'Countries'} Visited
            </p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-[#2563EB]">
              {livedCount}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {showUSMap ? 'States' : 'Countries'} Lived
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
          {!mapsReady ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-signal mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading interactive maps...</p>
              </div>
            </div>
          ) : (
          <ErrorBoundary fallback={
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Map temporarily unavailable</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-signal text-white rounded hover:brightness-110 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          }>
            <ComposableMap
              projection={showUSMap ? "geoAlbersUsa" : undefined}
              projectionConfig={{
                scale: mapScale,
                ...(showUSMap ? {} : { center: [0, 20], rotate: [-10, -5, 0] })
              }}
              width={800}
              height={400}
              className="w-full h-full"
            >
              <ZoomableGroup
                translateExtent={[
                  [-1000, -400],
                  [1000, 400]
                ]}
              >
                <Geographies geography={showUSMap ? usData! : worldData!}>
                  {({ geographies }) => {
                    return geographies.map((geo) => {
                      const properties = geo.properties as { NAME?: string; name?: string };
                      const name = showUSMap ? properties?.NAME : properties?.name;

                      if (!name) return null;

                      const isVisited = showUSMap ? visitedStates[name] : visitedCountries[name];
                      const hasLived = showUSMap ? livedStates[name] : livedCountries[name];

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => {
                            const status = hasLived ? ' (Lived)' : isVisited ? ' (Visited)' : '';
                            setTooltip(`${name}${status}`);
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            default: {
                              fill: hasLived ? '#2563EB' : isVisited ? '#60A5FA' : '#E5E7EB',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                            hover: {
                              fill: hasLived ? '#1D4ED8' : isVisited ? '#3B82F6' : '#D1D5DB',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.5,
                              outline: 'none',
                            }
                          }}
                        />
                      );
                    });
                  }}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </ErrorBoundary>
          )}

          {tooltip && (
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">{tooltip}</p>
            </div>
          )}
        </div>

        <div className="mt-3 sm:mt-4 flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#60A5FA] rounded"></div>
            <span className="text-gray-900 dark:text-gray-400">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#2563EB] rounded"></div>
            <span className="text-gray-900 dark:text-gray-400">Lived</span>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {showUSMap ? 'States' : 'Countries'} I&apos;ve Been
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4 sm:mb-6">
          {livedCount} of these are {showUSMap ? 'states' : 'countries'} I&apos;ve
          lived in, marked below.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 text-sm sm:text-base">
          {places.map(({ name, hasLived }) => (
            <li
              key={name}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                hasLived
                  ? 'bg-[#2563EB]/10 font-semibold text-[#2563EB] dark:text-[#93B4FB]'
                  : 'text-gray-700 dark:text-gray-400'
              }`}
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: hasLived ? '#2563EB' : '#60A5FA' }}
              />
              <span>{displayNames[name] ?? name}</span>
              {hasLived && (
                <span className="ml-auto text-[10px] font-mono uppercase tracking-widest">
                  Lived
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Still to Visit
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4 sm:mb-6">
          {stillToVisit.length} {showUSMap ? 'states' : 'countries'} left on the list.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 text-sm sm:text-base">
          {stillToVisit.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2 p-2 rounded-lg text-gray-500 dark:text-gray-500"
            >
              <span
                aria-hidden="true"
                className="w-3.5 h-3.5 rounded-[3px] border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"
              />
              <span>{displayNames[name] ?? name}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}        