'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../data/projects-data';
import { monoStyles } from '../lib/typography';

type SectionKey =
  | 'contextAndProblem'
  | 'constraintsAndStakes'
  | 'discoveryAndInsight'
  | 'optionsTradeoffsAndDecisions'
  | 'solutionAndExecution'
  | 'outcomesMetricsAndEvidence'
  | 'reflectionAndLessonsLearned';

const sections: { key: SectionKey; label: string; shortLabel: string }[] = [
  { key: 'contextAndProblem', label: 'Context & Problem', shortLabel: 'Context' },
  { key: 'constraintsAndStakes', label: 'Constraints & Stakes', shortLabel: 'Constraints' },
  { key: 'discoveryAndInsight', label: 'Discovery & Insight', shortLabel: 'Discovery' },
  { key: 'optionsTradeoffsAndDecisions', label: 'Options, Tradeoffs, and Decisions', shortLabel: 'Tradeoffs' },
  { key: 'solutionAndExecution', label: 'Solution & Execution', shortLabel: 'Solution' },
  { key: 'outcomesMetricsAndEvidence', label: 'Outcomes, Metrics, and Evidence', shortLabel: 'Outcomes' },
  { key: 'reflectionAndLessonsLearned', label: 'Reflection & Lessons Learned', shortLabel: 'Reflection' },
];

function SectionCard({ label, content }: { label: string; content: string }) {
  return (
    <div className="min-h-[240px] sm:min-h-[220px] flex flex-col justify-center bg-white dark:bg-gray-800 p-6 sm:p-8 ring-1 ring-rule-hi">
      <p className={`${monoStyles.eyebrow} mb-3 text-signal`}>Case study</p>
      <h3 className="font-bold text-lg sm:text-xl mb-4 text-gray-900 dark:text-white">{label}</h3>
      <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-base leading-relaxed">{content}</p>
    </div>
  );
}

function StorySlide({
  label,
  content,
  index,
  onActive,
}: {
  label: string;
  content: string;
  index: number;
  onActive: (index: number) => void;
}) {
  return (
    <div className="h-[58vh] sm:h-[62vh] md:h-[66vh] sticky top-16 sm:top-20 flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => onActive(index)}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <SectionCard label={label} content={content} />
      </motion.div>
    </div>
  );
}

type ProjectStoryTimelineProps = {
  project: Project;
};

export default function ProjectStoryTimeline({ project }: ProjectStoryTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="space-y-6">
        {sections.map(({ key, label }) => (
          <SectionCard key={key} label={label} content={project[key]} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative md:grid md:grid-cols-[auto_1fr] md:gap-10">
      <div className="hidden md:flex flex-col items-center sticky top-16 self-start h-[66vh] justify-center gap-1 py-4">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-rule" aria-hidden="true" />
        {sections.map(({ shortLabel }, index) => {
          const isActive = index === activeIndex;
          return (
            <span
              key={shortLabel}
              className={`relative z-[1] ${monoStyles.label} block text-center px-2 py-1 transition-all duration-300 ${
                isActive ? 'text-signal-ink bg-signal scale-105' : 'text-muted bg-paper'
              }`}
            >
              {shortLabel}
            </span>
          );
        })}
      </div>

      <div className="md:hidden sticky top-16 z-[2] flex justify-center pb-3">
        <span className={`${monoStyles.label} text-signal-ink bg-signal px-3 py-1 shadow`}>
          {sections[activeIndex]?.shortLabel}
        </span>
      </div>

      <div>
        {sections.map(({ key, label }, index) => (
          <StorySlide
            key={key}
            label={label}
            content={project[key]}
            index={index}
            onActive={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
}
