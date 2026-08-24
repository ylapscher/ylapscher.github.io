/**
 * Maps a request pathname to the static markdown file that represents it.
 * Used by the Netlify edge negotiator and by tests.
 */

import { projects } from '../data/projects-data';

const STATIC_MARKDOWN_PAGES: Readonly<Record<string, string>> = {
  '/': '/index.md',
  '/about': '/about.md',
  '/contact': '/contact.md',
  '/privacy': '/privacy.md',
  '/services': '/services.md',
  '/services/guidance': '/services/guidance.md',
  '/portfolio': '/portfolio.md',
  '/hobbies': '/hobbies.md',
  '/travel': '/travel.md',
};

const PROJECT_MARKDOWN_PAGES = Object.fromEntries(
  projects.map((project) => [`/portfolio/${project.slug}`, `/portfolio/${project.slug}.md`])
) as Readonly<Record<string, string>>;

export const MARKDOWN_PAGES: Readonly<Record<string, string>> = {
  ...STATIC_MARKDOWN_PAGES,
  ...PROJECT_MARKDOWN_PAGES,
};

export const AGENT_INDEX_PATHS = ['/llms.txt', '/sitemap.xml'] as const;

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  const noQuery = pathname.split('?')[0].split('#')[0];
  if (noQuery === '' || noQuery === '/') return '/';
  return noQuery.replace(/\/+$/, '') || '/';
}

/** Static markdown asset for a page, or null if the path is not a known page. */
export function markdownAssetForPath(pathname: string): string | null {
  const path = normalizePathname(pathname);
  if (path.endsWith('.md') || path === '/llms.txt' || path === '/404.md') {
    return path.startsWith('/') ? path : `/${path}`;
  }
  return MARKDOWN_PAGES[path] ?? null;
}
