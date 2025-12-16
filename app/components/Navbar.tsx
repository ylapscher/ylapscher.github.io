'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const textStyles = {
  h3: "text-lg sm:text-xl font-semibold font-geist-sans",
  small: "text-sm font-geist-sans",
};

const navLinks = [
  { href: '/', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/services', label: 'Services' },
  { href: '/travel', label: 'Travel' },
];

/**
 * Navigation bar component with responsive menu, dark mode toggle, and active section highlighting.
 * Includes desktop and mobile menu variants with intersection observer for section tracking.
 * @returns {JSX.Element} A navigation bar component
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');

  // Initialize dark mode
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check saved preference
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Determine initial mode
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
      
      // Update DOM and state
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setIsDarkMode(shouldBeDark);
    }
  }, []);

  /**
   * Toggles between dark and light mode themes.
   * Updates the DOM class and saves preference to localStorage.
   */
  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const newDarkMode = !isDarkMode;
      
      // Update DOM
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      // Update state
      setIsDarkMode(newDarkMode);
    }
  };

  /**
   * Renders the dark mode toggle button if theme state is initialized.
   * Prevents hydration mismatch by not rendering until client-side state is ready.
   * @returns {JSX.Element|null} Dark mode toggle button or null
   */
  const renderDarkModeToggle = () => {
    if (isDarkMode === null) return null;
    
    return (
      <button
        onClick={toggleDarkMode}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <SunIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <MoonIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        )}
      </button>
    );
  };

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

  /**
   * Handles resume link click by opening resume in a new tab.
   * @param {React.MouseEvent} e - Click event
   */
  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://drive.google.com/file/d/1EqxPiOXn3-ao_I5GsP--dh6qYyzUFGsG/view?usp=sharing', '_blank');
  };

  return (
    <>
      <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className={`${textStyles.h3} text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors`}
            >
              Joe Lapscher
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center">
              {/* Navigation Links */}
              <div className="flex gap-8 mr-8 border-r border-gray-200 dark:border-gray-700 pr-8">
                {navLinks.map(({ href, label }) => {
                  const resolvedHref = href === '/' ? '/#experience' : href;
                  // normalize both pathname and href to "/" if empty or just "/", else strip any trailing slash
                  const normalize = (p?: string) => (!p || p === '/') ? '/' : p.replace(/\/$/, '');
                  const isActive = normalize(pathname) === normalize(href);
                  return (
                    <Link
                      key={href}
                      href={resolvedHref}
                      aria-current={isActive ? 'page' : undefined}
                      className={`${textStyles.small} relative transition-colors
                        ${isActive
                          ? 'text-gray-900 dark:text-white after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-600 after:rounded-full'
                          : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* Resume, LinkedIn, and Dark Mode Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleResumeClick}
                  className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Resume
                </button>
                <a
                  href="https://www.linkedin.com/in/ylapscher/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-900 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {renderDarkModeToggle()}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              {renderDarkModeToggle()}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-gray-900 dark:text-gray-400"
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
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col gap-4">
                {navLinks.map(({ href, label }) => {
                  const resolvedHref = href === '/' ? '/#experience' : href;
                  const isActive = pathname === href || (pathname === '/' && href === '/');
                  return (
                    <Link
                      key={href}
                      href={resolvedHref}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm transition-colors px-2 py-1
                        ${isActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      {label}
                    </Link>
                  );
                })}
                <div className="flex items-center gap-4 px-2 py-1">
                  <button
                    onClick={handleResumeClick}
                    className="text-sm text-gray-700 dark:text-gray-400"
                  >
                    Resume
                  </button>
                  <a
                    href="https://www.linkedin.com/in/ylapscher/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-900 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
} 