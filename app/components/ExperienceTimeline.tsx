import Image from 'next/image';
import type { Experience } from '../data/home-data';
import { monoStyles } from '../lib/typography';

/**
 * Experience as a ledger: one ruled row per role, the dates in a mono
 * column on the left, the role on the right. It replaced a scroll-pinned
 * card stack that spent ~650px of scroll per role and hid cards until they
 * animated in. Flat paper + hairline rules, the same language as the hero
 * rail and Field Notes, so it needs no motion and renders on the server.
 *
 * Logos sit in greyscale so eight brand palettes don't fight the signal
 * orange; they pick their colour back up on hover.
 */
function ExperienceRow({ experience, current }: { experience: Experience; current: boolean }) {
  const isClickable = Boolean(experience.link);
  const Wrapper = isClickable ? 'a' : 'div';
  const wrapperProps = isClickable
    ? { href: experience.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <li className="group relative border-t border-rule first:border-t-0">
      <Wrapper
        {...wrapperProps}
        className={`grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] gap-x-8 gap-y-3 py-7 sm:py-8 ${
          isClickable
            ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'
            : ''
        }`}
      >
        <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
          <span
            aria-hidden="true"
            className={`hidden sm:block h-0.5 w-6 ${current ? 'bg-signal' : 'bg-tick'}`}
          />
          <span className={`${monoStyles.data} text-[11px] uppercase tracking-util whitespace-nowrap ${current ? 'text-signal' : 'text-muted'}`}>
            {experience.duration}
          </span>
        </div>

        <div className="flex gap-4">
          {experience.image && (
            <div className="flex-shrink-0 w-10 h-10 border border-rule bg-paper p-1">
              <Image
                src={experience.image.src}
                alt={experience.image.alt}
                width={40}
                height={40}
                className="w-full h-full object-contain grayscale opacity-75 transition duration-300
                           group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          )}
          <div className="min-w-0">
            <h3
              className={`font-bold text-lg leading-tight text-ink ${
                isClickable ? 'group-hover:text-signal transition-colors' : ''
              }`}
            >
              {experience.role}
            </h3>
            <p className={`${monoStyles.label} text-muted mt-1.5`}>{experience.company}</p>
            <p className="mt-3 text-muted text-sm sm:text-[0.95rem] leading-relaxed max-w-[60ch]">
              {experience.achievements[0]}
            </p>
          </div>
        </div>
      </Wrapper>
    </li>
  );
}

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <ol className="border-y border-rule-hi">
      {experiences.map((experience, index) => (
        <ExperienceRow
          key={experience.duration + experience.company}
          experience={experience}
          current={index === 0 && /present/i.test(experience.duration)}
        />
      ))}
    </ol>
  );
}
