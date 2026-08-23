/**
 * Writes public/*.md and public/llms.txt from app/lib/agent-content.ts.
 * Invoked as `prebuild` via tsx so extensionless TypeScript imports resolve.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { projects } from '../app/data/projects-data';
import {
  buildAboutMarkdown,
  buildContactMarkdown,
  buildGuidanceMarkdown,
  buildHobbiesMarkdown,
  buildHomeMarkdown,
  buildLlmsTxt,
  buildPortfolioMarkdown,
  buildPrivacyMarkdown,
  buildProjectMarkdown,
  buildServicesMarkdown,
  buildTravelMarkdown,
} from '../app/lib/agent-content';
import { notFoundMarkdown } from '../app/lib/structured-data';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

function write(rel: string, body: string) {
  const path = join(pub, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, body.endsWith('\n') ? body : `${body}\n`);
}

write('llms.txt', buildLlmsTxt());
write('index.md', buildHomeMarkdown());
write('about.md', buildAboutMarkdown());
write('contact.md', buildContactMarkdown());
write('privacy.md', buildPrivacyMarkdown());
write('services.md', buildServicesMarkdown());
write('services/guidance.md', buildGuidanceMarkdown());
write('portfolio.md', buildPortfolioMarkdown());
write('hobbies.md', buildHobbiesMarkdown());
write('travel.md', buildTravelMarkdown());
write('404.md', notFoundMarkdown);

for (const project of projects) {
  const markdown = buildProjectMarkdown(project.slug);
  if (markdown) write(`portfolio/${project.slug}.md`, markdown);
}
