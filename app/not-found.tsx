import Link from 'next/link';
import { BOOKING_URL, CONTACT_EMAIL } from './lib/site';

/**
 * GitHub Pages and Netlify both serve this file as HTTP 404 for unknown paths.
 * Agent recovery copy lives in public/404.md, not on the visible page.
 */
export default function NotFound() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Page not found</h1>
      <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
        Filed under: money that&apos;s stuck somewhere else.
      </p>
      <ul className="space-y-2 text-gray-700 dark:text-gray-400 mb-10">
        <li>
          <Link href="/" className="text-signal underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-signal underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/services" className="text-signal underline">
            Services
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-signal underline">
            Contact
          </Link>
        </li>
        <li>
          <a href="/llms.txt" className="text-signal underline">
            llms.txt
          </a>
        </li>
        <li>
          <a href="/sitemap.xml" className="text-signal underline">
            Sitemap
          </a>
        </li>
      </ul>
      <p className="text-gray-700 dark:text-gray-400 mb-8">
        Book a 15-minute intro at{' '}
        <a href={BOOKING_URL} className="text-signal underline">
          {BOOKING_URL}
        </a>{' '}
        or email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-signal underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </main>
  );
}
