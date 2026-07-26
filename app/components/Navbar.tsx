'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { monoStyles } from '../lib/typography';

const RESUME_URL =
  'https://drive.google.com/file/d/1EqxPiOXn3-ao_I5GsP--dh6qYyzUFGsG/view?usp=sharing';

/** Normalises a path so "/", "" and "/foo/" compare correctly. */
const normalize = (p?: string) => (!p || p === '/' ? '/' : p.replace(/\/$/, ''));

/** Extracted so the desktop and mobile clusters stop duplicating 24 path points. */
function LinkedInLink({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="https://www.linkedin.com/in/ylapscher/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="LinkedIn profile"
      className="w-8 h-8 flex items-center justify-center border border-rule-hi hover:border-signal transition-colors"
    >
      <svg className="w-4 h-4 text-ink" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  );
}

const navLinks = [
  { href: '/', label: 'Experience' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/services', label: 'Services' },
  { href: '/travel', label: 'Travel' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');

  // The blocking script in app/layout.tsx has already resolved the theme and
  // stamped the class before paint, so this only needs to read it back --
  // it must not re-derive it, or it would fight the script.
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  // Handle theme toggle
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

  // Renders in every state. Previously this returned null until the effect
  // ran, so the button popped in after hydration and shifted the nav.
  const renderDarkModeToggle = () => (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 flex items-center justify-center border border-rule-hi hover:border-signal transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <SunIcon className="w-4 h-4 text-muted" />
      ) : (
        <MoonIcon className="w-4 h-4 text-muted" />
      )}
    </button>
  );

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

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://drive.google.com/file/d/1EqxPiOXn3-ao_I5GsP--dh6qYyzUFGsG/view?usp=sharing', '_blank');
  };

  return (
    <>
      <nav className="sticky top-0 z-10 bg-paper/85 backdrop-blur-sm border-b border-rule">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-ink hover:text-signal transition-colors"
            >
              Lapscher
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center">
              {/* Navigation Links */}
              <div className="flex gap-8 mr-8 border-r border-rule pr-8">
                {navLinks.map(({ href, label }) => {
                  const resolvedHref = href === '/' ? '/#experience' : href;
                  const isActive = normalize(pathname) === normalize(href);
                  return (
                    <Link
                      key={href}
                      href={resolvedHref}
                      aria-current={isActive ? 'page' : undefined}
                      className={`${monoStyles.label} relative transition-colors
                        ${isActive
                          ? 'text-ink after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-signal'
                          : 'text-muted hover:text-ink'
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
                  className={`${monoStyles.label} text-muted hover:text-signal transition-colors`}
                >
                  Resume
                </button>
                <LinkedInLink />
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
                  className="w-6 h-6 text-ink"
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
            <div className="md:hidden pt-4 pb-3 border-t border-rule">
              <div className="flex flex-col gap-4">
                {navLinks.map(({ href, label }) => {
                  const resolvedHref = href === '/' ? '/#experience' : href;
                  // Uses the same normalize() as desktop. The old check here
                  // compared raw strings, so a trailing slash lost the highlight.
                  const isActive = normalize(pathname) === normalize(href);
                  return (
                    <Link
                      key={href}
                      href={resolvedHref}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`${monoStyles.label} transition-colors px-2 py-1
                        ${isActive
                          ? 'text-ink border-l-2 border-signal -ml-0.5 pl-2.5'
                          : 'text-muted hover:text-ink'
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
                    className={`${monoStyles.label} text-muted hover:text-signal transition-colors`}
                  >
                    Resume
                  </button>
                  <LinkedInLink onClick={() => setIsMenuOpen(false)} />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
} 