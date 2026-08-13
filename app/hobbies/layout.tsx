import type { Metadata } from 'next';

/** app/hobbies/page.tsx renders client subcomponents, so metadata lives here. */
export const metadata: Metadata = {
  title: 'Hobbies',
  description:
    'Outside of work: rock climbing, hot yoga, jazz piano, and improv comedy with Joe Lapscher.',
  alternates: { canonical: '/hobbies' },
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
