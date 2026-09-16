import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '../components/TrustPage';
import JsonLd from '../components/JsonLd';
import { BOOKING_URL, CONTACT_EMAIL, LINKEDIN_URL } from '../lib/site';
import { personSchema } from '../lib/structured-data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Joe Lapscher (also Yoel Lapscher) is a partner at Expense Reduction Coaching in Hoboken, New Jersey. Cost reduction, fractional product leadership, and PM mentoring.',
  alternates: {
    canonical: '/about',
    types: { 'text/markdown': '/about.md' },
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <TrustPage
        title="Joe Lapscher"
        lead="Also Yoel Lapscher. Partner at Expense Reduction Coaching, working from Hoboken, New Jersey in the New York City metro area."
      >
        <p>
          Joe Lapscher finds operational cost savings for CEOs and CFOs of roughly
          $10M–$100M manufacturers, hospitality groups, and third-party logistics
          firms. The work looks at indirect spend — telecommunications, merchant
          processing, office supplies, payroll services, insurance, utilities, and
          similar categories — and is priced on contingency: no savings, no fee.
        </p>
        <p>
          Before consulting he spent a decade in product and engineering: internships
          at Procter &amp; Gamble, a technical consulting practice he founded and sold
          (Macro Excellence), GE&apos;s IT Leadership Program, product management at
          Citrix, Raistone, and Transcard, and chief product officer at Tienda Pago,
          a LATAM fintech.
        </p>
        <p>
          He still takes a small number of product and build engagements: fractional
          CPO / product leadership for early-to-growth startups, freelance websites,
          and mentoring for aspiring or junior product managers. Spanish is a working
          language.
        </p>
        <p>
          Education: BS in Industrial &amp; Systems Engineering and MS in Information
          Systems &amp; Operations Management from the University of Florida, where he
          taught Managerial Quantitative Analysis, Retail Consulting, and Intro to
          Managerial Statistics as a teaching assistant.
        </p>
        <p>
          Where to find me:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-signal underline">
            {CONTACT_EMAIL}
          </a>
          ,{' '}
          <a href={LINKEDIN_URL} className="text-signal underline">
            LinkedIn
          </a>
          ,{' '}
          <a href={BOOKING_URL} className="text-signal underline">
            book 15 minutes
          </a>
          . Hoboken, New Jersey.
        </p>
        <p>
          To verify this is a real practice, also read the{' '}
          <Link href="/contact" className="text-signal underline">
            contact
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-signal underline">
            privacy
          </Link>{' '}
          pages. Services and booking live at{' '}
          <Link href="/services" className="text-signal underline">
            /services
          </Link>
          .
        </p>
      </TrustPage>
    </>
  );
}
