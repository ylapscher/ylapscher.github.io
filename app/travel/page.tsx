'use client';

import { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';

const geoUrl = "/data/world-geo.json";

type CountryCode = {
  [key: string]: boolean;
};

const visitedCountries: CountryCode = {
  '124': true,  // Canada
  '840': true,  // United States
  '484': true,  // Mexico
  '388': true,  // Jamaica
  '044': true,  // Bahamas
  '214': true,  // Dominican Republic
  '862': true,  // Venezuela
  '152': true,  // Chile
  '032': true,  // Argentina
  '724': true,  // Spain
  '380': true,  // Italy
  '756': true,  // Switzerland
  '203': true,  // Czech Republic
  '276': true,  // Germany
  '528': true,  // Netherlands
  '056': true,  // Belgium
  '250': true,  // France
  '826': true,  // United Kingdom (England)
  '040': true,  // Austria
  '376': true,  // Israel
  '208': true,  // Denmark
  '348': true,  // Hungary
  '702': true,  // Singapore
  '116': true,  // Cambodia
  '764': true,  // Thailand
  '336': true,  // Vatican City
  '340': true,  // Honduras
  '300': true,  // Greece
  '191': true,  // Croatia
  '170': true,  // Colombia
  '578': true,  // Norway
  '662': true,  // Saint Lucia
  '068': true,  // Bolivia
  '752': true,  // Sweden
  '084': true,  // Belize
  '372': true,  // Ireland
  '620': true,  // Portugal
  '188': true,  // Costa Rica
  '554': true,  // New Zealand
  '604': true,  // Peru
  '533': true,  // Aruba
  '531': true,  // Curaçao
  '534': true,  // Sint Maarten
  '136': true,  // Cayman Islands
};

const livedCountries: CountryCode = {
  '840': true,  // USA
  '862': true,  // Venezuela
};

export default function Travel() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [geographyData, setGeographyData] = useState<any[]>([]);
  const visitedCount = Object.keys(visitedCountries).length;

  // Update countries list when geography data is available
  useEffect(() => {
    if (geographyData.length > 0) {
      const names = Object.keys(visitedCountries)
        .map(code => geographyData.find(geo => geo.id === code)?.properties.name)
        .filter(Boolean)
        .sort();
      setCountriesList(names as string[]);
    }
  }, [geographyData]);

  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Travel Map</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
          Places I've visited and lived around the world
        </p>
        <p className="text-2xl font-semibold text-blue-600">
          {visitedCount} Countries Visited
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="h-[600px] relative">
          <ComposableMap
            projectionConfig={{
              scale: 150,
              center: [0, 0],
              rotate: [-10, 0, 0] // Adjust to center the map better
            }}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) => {
                  // Store geography data for later use
                  if (geographyData.length === 0) {
                    setGeographyData(geographies);
                  }

                  return geographies.map((geo) => {
                    const isVisited = visitedCountries[geo.id as keyof typeof visitedCountries];
                    const hasLived = livedCountries[geo.id as keyof typeof livedCountries];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          const name = geo.properties.name;
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
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium">{tooltip}</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#60A5FA] rounded"></div>
            <span className="text-sm">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#2563EB] rounded"></div>
            <span className="text-sm">Lived</span>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold mb-6">Countries Visited</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countriesList.map((country, index) => (
            <div key={index} className="text-gray-600 dark:text-gray-400">
              {country}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 