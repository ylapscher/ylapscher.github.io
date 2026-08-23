'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CollapsibleSection from './CollapsibleSection';
import type { Initiative, Skill } from '../data/home-data';
import { textStyles, monoStyles } from '../lib/typography';

type NotebookTabId = 'volunteering' | 'education' | 'skills';

const notebookTabs: ReadonlyArray<{ id: NotebookTabId; label: string }> = [
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
];

/** Proficiency shows as a 4-segment bar next to the name, always visible --
 *  the old version only revealed the level on hover, which meant nothing
 *  was legible on touch devices and the whole grid read as identical pills. */
function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{skill.name}</span>
      <div className="flex items-center gap-1 shrink-0" role="img" aria-label={`Proficiency: ${skill.level} of 4`}>
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            aria-hidden="true"
            className={`h-1.5 w-4 rounded-full ${
              segment <= skill.level ? 'bg-signal' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function VolunteeringPanel({ initiatives }: { initiatives: Initiative[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {initiatives.map((initiative, index) => (
        <a
          key={index}
          href={initiative.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-signal"
        >
          {initiative.image && (
            <div className="h-32 sm:h-40 relative">
              <Image
                src={initiative.image.src}
                alt={initiative.image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-signal transition-colors">
              {initiative.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
              {initiative.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

function EducationPanel() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-16 h-16">
          <Image
            src="/images/companies/uf.png"
            alt="University of Florida Logo"
            width={64}
            height={64}
            className="rounded object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">University of Florida</h3>
          <p className="text-gray-700 dark:text-gray-400 text-sm">Gainesville, FL</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">MS, Information Systems & Operations Mgmt</h4>
          <div className="mt-2">
            <CollapsibleSection title="Teaching Assistant" size="small" defaultOpen={false}>
              <ul className="text-gray-700 dark:text-gray-400 text-sm mt-1 space-y-1">
                <li>• Managerial Quantitative Analysis I & II</li>
                <li>• Retail Consulting</li>
                <li>• Intro to Managerial Statistics</li>
              </ul>
            </CollapsibleSection>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">BS, Industrial & Systems Engineering</h4>
        </div>
      </div>
    </div>
  );
}

function SkillsPanel({ skills }: { skills: Skill[] }) {
  const skillsByCategory = Object.entries(
    skills.reduce(
      (acc, skill) => ({
        ...acc,
        [skill.category]: [...(acc[skill.category] || []), skill].sort((a, b) => b.level - a.level),
      }),
      {} as Record<string, Skill[]>
    )
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {skillsByCategory.map(([category, categorySkills]) => (
        <div
          key={category}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
        >
          <h3 className={`${textStyles.sectionHeading} mb-4 text-gray-900 dark:text-white`}>{category}</h3>
          <div className="flex flex-col gap-2">
            {categorySkills.map((skill) => (
              <SkillBadge key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The old layout stacked three accordions -- Volunteering, Education,
 * Skills -- collapsed by default, so a visitor saw three empty-looking
 * grey bars. A tab bar surfaces one section at a time with actual content
 * visible immediately, styled off the same mono-label / signal-underline
 * language as the nav's active link.
 *
 * Inactive panels stay in the document (hidden, not unmounted) so
 * no-JS crawlers still see education and skills in the raw HTML.
 */
export default function NotebookTabs({ initiatives, skills }: { initiatives: Initiative[]; skills: Skill[] }) {
  const [activeTab, setActiveTab] = useState<NotebookTabId>('volunteering');

  return (
    <div>
      <div role="tablist" aria-label="Volunteering, education, and skills" className="flex gap-6 sm:gap-8 border-b border-rule mb-8 sm:mb-10 overflow-x-auto">
        {notebookTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`notebook-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`notebook-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 pb-3 ${monoStyles.label} transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="notebook-tab-underline"
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-signal"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {notebookTabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <div
            key={tab.id}
            id={`notebook-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`notebook-tab-${tab.id}`}
            hidden={!isActive}
          >
            {isActive ? (
              <AnimatePresence initial={false}>
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {tab.id === 'volunteering' && <VolunteeringPanel initiatives={initiatives} />}
                  {tab.id === 'education' && <EducationPanel />}
                  {tab.id === 'skills' && <SkillsPanel skills={skills} />}
                </motion.div>
              </AnimatePresence>
            ) : (
              <>
                {tab.id === 'volunteering' && <VolunteeringPanel initiatives={initiatives} />}
                {tab.id === 'education' && <EducationPanel />}
                {tab.id === 'skills' && <SkillsPanel skills={skills} />}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
