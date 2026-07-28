import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getNextProject, getPreviousProject } from '../../data/projects-data';
import ProjectContent from './ProjectContent';

type Props = {
  params: Promise<{ slug: string }>;
};

/** Trim to the last whole word inside `max` so SERP snippets read cleanly. */
function truncate(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.]$/, '')}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project not found',
      robots: { index: false, follow: true },
    };
  }

  return {
    // The root layout's title template appends the wordmark.
    title: project.title,
    description: truncate(project.description),
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} — Joe Lapscher`,
      description: truncate(project.description),
      url: `/portfolio/${project.slug}`,
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  const previousProject = getPreviousProject(slug);

  return (
    <ProjectContent 
      project={project} 
      nextProject={nextProject} 
      previousProject={previousProject} 
    />
  );
}
