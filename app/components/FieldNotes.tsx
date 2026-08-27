import Image from 'next/image';
import type { Initiative, Skill } from '../data/home-data';
import { textStyles, monoStyles } from '../lib/typography';

/** Proficiency as a 4-segment mark next to the name -- always visible, so
 *  it stays legible on touch. Hard-edged ticks, same language as the hero rail. */
function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-sm text-ink leading-snug">{skill.name}</span>
      <div className="flex items-center gap-0.5 shrink-0" role="img" aria-label={`Proficiency: ${skill.level} of 4`}>
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            aria-hidden="true"
            className={`h-1 w-3.5 ${
              segment <= skill.level ? 'bg-signal' : 'bg-rule-hi'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Education reads as a title-block on an engineering drawing -- school in
 * the left cell, each degree in its own ruled column -- so it can sit
 * full-width under the volunteering plate instead of floating as a card.
 */
const education = {
  school: 'University of Florida',
  location: 'Gainesville, FL',
  logo: {
    src: '/images/companies/uf.png',
    alt: 'University of Florida',
  },
  degrees: [
    {
      credential: 'Master of Science',
      field: 'Information Systems & Operations Mgmt',
      detail:
        'Teaching assistant — Managerial Quantitative Analysis I & II, Retail Consulting, Intro to Managerial Statistics',
    },
    {
      credential: 'Bachelor of Science',
      field: 'Industrial & Systems Engineering',
    },
  ],
} as const;

/**
 * Tabs and collapsed accordions both hid this content. The page already
 * speaks in plates and measurement rails, so this section is a third spread
 * of the same notebook: one full-bleed figure for volunteering, a title-block
 * for school, and a spec sheet for skills. Everything is visible at once --
 * including to no-JS crawlers, which is why this is a server component
 * rather than a tab bar with hidden panels.
 */
export default function FieldNotes({
  initiatives = [],
  skills,
}: {
  initiatives?: Initiative[];
  skills: Skill[];
}) {
  const [featured, ...rest] = initiatives;

  const skillsByCategory = Object.entries(
    skills.reduce(
      (acc, skill) => ({
        ...acc,
        [skill.category]: [...(acc[skill.category] || []), skill].sort((a, b) => b.level - a.level),
      }),
      {} as Record<string, Skill[]>
    )
  );

  const languageSkills = skillsByCategory.find(([category]) => category === 'Languages');
  const coreSkills = skillsByCategory.filter(([category]) => category !== 'Languages');

  return (
    <div>
      <h2 className={`${textStyles.h2} text-ink`}>Field notes</h2>
      <p className="mt-3 max-w-[46ch] text-muted text-base leading-relaxed">
        The jobs are the long column. School and the tools underneath are the rest.
      </p>

      {featured && (
        <a
          href={featured.link}
          target="_blank"
          rel="noopener noreferrer"
          id="volunteering"
          className="group mt-10 block scroll-mt-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
        >
          <figure>
            {featured.image && (
              <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden ring-1 ring-rule-hi bg-ink/5">
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <span
                  className={`absolute left-0 bottom-0 ${monoStyles.eyebrow} bg-paper text-ink px-2.5 py-1.5 ring-1 ring-rule-hi`}
                >
                  Fig. 01
                </span>
              </div>
            )}
            <figcaption className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-8 sm:items-start border-t border-rule pt-5">
              <div>
                <p className={monoStyles.eyebrow}>01 — Volunteering</p>
                <h3 className="mt-2 font-bold text-xl sm:text-2xl text-ink tracking-claim group-hover:text-signal transition-colors">
                  {featured.title}{' '}
                  <span aria-hidden="true" className="text-signal">
                    &#8599;
                  </span>
                </h3>
              </div>
              <p className="text-muted text-sm sm:text-[0.95rem] leading-relaxed sm:pt-7">
                {featured.description}
              </p>
            </figcaption>
          </figure>
        </a>
      )}

      {rest.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((initiative) => (
            <li key={initiative.title}>
              <a
                href={initiative.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              >
                {initiative.image && (
                  <div className="relative aspect-[16/10] overflow-hidden ring-1 ring-rule-hi bg-ink/5">
                    <Image
                      src={initiative.image.src}
                      alt={initiative.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 448px"
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <h3 className="mt-3 font-bold text-ink group-hover:text-signal transition-colors">
                  {initiative.title}{' '}
                  <span aria-hidden="true" className="text-signal">
                    &#8599;
                  </span>
                </h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{initiative.description}</p>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div id="education" className="mt-14 sm:mt-16 border-t border-rule scroll-mt-20">
        <p className={`${monoStyles.eyebrow} pt-5`}>02 — Education</p>
        <div className="mt-5 flex flex-col md:flex-row md:items-stretch">
          <div className="flex items-start gap-3 pb-6 md:pb-0 md:pr-8 md:w-56 shrink-0">
            <div className="relative w-11 h-11 shrink-0 ring-1 ring-rule-hi overflow-hidden bg-paper">
              <Image
                src={education.logo.src}
                alt={education.logo.alt}
                width={44}
                height={44}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-ink leading-tight">{education.school}</h3>
              <p className={`${monoStyles.eyebrow} mt-1`}>{education.location}</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 border-t md:border-t-0 md:border-l border-rule">
            {education.degrees.map((degree) => (
              <div
                key={degree.credential}
                className="py-5 md:py-0 sm:px-6 md:pl-8 border-t border-rule first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0 sm:first:pl-0 md:first:pl-8"
              >
                <p className={monoStyles.eyebrow}>{degree.credential}</p>
                <p className="mt-2 font-medium text-ink leading-snug">{degree.field}</p>
                {'detail' in degree && degree.detail && (
                  <p className="mt-2 text-sm text-muted leading-relaxed">{degree.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="skills" className="mt-12 sm:mt-14 border-t border-rule pt-5 scroll-mt-20">
        <p className={monoStyles.eyebrow}>03 — Skills</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {coreSkills.map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className={`${monoStyles.label} text-ink pb-2 border-b border-rule`}>{category}</h3>
              <div className="mt-1">
                {categorySkills.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {languageSkills && (
          <div className="mt-8 pt-5 border-t border-rule flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <h3 className={`${monoStyles.label} text-ink shrink-0`}>{languageSkills[0]}</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-1 flex-1">
              {languageSkills[1].map((skill) => (
                <div key={skill.name} className="min-w-[10rem] flex-1">
                  <SkillRow skill={skill} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
