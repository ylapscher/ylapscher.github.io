import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AcademicCapIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Calendar from '../components/Calendar';
import { monoStyles } from '../lib/typography';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Operational cost reduction for $10M–$100M companies (no savings, no fee), fractional product leadership, freelance websites, and PM mentoring. Book 15 minutes with Joe Lapscher.',
  alternates: {
    canonical: '/services',
    types: { 'text/markdown': '/services.md' },
  },
};

const services = [
  {
    title: 'Operational cost reduction',
    description:
      'For CEOs and CFOs of $10M–$100M manufacturers, hospitality groups, and 3PLs. Savings in telecom, merchant processing, payroll, insurance, utilities, and similar indirect spend. No savings, no fee.',
    icon: <BanknotesIcon className="w-8 h-8 text-signal" />,
    examplesHref: null as string | null,
  },
  {
    title: 'Fractional CPO / Product Leadership',
    description:
      'Strategic product leadership for early to growth-stage startups. I help build product foundations, define roadmaps, and scale product teams.',
    icon: <BuildingOfficeIcon className="w-8 h-8 text-signal" />,
    examplesHref: null as string | null,
  },
  {
    title: 'Freelance Website Development',
    description:
      'Custom website development using modern technologies. From concept to deployment, I build fast, responsive, and user-friendly web experiences.',
    icon: <CodeBracketIcon className="w-8 h-8 text-signal" />,
    examplesHref: '/portfolio',
  },
  {
    title: 'PM Mentoring & Interview Prep',
    description:
      "Guidance for aspiring and junior product managers. Resume reviews, interview coaching, and career strategy from someone who's been there.",
    icon: <AcademicCapIcon className="w-8 h-8 text-signal" />,
    examplesHref: '/services/guidance',
  },
];

export default function Services() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Four ways to work together
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          Partner at Expense Reduction Coaching by day. I also take a small number of
          product, web, and mentoring engagements.
        </p>
      </div>

      <section>
        <h2 className="sr-only">Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-400">{service.description}</p>
              </div>
              {service.examplesHref && (
                <Link
                  href={service.examplesHref}
                  className={`${monoStyles.label} mt-4 inline-block text-signal hover:brightness-110 transition-colors`}
                >
                  See examples &rarr;
                </Link>
              )}
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
