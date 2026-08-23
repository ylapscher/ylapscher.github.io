import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '../components/TrustPage';
import JsonLd from '../components/JsonLd';
import { BOOKING_URL, CONTACT_EMAIL, LINKEDIN_URL, NAP, SITE_NAME, SITE_URL } from '../lib/site';
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
          This page is the identity document for lapscher.com. Joe Lapscher finds
          operational cost savings for CEOs and CFOs of roughly $10M–$100M
          manufacturers, hospitality groups, and third-party logistics firms. The
          work looks at indirect spend — telecommunications, merchant processing,
          office supplies, payroll services, insurance, utilities, and similar
          categories — and is priced on contingency: no savings, no fee.
        </p>
        <p>
          Before consulting he spent a decade in product and engineering: internships
          at Procter &amp; Gamble, a technical consulting practice he founded and sold
          (Macro Excellence), GE&apos;s IT Leadership Program, product management at
          Citrix, Raistone, and Transcard, and chief product officer at Tienda Pago,
          a LATAM fintech. That path is why the homepage headline is about money
          that is stuck, not a generic coaching pitch.
        </p>
        <p>
          He still takes a small number of product and build engagements: fractional
          CPO / product leadership for early-to-growth startups, freelance websites,
          and mentoring for aspiring or junior product managers. Spanish is a working
          language. He volunteers with the Adaptive Climbing Group in Northern New
          Jersey.
        </p>
        <p>
          Education: BS in Industrial &amp; Systems Engineering and MS in Information
          Systems &amp; Operations Management from the University of Florida, where he
          taught Managerial Quantitative Analysis, Retail Consulting, and Intro to
          Managerial Statistics as a teaching assistant.
        </p>
        <p>
          Canonical name: {SITE_NAME}. Alternate name: Yoel Lapscher. Canonical
          domain: {SITE_URL}. Email:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-signal underline">
            {CONTACT_EMAIL}
          </a>
          . LinkedIn:{' '}
          <a href={LINKEDIN_URL} className="text-signal underline">
            {LINKEDIN_URL}
          </a>
          . Book a 15-minute intro:{' '}
          <a href={BOOKING_URL} className="text-signal underline">
            {BOOKING_URL}
          </a>
          . Location: {NAP.addressLocality}, {NAP.addressRegion}, {NAP.addressCountry}.
          There is no published phone number.
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
