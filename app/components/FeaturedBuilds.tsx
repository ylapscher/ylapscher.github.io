import Link from 'next/link';
import BrowserFrame from './BrowserFrame';
import type { Project } from '../data/projects-data';
import { monoStyles } from '../lib/typography';

type FeaturedBuildsProps = {
  projects: Project[];
};

export default function FeaturedBuilds({ projects }: FeaturedBuildsProps) {
  if (projects.length === 0) return null;

  const [primary, secondary, tertiary, quaternary] = projects;

  return (
    <section id="selected-builds" className="mb-12 sm:mb-16 md:mb-20 scroll-mt-20">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className={monoStyles.eyebrow}>Selected builds</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
            Shipped websites
          </h2>
        </div>
        <Link
          href="/portfolio"
          className={`${monoStyles.label} text-ink border-b border-rule-hi pb-0.5 hover:border-signal hover:text-signal transition-colors shrink-0`}
        >
          View all &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        {primary && (
          <FeaturedCard project={primary} className="md:col-span-2 md:row-span-2" large />
        )}
        {secondary && <FeaturedCard project={secondary} />}
        {tertiary && <FeaturedCard project={tertiary} />}
        {quaternary && (
          <FeaturedCard project={quaternary} className="md:col-span-1" />
        )}
      </div>
    </section>
  );
}

function FeaturedCard({
  project,
  className = '',
  large = false,
}: {
  project: Project;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group block ring-1 ring-rule-hi bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:ring-signal hover:-translate-y-0.5 ${className}`}
    >
      <BrowserFrame
        src={project.thumbnail}
        alt={`${project.title} preview`}
        url={project.url}
        color={project.color}
        icon={project.icon}
        hoverScroll
      />
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {project.category && (
            <span className={monoStyles.eyebrow}>{project.category}</span>
          )}
          {project.timeline && (
            <span className={`${monoStyles.data} text-xs text-muted`}>{project.timeline}</span>
          )}
        </div>
        <h3
          className={`font-bold text-gray-900 dark:text-white group-hover:text-signal transition-colors ${
            large ? 'text-xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-signal font-mono">{project.outcomeHook}</p>
        {!large && (
          <p className="mt-2 text-sm text-muted line-clamp-2">{project.description}</p>
        )}
        {project.stack && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className={`${monoStyles.label} text-muted border border-rule px-1.5 py-0.5`}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
