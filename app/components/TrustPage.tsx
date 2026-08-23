import type { ReactNode } from 'react';

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
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-400 mb-10">{lead}</p>
      <div className="space-y-6 text-gray-700 dark:text-gray-400 leading-relaxed">{children}</div>
    </main>
  );
}
