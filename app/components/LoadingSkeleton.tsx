export function TimelineSkeleton() {
  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
      
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div 
            key={index}
            className={`relative flex items-center ${
              index % 2 === 1 ? 'md:justify-end' : 'justify-start'
            }`}
          >
            {/* Year Skeleton */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-[1]">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full">
                <span className="bg-gray-100 dark:bg-gray-800 mx-[1px] my-[1px] px-3 py-0.5 rounded-full block w-16 h-8 animate-pulse" />
              </div>
            </div>
            
            {/* Content Box Skeleton */}
            <div className={`w-full md:w-[48%] pl-16 md:pl-10 pr-4 md:pr-10 ${
              index % 2 === 1 ? 'md:pl-0' : ''
            }`}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {/* Company Logo Skeleton */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="flex-1">
                      {/* Role Title Skeleton */}
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                      {/* Company Name Skeleton */}
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                  {/* Description Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InitiativesSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Volunteering Section Skeleton */}
      <div className="flex flex-col">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8" />
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
            {/* Image Skeleton */}
            <div className="h-32 sm:h-40 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="p-4 sm:p-6">
              {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section Skeleton */}
      <div className="flex flex-col">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8" />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex-1">
          <div className="flex items-start gap-4 mb-6">
            {/* Logo Skeleton */}
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
              </div>
            </div>
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 4 }).map((_, categoryIndex) => (
        <div key={categoryIndex}>
          {/* Category Title Skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4 w-48" />
          {/* Skills Grid Skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: Math.floor(Math.random() * 4) + 3 }).map((_, skillIndex) => (
              <div
                key={skillIndex}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full animate-pulse"
              >
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <header className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
      <div className="flex justify-center mb-8">
        {/* Profile Image Skeleton */}
        <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col gap-6 text-center">
        {/* Name Skeleton */}
        <div className="space-y-2">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto w-80" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto w-64" />
        </div>
        {/* Description Skeleton */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6 mx-auto" />
        </div>
        {/* CTA Button Skeleton */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32 mx-auto" />
      </div>
    </header>
  );
}
