'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Project } from '../../data/projects-data';

type SectionKey = 
  | 'contextAndProblem'
  | 'constraintsAndStakes'
  | 'discoveryAndInsight'
  | 'optionsTradeoffsAndDecisions'
  | 'solutionAndExecution'
  | 'outcomesMetricsAndEvidence'
  | 'reflectionAndLessonsLearned';

const sections: { key: SectionKey; label: string }[] = [
  { key: 'contextAndProblem', label: 'Context & Problem' },
  { key: 'constraintsAndStakes', label: 'Constraints & Stakes' },
  { key: 'discoveryAndInsight', label: 'Discovery & Insight' },
  { key: 'optionsTradeoffsAndDecisions', label: 'Options, Tradeoffs, and Decisions' },
  { key: 'solutionAndExecution', label: 'Solution & Execution' },
  { key: 'outcomesMetricsAndEvidence', label: 'Outcomes, Metrics, and Evidence' },
  { key: 'reflectionAndLessonsLearned', label: 'Reflection & Lessons Learned' },
];

function CollapsibleSection({ 
  title, 
  content, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  content: string; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-white dark:bg-gray-900">
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

type ProjectContentProps = {
  project: Project;
  nextProject: Project | null;
  previousProject: Project | null;
};

export default function ProjectContent({ project, nextProject, previousProject }: ProjectContentProps) {
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set(['contextAndProblem']));

  const toggleSection = (key: SectionKey) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      {/* Back to Portfolio Link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>

      {/* Project Header */}
      <div className="mb-12">
        <div className={`w-full h-48 ${project.color} rounded-xl flex items-center justify-center mb-8`}>
          <span className="text-8xl opacity-90">{project.icon}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {project.title}
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Visit Site Button */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Visit Site
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4 mb-12">
        {sections.map(({ key, label }) => (
          <CollapsibleSection
            key={key}
            title={label}
            content={project[key]}
            isOpen={openSections.has(key)}
            onToggle={() => toggleSection(key)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Previous Project */}
          {previousProject && (
            <Link
              href={`/portfolio/${previousProject.slug}`}
              className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full sm:w-auto"
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

          {/* Back to Portfolio (center) */}
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            View All Projects
          </Link>

          {/* Next Project */}
          {nextProject && (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full sm:w-auto justify-end"
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

