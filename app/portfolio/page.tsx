import type { Metadata } from 'next';
import Link from 'next/link';
import BrowserFrame from '../components/BrowserFrame';
import { projects } from '../data/projects-data';
import { monoStyles } from '../lib/typography';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: "Websites I've shipped for real people with real deadlines.",
  alternates: {
    canonical: '/portfolio',
    types: { 'text/markdown': '/portfolio.md' },
  },
};

export default function Portfolio() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Portfolio</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          Websites I&apos;ve shipped for real people with real deadlines.
        </p>
      </div>

      <section>
        <h2 className="sr-only">Shipped websites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={`/portfolio/${project.slug}`}
            aria-label={`View ${project.title} project details`}
            className="group block ring-1 ring-rule-hi bg-white dark:bg-gray-800 overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:ring-signal"
          >
            <BrowserFrame
              src={project.thumbnail}
              alt={`${project.title} preview`}
              url={project.url}
              color={project.color}
              icon={project.icon}
              hoverScroll
            />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {project.category && (
                  <span className={monoStyles.eyebrow}>{project.category}</span>
                )}
                {project.timeline && (
                  <span className={`${monoStyles.data} text-xs text-muted`}>{project.timeline}</span>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-signal transition-colors">
                  {project.title}
                </h3>
                <span className="text-signal text-sm font-medium">→</span>
              </div>
              <p className="text-sm font-mono text-signal mb-3">{project.outcomeHook}</p>
              <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>
              {project.stack && (
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`${monoStyles.label} text-muted border border-rule px-1.5 py-0.5`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      </section>
    </main>
  );
}
