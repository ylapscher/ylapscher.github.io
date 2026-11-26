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
import PageHeader from '../components/PageHeader';

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

  const unitLabel = showUSMap ? 'States' : 'Countries';

  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-x-8 mb-10">
        <PageHeader eyebrow="§ Travel" title="Where I&apos;ve been">
          Places I&apos;ve visited and lived around the {showUSMap ? 'United States' : 'world'}.
        </PageHeader>

        {/* Tally: same mono stat language as the project metrics strip. */}
        <dl className="grid grid-cols-2 border-t border-l border-rule-hi shrink-0 md:w-[22rem] md:mb-12">
          <div className="border-b border-r border-rule-hi px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-label text-muted">{unitLabel} visited</dt>
            <dd className="mt-1 font-mono tabular-nums text-3xl text-ink">{visitedCount}</dd>
            <div className="mt-2 h-1 bg-rule" aria-hidden="true">
              <div className="h-1 bg-[var(--map-visited)] transition-all duration-300" style={{ width: `${visitedPercentage}%` }} />
            </div>
          </div>
          <div className="border-b border-r border-rule-hi px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-label text-muted">{unitLabel} lived</dt>
            <dd className="mt-1 font-mono tabular-nums text-3xl text-signal">{livedCount}</dd>
          </div>
        </dl>
      </div>

      <div className="border border-rule-hi">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-3 sm:px-4 py-2.5">
          <div role="tablist" aria-label="Map" className="flex">
            {(['World', 'US'] as const).map((label) => {
              const active = (label === 'US') === showUSMap;
              return (
                <button
                  key={label}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setShowUSMap(label === 'US')}
                  className={`font-mono text-[11px] uppercase tracking-util px-3 py-1.5 border transition-colors -ml-px first:ml-0 ${
                    active
                      ? 'bg-ink text-paper border-ink'
                      : 'border-rule-hi text-muted hover:text-signal hover:border-signal'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-label text-muted">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[var(--map-visited)]" aria-hidden="true" /> Visited
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[var(--map-lived)]" aria-hidden="true" /> Lived
            </span>
          </div>
        </div>

        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative notebook-grid p-3 sm:p-4">
          {!mapsReady ? (
            <div className="h-full flex flex-col items-center justify-center gap-3">
              <span className="h-px w-10 bg-signal motion-safe:animate-pulse" />
              <p className="font-mono text-[11px] uppercase tracking-util text-muted">Loading map…</p>
            </div>
          ) : (
          <ErrorBoundary fallback={
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted mb-3">Map temporarily unavailable</p>
                <button
                  onClick={() => window.location.reload()}
                  className="font-mono text-[11px] uppercase tracking-util px-4 py-2 bg-signal text-signal-ink hover:brightness-110 transition"
                >
                  Refresh page
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
                              fill: hasLived ? 'var(--map-lived)' : isVisited ? 'var(--map-visited)' : 'var(--map-land)',
                              stroke: 'var(--paper)',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                            hover: {
                              fill: hasLived ? 'var(--map-lived)' : isVisited ? 'var(--map-visited)' : 'var(--map-land)',
                              stroke: 'var(--ink)',
                              strokeWidth: 0.75,
                              opacity: 0.82,
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
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-paper px-3 py-1.5 border border-rule-hi">
              <p className="font-mono text-[11px] uppercase tracking-util text-ink">{tooltip}</p>
            </div>
          )}
        </div>
      </div>

      <section className="mt-14 border-t border-rule pt-10">
        <p className="font-mono text-[10.5px] uppercase tracking-label text-muted">01 — Visited</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">
          {unitLabel} I&apos;ve been
        </h2>
        <p className="mt-2 text-sm text-muted mb-6">
          {livedCount} of these are {showUSMap ? 'states' : 'countries'} I&apos;ve lived in, marked in orange.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 text-sm sm:text-base">
          {places.map(({ name, hasLived }) => (
            <li
              key={name}
              className={`flex items-center gap-2.5 py-2 border-b border-rule ${
                hasLived ? 'font-semibold text-ink' : 'text-muted'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 flex-shrink-0 ${hasLived ? 'bg-[var(--map-lived)]' : 'bg-[var(--map-visited)]'}`}
              />
              <span>{displayNames[name] ?? name}</span>
              {hasLived && (
                <span className="ml-auto font-mono text-[10px] uppercase tracking-label text-signal">
                  Lived
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-rule pt-10">
        <p className="font-mono text-[10.5px] uppercase tracking-label text-muted">02 — Unvisited</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">Still to visit</h2>
        <p className="mt-2 text-sm text-muted mb-6">
          {stillToVisit.length} {showUSMap ? 'states' : 'countries'} left on the list.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 text-sm sm:text-base">
          {stillToVisit.map((name) => (
            <li key={name} className="flex items-center gap-2.5 py-2 border-b border-rule text-muted/80">
              <span aria-hidden="true" className="w-2 h-2 border border-rule-hi flex-shrink-0" />
              <span>{displayNames[name] ?? name}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}        