import type { Metadata } from 'next';

/** app/hobbies/page.tsx renders client subcomponents, so metadata lives here. */
export const metadata: Metadata = {
  title: 'Hobbies',
  description:
    'Off the clock: climbing, hot yoga, jazz piano, improv, and cutting hair.',
  alternates: {
    canonical: '/hobbies',
    types: { 'text/markdown': '/hobbies.md' },
  },
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
