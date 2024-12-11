'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { visitedStates, livedStates } from '../data/us-states-data';

const worldGeoUrl = "/data/world-geo.json";
const usGeoUrl = "/data/us-states.json";

type CountryName = {
  [key: string]: boolean;
};

const visitedCountries: CountryName = {
  "Argentina": true,
  "Aruba": true,
  "Austria": true,
  "Bahamas": true,
  "Belgium": true,
  "Belize": true,
  "Bolivia": true,
  "Cambodia": true,
  "Canada": true,
  "Chile": true,
  "Colombia": true,
  "Costa Rica": true,
  "Croatia": true,
  "Curacao": true,
  "Czech Rep.": true,
  "Denmark": true,
  "Dominican Rep.": true,
  "France": true,
  "Germany": true,
  "Greece": true,
  "Honduras": true,
  "Hungary": true,
  "Ireland": true,
  "Israel": true,
  "Italy": true,
  "Jamaica": true,
  "Mexico": true,
  "Netherlands": true,
  "New Zealand": true,
  "Norway": true,
  "Peru": true,
  "Portugal": true,
  "Saint Lucia": true,
  "Saint Martin": true,
  "Scotland": true,
  "Singapore": true,
  "Spain": true,
  "Sweden": true,
  "Switzerland": true,
  "Thailand": true,
  "United Kingdom": true,
  "United States": true,
  "Vatican City": true,
  "Venezuela": true,
};

const livedCountries: CountryName = {
  "United States of America": true,
  "Venezuela": true,
};

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
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [geographyData, setGeographyData] = useState<any[]>([]);
  const [mapScale, setMapScale] = useState(150);
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 600 });
  const [showUSMap, setShowUSMap] = useState(false);
  const [worldData, setWorldData] = useState<GeoData | null>(null);
  const [usData, setUsData] = useState<GeoData | null>(null);

  // 2. All useRef hooks
  const geographiesRef = useRef<any[]>([]);

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
        }
      });

    fetch(usGeoUrl)
      .then(response => response.json())
      .then(data => {
        setUsData(data);
      });
  }, []);

  useEffect(() => {
    if (geographiesRef.current.length > 0 && geographyData.length === 0) {
      setGeographyData(geographiesRef.current);
    }
  }, [geographiesRef.current, geographyData]);

  useEffect(() => {
    if (geographyData.length > 0) {
      const names = Object.keys(showUSMap ? visitedStates : visitedCountries)
        .map(code => geographyData.find(geo => geo.id === code)?.properties.name)
        .filter(Boolean)
        .sort();
      setCountriesList(names as string[]);
    }
  }, [geographyData, showUSMap]);

  // Calculate counts
  const visitedCount = Object.entries(showUSMap ? visitedStates : visitedCountries)
    .filter(([_, value]) => value === true)
    .length;
  const livedCount = Object.entries(showUSMap ? livedStates : livedCountries)
    .filter(([_, value]) => value === true)
    .length;

  // Loading states
  if (!worldData || !usData) return <div>Loading maps...</div>;

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
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Show {showUSMap ? 'World' : 'US'} Map
        </button>
        <div className="flex justify-center gap-8">
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-[#60A5FA]">
              {visitedCount}
            </p>
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
                  geographiesRef.current = geographies;

                  return geographies.map((geo: GeoProperties) => {
                    const name = showUSMap ? geo.properties.NAME : geo.properties.name;
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
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
          {showUSMap ? 'States' : 'Countries'} Visited
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 text-sm sm:text-base">
          {Object.entries(showUSMap ? visitedStates : visitedCountries)
            .filter(([_, value]) => value === true)
            .map(([place, _], index) => (
              <div 
                key={index} 
                className="text-gray-700 dark:text-gray-400 p-2 rounded-lg"
              >
                {place}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
} 