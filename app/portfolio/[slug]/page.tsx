import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getNextProject, getPreviousProject } from '../../data/projects-data';
import ProjectContent from './ProjectContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found — Joe Lapscher',
    };
  }

  return {
    title: `${project.title} — Joe Lapscher Portfolio`,
    description: project.description,
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
