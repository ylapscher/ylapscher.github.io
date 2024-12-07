'use client';

import { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { visitedStates, livedStates } from '../data/us-states-data';

const geoUrl = "/data/us-states.json";

export default function USTravel() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(800);
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 600 });
  const visitedCount = Object.keys(visitedStates).length;
  const livedCount = Object.keys(livedStates).length;

  // Handle window resize and dimensions
  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 800;
      const height = typeof window !== 'undefined' ? window.innerHeight : 600;
      setMapScale(width < 640 ? 600 : 800);
      setMapDimensions({ width, height });
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">US States Travel Map</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          States I've visited and lived in across the USA
        </p>
        <div className="flex justify-center gap-8">
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-[#60A5FA]">
              {visitedCount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              States Visited
            </p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-[#2563EB]">
              {livedCount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              States Lived
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{
              scale: mapScale,
            }}
            width={800}
            height={400}
            className="w-full h-full"
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) => 
                  geographies.map((geo) => {
                    const stateName = geo.properties.NAME;
                    const isVisited = visitedStates[stateName];
                    const hasLived = livedStates[stateName];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          const status = hasLived ? ' (Lived)' : isVisited ? ' (Visited)' : '';
                          setTooltip(`${stateName}${status}`);
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
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {tooltip && (
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-xs sm:text-sm font-medium">{tooltip}</p>
            </div>
          )}
        </div>

        <div className="mt-3 sm:mt-4 flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#60A5FA] rounded"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#2563EB] rounded"></div>
            <span>Lived</span>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">States Visited</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 text-sm sm:text-base">
          {Object.keys(visitedStates).sort().map((state, index) => (
            <div 
              key={index} 
              className="text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {state}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 