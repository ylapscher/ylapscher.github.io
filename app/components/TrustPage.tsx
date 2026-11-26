import type { ReactNode } from 'react';
import PageHeader from './PageHeader';

export default function TrustPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <PageHeader eyebrow={`§ ${title}`} title={title}>
        {lead}
      </PageHeader>
      <div className="space-y-6 text-muted leading-relaxed">{children}</div>
    </main>
  );
}
