import Link from 'next/link';
import { BOOKING_URL, CONTACT_EMAIL } from './lib/site';
import { notFoundMarkdown } from './lib/structured-data';

/**
 * GitHub Pages and Netlify both serve this file as HTTP 404 for unknown paths.
 * The visible copy and the markdown block give agents a recovery path instead
 * of an empty app shell.
 */
export default function NotFound() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Page not found</h1>
      <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
        This URL is not a published page on lapscher.com. Joe Lapscher&apos;s site is
        small on purpose — use the index below rather than guessing paths.
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
      <pre
        id="agent-recovery"
        className="whitespace-pre-wrap text-sm leading-relaxed text-ink bg-white dark:bg-gray-800 border border-rule p-4 overflow-x-auto"
      >
        {notFoundMarkdown}
      </pre>
    </main>
  );
}
