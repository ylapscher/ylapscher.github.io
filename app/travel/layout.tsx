import type { Metadata } from 'next';
import { SITE_URL } from '../lib/site';

/**
 * app/travel/page.tsx is a client component (react-simple-maps needs the
 * browser), so it cannot export metadata itself. This layout carries it.
 */
export const metadata: Metadata = {
  title: 'Travel map',
  description:
    "An interactive map of the countries and US states Joe Lapscher has visited and lived in, from Venezuela to New Jersey.",
  alternates: { canonical: '/travel' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Joe Lapscher',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Travel map',
      item: `${SITE_URL}/travel`,
    },
  ],
};

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
