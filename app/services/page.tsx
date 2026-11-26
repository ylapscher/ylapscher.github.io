import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AcademicCapIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Calendar from '../components/Calendar';
import PageHeader from '../components/PageHeader';
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
    icon: <BanknotesIcon className="w-6 h-6 text-signal" />,
    examplesHref: null as string | null,
  },
  {
    title: 'Fractional CPO / Product Leadership',
    description:
      'Strategic product leadership for early to growth-stage startups. I help build product foundations, define roadmaps, and scale product teams.',
    icon: <BuildingOfficeIcon className="w-6 h-6 text-signal" />,
    examplesHref: null as string | null,
  },
  {
    title: 'Freelance Website Development',
    description:
      'Custom website development using modern technologies. From concept to deployment, I build fast, responsive, and user-friendly web experiences.',
    icon: <CodeBracketIcon className="w-6 h-6 text-signal" />,
    examplesHref: '/portfolio',
  },
  {
    title: 'PM Mentoring & Interview Prep',
    description:
      "Guidance for aspiring and junior product managers. Resume reviews, interview coaching, and career strategy from someone who's been there.",
    icon: <AcademicCapIcon className="w-6 h-6 text-signal" />,
    examplesHref: '/services/guidance',
  },
];

export default function Services() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <PageHeader eyebrow="§ Services" title="Four ways to work together">
        Partner at Expense Reduction Coaching by day. I also take a small number of
        product, web, and mentoring engagements.
      </PageHeader>

      <section>
        <h2 className="sr-only">Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule-hi mb-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="p-6 sm:p-7 border-b border-r border-rule-hi flex flex-col transition-colors hover:bg-ink/[0.025]"
            >
              <div className="flex items-center justify-between mb-5">
                <div>{service.icon}</div>
                <span className={`${monoStyles.data} text-[11px] text-muted`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-ink leading-snug">{service.title}</h3>
                <p className="text-muted leading-relaxed">{service.description}</p>
              </div>
              {service.examplesHref && (
                <Link
                  href={service.examplesHref}
                  className={`${monoStyles.label} mt-5 self-start border-b border-signal/40 pb-0.5 text-signal hover:brightness-110 transition-colors`}
                >
                  See examples &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="scroll-mt-20 border-t border-rule pt-14">
        <PageHeader as="h2" eyebrow="§ Book" title="Book a 15-minute intro" />
        <Calendar />
      </section>
    </main>
  );
}
