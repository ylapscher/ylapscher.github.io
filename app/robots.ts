import type { MetadataRoute } from 'next';

import { SITE_URL } from './lib/site';

/**
 * Prerendered at build time, so it survives `output: 'export'` and lands in
 * out/robots.txt for the Pages deploy.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
