import type { Metadata } from 'next';
import Link from 'next/link';
import { CommandLineIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Calendar from '../../components/Calendar';

export const metadata: Metadata = {
  title: 'Guidance',
  description:
    'One-off sessions, not retainers: resume and interview prep, PM coaching, and getting productive with AI coding tools. Book 15 minutes with Joe Lapscher.',
  alternates: {
    canonical: '/services/guidance',
    types: { 'text/markdown': '/services/guidance.md' },
  },
};

const services = [
  {
    title: 'Resume & Interview Prep',
    description:
      'Will help you prepare for your next big opportunity with personalized resume review and interview coaching.',
    icon: <DocumentTextIcon className="w-8 h-8 text-signal" />,
  },
  {
    title: 'Product Coaching / Mentorship',
    description:
      "Get guidance on product management fundamentals, strategy, and career growth from someone who's been there.",
    icon: <BeakerIcon className="w-8 h-8 text-signal" />,
  },
  {
    title: 'AI coding tools (Cursor, Claude Code)',
    description:
      'Hands-on help getting productive with AI coding tools — Cursor, Claude Code, and the rest of the new stack.',
    icon: <CommandLineIcon className="w-8 h-8 text-signal" />,
  },
];

export default function Guidance() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Guidance for product people
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          One-off sessions, not retainers: resume and interview prep, PM coaching, and
          getting productive with AI coding tools.
        </p>
        <p className="mt-4 text-base text-gray-700 dark:text-gray-400">
          Looking for cost reduction, a website, or fractional product work?{' '}
          <Link href="/services" className="text-signal underline hover:brightness-110">
            See all services
          </Link>
          .
        </p>
      </div>

      <section>
        <h2 className="sr-only">Guidance offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-16 border-rule" />

      <section id="book" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Book a 15-minute intro
        </h2>
        <Calendar />
      </section>
    </main>
  );
}
