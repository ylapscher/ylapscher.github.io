import type { Metadata } from 'next';

/** app/hobbies/page.tsx is a client component, so metadata lives here. */
export const metadata: Metadata = {
  title: 'Hobbies',
  description:
    'Rock climbing, hot yoga, jazz piano, improv comedy and cutting hair — what Joe Lapscher does outside of work.',
  alternates: { canonical: '/hobbies' },
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
