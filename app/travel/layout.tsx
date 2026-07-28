import type { Metadata } from 'next';

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

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
