import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { breadcrumbList } from '../lib/structured-data';

/**
 * app/travel/page.tsx is a client component (react-simple-maps needs the
 * browser), so it cannot export metadata itself. This layout carries it.
 */
export const metadata: Metadata = {
  title: 'Travel map',
  description:
    "An interactive map of the countries and US states Joe Lapscher has visited and lived in, from Venezuela to New Jersey.",
  alternates: {
    canonical: '/travel',
    types: { 'text/markdown': '/travel.md' },
  },
};

const structuredData = breadcrumbList([
  { name: SITE_NAME, url: SITE_URL },
  { name: 'Travel map', url: `${SITE_URL}/travel` },
]);

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
