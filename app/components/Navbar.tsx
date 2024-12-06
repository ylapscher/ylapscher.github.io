'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const textStyles = {
  h3: "text-lg sm:text-xl font-semibold font-geist-sans",
  small: "text-sm font-geist-sans",
};

const navLinks = [
  { href: '/', label: 'Experience' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/guidance', label: 'Guidance' },
  { href: '/travel', label: 'Travel' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');

  // Add intersection observer for section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className={`${textStyles.h3} hover:text-gray-600 dark:hover:text-gray-300 transition-colors`}
          >
            Joe Lapscher
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {/* Navigation Links */}
            <div className="flex gap-8 mr-8 border-r border-gray-200 dark:border-gray-700 pr-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href === '/' ? '/#experience' : href}
                  className={`${textStyles.small} relative transition-colors
                    ${(pathname === href || (pathname === '/' && href === '/'))
                      ? 'text-gray-900 dark:text-white after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-600 after:rounded-full'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Resume Link */}
            <div className="flex items-center">
              <a
                href="https://drive.google.com/file/d/1xGWebBdenzHo2Q7hjaM1R-Ep7yr8M8FU/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm transition-colors px-2 py-1
                    ${(pathname === '/' && activeSection === href.slice(2)) || (pathname === href)
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                    }
                  `}
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://drive.google.com/file/d/1xGWebBdenzHo2Q7hjaM1R-Ep7yr8M8FU/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 px-2 py-1"
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 