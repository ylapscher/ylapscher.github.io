'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Experience } from '../data/home-data';
import { monoStyles } from '../lib/typography';

/** Shared card markup for one experience entry, used by both the animated
 *  and reduced-motion renderings of the timeline. */
function ExperienceCard({ experience }: { experience: Experience }) {
  const isClickable = Boolean(experience.link);
  const ContentWrapper = isClickable ? 'a' : 'div';
  const contentProps = isClickable
    ? { href: experience.link, target: '_blank', rel: 'noopener noreferrer', className: 'block' }
    : {};

  return (
    <ContentWrapper {...contentProps}>
      <div
        className={`min-h-[280px] sm:min-h-[260px] flex flex-col justify-center bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isClickable ? 'hover:-translate-y-1 hover:shadow-2xl hover:border-signal cursor-pointer group' : ''
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {experience.image && (
              <div className="flex-shrink-0 w-12 h-12">
                <Image
                  src={experience.image.src}
                  alt={experience.image.alt}
                  width={48}
                  height={48}
                  className="rounded object-cover"
                />
              </div>
            )}
            <div>
              <p className={`${monoStyles.eyebrow} mb-1`}>{experience.duration}</p>
              <h3
                className={`font-bold text-lg mb-1 text-gray-900 dark:text-white ${
                  isClickable ? 'group-hover:text-signal transition-colors' : ''
                }`}
              >
                {experience.role}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm">{experience.company}</p>
            </div>
          </div>
          <div className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
            {experience.achievements[0]}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

/** One pinned "slide" of the scroll-stack: sticks in place while its own tall
 *  wrapper scrolls past, so the next card in document order slides up and
 *  visually replaces it. Fades in once (never back out, so it can't end up
 *  transparent while pinned) and reports first entry so the year spine can
 *  track progress down the list. */
function TimelineSlide({
  experience,
  index,
  onActive,
}: {
  experience: Experience;
  index: number;
  onActive: (index: number) => void;
}) {
  return (
    <div className="h-[62vh] sm:h-[68vh] md:h-[72vh] sticky top-16 sm:top-20 flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => onActive(index)}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <ExperienceCard experience={experience} />
      </motion.div>
    </div>
  );
}

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Motion/scroll-jacking off by request or preference: fall back to a
  // plain stacked list so the section stays fully readable and navigable.
  if (prefersReducedMotion) {
    return (
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative md:grid md:grid-cols-[auto_1fr] md:gap-10">
      {/* Year spine: tracks which card is currently pinned in the stack. */}
      <div className="hidden md:flex flex-col items-center sticky top-16 self-start h-[72vh] justify-center gap-1 py-4">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-rule" aria-hidden="true" />
        {experiences.map((experience, index) => {
          const isActive = index === activeIndex;
          return (
            <span
              key={experience.duration + experience.company}
              className={`relative z-[1] ${monoStyles.data} block text-center px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'text-signal-ink bg-signal text-sm font-bold scale-110'
                  : 'text-muted bg-paper text-xs'
              }`}
            >
              {experience.duration.split(' - ')[0]}
            </span>
          );
        })}
      </div>

      {/* Mobile year marker for the active card, since the spine is hidden. */}
      <div className="md:hidden sticky top-16 z-[2] flex justify-center pb-3">
        <span className={`${monoStyles.data} text-sm font-bold text-signal-ink bg-signal px-3 py-1 rounded-full shadow`}>
          {experiences[activeIndex]?.duration}
        </span>
      </div>

      <div>
        {experiences.map((experience, index) => (
          <TimelineSlide key={index} experience={experience} index={index} onActive={setActiveIndex} />
        ))}
      </div>
    </div>
  );
}
