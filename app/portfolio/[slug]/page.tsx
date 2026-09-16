import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getNextProject, getPreviousProject } from '../../data/projects-data';
import JsonLd from '../../components/JsonLd';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { breadcrumbList } from '../../lib/structured-data';
import ProjectContent from './ProjectContent';

type Props = {
  params: Promise<{ slug: string }>;
};

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

  const ogImage = `${SITE_URL}${project.heroImage}`;

  return {
    title: project.title,
    description: truncate(project.description),
    alternates: {
      canonical: `/portfolio/${project.slug}`,
      types: { 'text/markdown': `/portfolio/${project.slug}.md` },
    },
    openGraph: {
      title: `${project.title} — Joe Lapscher`,
      description: truncate(project.description),
      url: `/portfolio/${project.slug}`,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1440,
          height: 900,
          alt: `${project.title} preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Joe Lapscher`,
      description: truncate(project.description),
      images: [ogImage],
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
    <>
      <JsonLd
        data={breadcrumbList([
          { name: SITE_NAME, url: SITE_URL },
          { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
          { name: project.title, url: `${SITE_URL}/portfolio/${project.slug}` },
        ])}
      />
      <ProjectContent
        project={project}
        nextProject={nextProject}
        previousProject={previousProject}
      />
    </>
  );
}
