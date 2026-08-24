'use client';

import Link from 'next/link';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import BrowserFrame from '../../components/BrowserFrame';
import ImageGallery from '../../components/ImageGallery';
import ProjectMetaChips from '../../components/ProjectMetaChips';
import ProjectMetricsStrip from '../../components/ProjectMetricsStrip';
import ProjectStoryTimeline from '../../components/ProjectStoryTimeline';
import type { Project } from '../../data/projects-data';
import { monoStyles } from '../../lib/typography';

type ProjectContentProps = {
  project: Project;
  nextProject: Project | null;
  previousProject: Project | null;
};

export default function ProjectContent({ project, nextProject, previousProject }: ProjectContentProps) {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <Link
        href="/portfolio"
        className="inline-flex items-center text-signal hover:brightness-110 mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>

      <div className="mb-10">
        <BrowserFrame
          src={project.heroImage}
          alt={`${project.title} homepage`}
          url={project.url}
          color={project.color}
          icon={project.icon}
          size="hero"
        />

        <h1 className="text-4xl font-bold mt-8 mb-3 text-gray-900 dark:text-white">{project.title}</h1>
        <p className={`${monoStyles.eyebrow} text-signal mb-4`}>{project.outcomeHook}</p>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-6 leading-relaxed">{project.description}</p>

        <ProjectMetaChips project={project} />

        {project.metrics && <ProjectMetricsStrip metrics={project.metrics} />}

        <div className="flex flex-wrap gap-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-signal text-signal-ink font-semibold py-3 px-6 hover:brightness-110 transition-colors"
          >
            Visit Site
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {project.beforeAfter && (
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Transformation</h2>
          <p className={`${monoStyles.eyebrow} mb-6`}>Before and after</p>
          <BeforeAfterSlider
            before={project.beforeAfter.before}
            after={project.beforeAfter.after}
            beforeLabel={project.beforeAfter.beforeLabel}
            afterLabel={project.beforeAfter.afterLabel}
            alt={`${project.title} before and after comparison`}
          />
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Screens</h2>
          <p className={`${monoStyles.eyebrow} mb-6`}>Desktop and mobile views</p>
          <ImageGallery images={project.gallery} showDeviceToggle autoAdvanceMs={0} />
        </section>
      )}

      {project.embedUrl && (
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Try it live</h2>
          <p className={`${monoStyles.eyebrow} mb-6`}>Interactive preview</p>
          <div className="ring-1 ring-rule-hi overflow-hidden bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-rule bg-paper dark:bg-gray-800">
              <span className={`${monoStyles.label} text-muted truncate`}>{project.embedUrl}</span>
            </div>
            <iframe
              src={project.embedUrl}
              title={`${project.title} live demo`}
              className="w-full aspect-[16/10] border-0 bg-gray-100"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </section>
      )}

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Case study</h2>
        <p className={`${monoStyles.eyebrow} mb-8`}>Scroll through the story</p>
        <ProjectStoryTimeline project={project} />
      </section>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {previousProject && (
            <Link
              href={`/portfolio/${previousProject.slug}`}
              className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-signal transition-colors w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-500">Previous</span>
                <span className="block font-medium">{previousProject.title}</span>
              </div>
            </Link>
          )}

          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-signal hover:text-signal transition-colors"
          >
            View All Projects
          </Link>

          {nextProject && (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-signal transition-colors w-full sm:w-auto justify-end"
            >
              <div className="text-right">
                <span className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-500">Next</span>
                <span className="block font-medium">{nextProject.title}</span>
              </div>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
