import type { Metadata } from 'next';
import Link from 'next/link';
import { CommandLineIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Calendar from '../../components/Calendar';
import PageHeader from '../../components/PageHeader';

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
    icon: <DocumentTextIcon className="w-6 h-6 text-signal" />,
  },
  {
    title: 'Product Coaching / Mentorship',
    description:
      "Get guidance on product management fundamentals, strategy, and career growth from someone who's been there.",
    icon: <BeakerIcon className="w-6 h-6 text-signal" />,
  },
  {
    title: 'AI coding tools (Cursor, Claude Code)',
    description:
      'Hands-on help getting productive with AI coding tools — Cursor, Claude Code, and the rest of the new stack.',
    icon: <CommandLineIcon className="w-6 h-6 text-signal" />,
  },
];

export default function Guidance() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="mb-12">
        <PageHeader eyebrow="§ Services / Guidance" title="Guidance for product people">
          One-off sessions, not retainers: resume and interview prep, PM coaching, and
          getting productive with AI coding tools.
        </PageHeader>
        <p className="-mt-6 text-base text-muted">
          Looking for cost reduction, a website, or fractional product work?{' '}
          <Link href="/services" className="text-signal underline underline-offset-4 hover:brightness-110">
            See all services
          </Link>
          .
        </p>
      </div>

      <section>
        <h2 className="sr-only">Guidance offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-rule-hi mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 border-b border-r border-rule-hi"
            >
              <div className="flex flex-col">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-ink">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed">{service.description}</p>
              </div>
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
