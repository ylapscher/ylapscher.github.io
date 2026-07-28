import type { MetadataRoute } from 'next';

import { projects } from './data/projects-data';
import { SITE_URL } from './lib/site';

/** See app/robots.ts -- required for `output: 'export'`. */
export const dynamic = 'force-static';

/**
 * Static routes, highest priority first. Project detail pages are appended
 * from `projects` so this never drifts out of sync with the portfolio.
 */
const routes: ReadonlyArray<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}> = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/guidance', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/hobbies', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/travel', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
