import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '../components/TrustPage';
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  FORMSPREE_ENDPOINT,
  LINKEDIN_URL,
  SITE_URL,
} from '../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Email yoel@lapscher.com, book a 15-minute intro, or send the contact form. Joe Lapscher, Hoboken, New Jersey.',
  alternates: {
    canonical: '/contact',
    types: { 'text/markdown': '/contact.md' },
  },
};

export default function ContactPage() {
  return (
    <TrustPage
      title="Contact Joe Lapscher"
      lead="Email is fastest. Fifteen minutes on the calendar is second. No phone number on purpose."
    >
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Email:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-signal underline">
            {CONTACT_EMAIL}
          </a>
        </li>
        <li>
          Book 15 minutes:{' '}
          <a href={BOOKING_URL} className="text-signal underline">
            {BOOKING_URL}
          </a>
        </li>
        <li>
          LinkedIn:{' '}
          <a href={LINKEDIN_URL} className="text-signal underline">
            {LINKEDIN_URL}
          </a>
        </li>
        <li>
          About:{' '}
          <Link href="/about" className="text-signal underline">
            {SITE_URL}/about
          </Link>
        </li>
      </ul>
      <p>I&apos;ll reply to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>cost-reduction questions from operators</li>
        <li>fractional product work</li>
        <li>a website build</li>
        <li>PM interview prep</li>
      </ul>
      <p>
        If the request is something else, say so in the first sentence so it can be
        declined quickly.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-4">Send a message</h2>
      <p>
        This form works without JavaScript. It posts to Formspree and is delivered
        to {CONTACT_EMAIL}. Do not send secrets, health information, or payment
        card numbers. Privacy details are on the{' '}
        <Link href="/privacy" className="text-signal underline">
          privacy page
        </Link>
        .
      </p>
      <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1 text-ink">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-signal outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1 text-ink">
            Email
          </label>
          <input
            id="contact-email"
            name="_replyto"
            type="email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-signal outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-1 text-ink">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-signal outline-none resize-y"
          />
        </div>
        <button
          type="submit"
          className="bg-signal text-signal-ink font-semibold py-2 px-5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          Send message
        </button>
      </form>
    </TrustPage>
  );
}
