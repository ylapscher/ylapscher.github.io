'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  size = 'large',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const headingClasses = {
    large: 'text-2xl sm:text-3xl font-bold font-geist-sans',
    medium: 'text-lg sm:text-xl font-semibold font-geist-sans',
    small: 'text-base font-medium font-geist-sans',
  };

  const iconSizes = {
    large: 'w-6 h-6',
    medium: 'w-5 h-5',
    small: 'w-4 h-4',
  };

  const renderHeading = () => {
    const className = `${headingClasses[size]} text-gray-900 dark:text-white`;
    if (size === 'large') {
      return <h2 className={className}>{title}</h2>;
    } else if (size === 'medium') {
      return <h3 className={className}>{title}</h3>;
    } else {
      return <h4 className={className}>{title}</h4>;
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {renderHeading()}
        <div className="flex-shrink-0 ml-4 transition-transform duration-200">
          {isOpen ? (
            <ChevronUpIcon className={`${iconSizes[size]} text-gray-700 dark:text-gray-300`} />
          ) : (
            <ChevronDownIcon className={`${iconSizes[size]} text-gray-700 dark:text-gray-300`} />
          )}
        </div>
      </button>
      <div
        id={`collapsible-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

