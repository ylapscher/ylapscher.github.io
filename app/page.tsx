'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CollapsibleSection from './components/CollapsibleSection';
import { textStyles, monoStyles } from './lib/typography';

/** Also opened by the Navbar's Résumé button. */
const RESUME_URL =
  'https://drive.google.com/file/d/1EqxPiOXn3-ao_I5GsP--dh6qYyzUFGsG/view';

/**
 * The hero's measurement rail. This is the real chronology, not decoration --
 * it puts the eight-role arc above the fold, where the Experience accordion
 * below currently hides it behind `defaultOpen={false}`.
 *
 * Company names only: at eight stops across the container each label gets
 * roughly 137px, so anything longer truncates.
 */
const career: ReadonlyArray<{
  year: string;
  company: string;
  current?: boolean;
}> = [
  { year: '2015', company: 'P&G' },
  { year: '2017', company: 'Macro' },
  { year: '2018', company: 'GE' },
  { year: '2020', company: 'Citrix' },
  { year: '2022', company: 'Raistone' },
  { year: '2024', company: 'Transcard' },
  { year: '2025', company: 'Tienda Pago' },
  { year: '2026', company: 'ERC', current: true },
] as const;

type Experience = {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  image?: {
    src: string;
    alt: string;
  };
  link?: string; // Added link property
};

type Initiative = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  link: string;
};

type Skill = {
  name: string;
  level: 1 | 2 | 3 | 4;
  category: 'Product Management' | 'Leadership & Collaboration' | 'Technical Skills' | 'Languages';
};

function SkillBadge({ skill }: { skill: Skill }) {
  const getHarveyBall = (level: number) => {
    switch (level) {
      case 4:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" className="text-signal" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            {/* Background Stroke */}
            <circle cx="12" cy="12" r="10" className="fill-none stroke-signal stroke-2" />
            {/* Filled 3/4 Pie Slice Path (Top-Right, Bottom-Right, Bottom-Left quadrants) */}
            <path d="M 12 2 A 10 10 0 1 1 2 12 L 12 12 Z" fill="currentColor" className="text-signal" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-signal stroke-2" />
            <path d="M12 22a10 10 0 0 1 0-20" fill="currentColor" className="text-signal" />
          </svg>
        );
      default: // level 1
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-signal stroke-2" />
            <path d="M12 22a10 10 0 0 1 0-10" fill="currentColor" className="text-signal" />
          </svg>
        );
    }
  };

  return (
    <div className="relative group">
      <span className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2">
        {skill.name}
        {getHarveyBall(skill.level)}
      </span>
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Proficiency: {skill.level}/4
      </div>
    </div>
  );
}

function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-signal" />
      
      <div className="space-y-4">
        {experiences.map((experience, index) => {
          const isClickable = experience.link;
          const ContentWrapper = isClickable ? 'a' : 'div';
          const contentProps = isClickable ? {
            href: experience.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block"
          } : {};
          
          return (
            <div 
              key={index}
              className={`relative flex items-center ${
                index % 2 === 1 ? 'md:justify-end' : 'justify-start'
              }`}
            >
              {/* Year as Marker */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-[1]">
                <div className="bg-signal rounded-full flex items-center">
                  {/* bg-paper, not bg-gray-50: the old value had no dark
                      variant, so the pill stayed light-grey in dark mode. */}
                  <span className="text-base font-extrabold text-signal bg-paper mx-[1px] my-[1px] px-3 py-0.5 rounded-full">
                    {experience.duration.split(' - ')[0]}
                  </span>
                </div>
              </div>
              
              {/* Content Box */}
              <div className={`w-full md:w-[48%] pl-16 md:pl-10 pr-4 md:pr-10 ${
                index % 2 === 1 ? 'md:pl-0' : ''
              }`}>
                <ContentWrapper {...contentProps}>
                  <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                    isClickable 
                      ? 'hover:-translate-y-1 hover:shadow-xl hover:border-signal cursor-pointer group' 
                      : ''
                  }`}>
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
                          <h3 className={`font-bold text-lg mb-1 text-gray-900 dark:text-white ${
                            isClickable ? 'group-hover:text-signal transition-colors' : ''
                          }`}>
                            {experience.role}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-400 text-sm">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                        {experience.achievements[0]}
                      </div>
                    </div>
                  </div>
                </ContentWrapper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joe Lapscher",
  "jobTitle": "Associate",
  "description": "Associate at Expense Reduction Coaching with expertise in fintech, SaaS, and enterprise software. Experienced in product strategy, roadmapping, and team leadership.",
  "url": "https://lapscher.com",
  "sameAs": [
    "https://www.linkedin.com/in/ylapscher/",
    "https://soundcloud.com/ylapscher/tracks"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Expense Reduction Coaching"
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "University of Florida",
      "degree": "MS in Information Systems & Operations Management"
    }
  ],
  "knowsAbout": [
    "Product Management",
    "Fintech",
    "SaaS",
    "Product Strategy",
    "Roadmapping",
    "Team Leadership",
    "API and Integrations",
    "Agile Methodologies"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "New Jersey",
    "addressCountry": "US"
  }
};

export default function Home() {
  const experiences: Experience[] = [
    {
      role: "Associate",
      company: "Expense Reduction Coaching",
      duration: "2026 - Present",
      achievements: [
        "Evolved from the product world to consulting, where I help companies find operational cost savings"
      ],
      image: {
        src: "/images/companies/erc.png",
        alt: "Expense Reduction Coaching"
      }
    },
    {
      role: "Chief Product Officer",
      company: "Tienda Pago",
      duration: "2025",
      achievements: [
        "I launched my career into Product leadership and owned Product, Growth, and Marketing at a LATAM Fintech that provided microloans to bodegas"
      ],
      image: {
        src: "/images/companies/tp.png",
        alt: "Tienda Pago"
      }
    },
    {
      role: "Senior Product Manager",
      company: "Transcard",
      duration: "2024 - 2025",
      achievements: [
        "I doubled down in the fintech world, focusing on payments, and driving the launch of a new platform that streamlines how businesses transact without relying on checks"
      ],
      image: {
        src: "/images/companies/transcard.png",
        alt: "Transcard Logo"
      }
    },
    {
      role: "Senior Product Manager",
      company: "Raistone",
      duration: "2022 - 2024",
      achievements: [
        "As the 2nd product hire at Raistone, I jumped into the fintech scene with enthusiasm, leveraging my Fortune 500 experience to thrive in this dynamic environment and drive impactful changes in working capital solutions"
      ],
      image: {
        src: "/images/companies/raistone.png",
        alt: "RaiStone Logo"
      }
    },
    {
      role: "Product Manager",
      company: "Citrix",
      duration: "2020 - 2022",
      achievements: [
        "After hanging up my software engineering 'cleats,' I dove headfirst into product management at Citrix, where I learned about prioritization & roadmapping, stakeholder management, and remote desktops"
      ],
      image: {
        src: "/images/companies/citrix.png",
        alt: "Citrix Logo"
      },
      link: "https://medium.com/@ylapscher/preview-system-log-for-the-citrix-cloud-platform-citrix-blogs-8306e408ef76"
    },
    {
      role: "Software Engineer",
      company: "General Electric",
      duration: "2018 - 2020",
      achievements: [
        "I kicked off my career with GE's IT Leadership Program, where I embraced diverse roles across NY, Maine, NOLA, and Atlanta, gaining hands-on experience in software engineering and product management in a global industrial powerhouse"
      ],
      image: {
        src: "/images/companies/ge.png",
        alt: "GE Logo"
      },
      link: "https://careers.gevernova.com/global/en/lp-dtlp"
    },
    {
      role: "Founder",
      company: "Macro Excellence",
      duration: "2017 - 2018",
      achievements: [
        "Founded, managed, and sold a technical consulting practice specializing in building custom software solutions that make business processes more efficient"
      ],
      image: {
        src: "/images/initiatives/macro.png",
        alt: "Macro Excellence"
      },
      link: "https://youtu.be/wmdxsiGG1rM?si=lu834SDaqkz8qTuu"
    },
    {
      role: "Intern",
      company: "Procter & Gamble",
      duration: "2015 - 2017",
      achievements: [
        "During my 4 internships at P&G, I worked on process improvement by finding ways to cut costs in market research and created some handy Excel VBA tools to automate reporting"
      ],
      image: {
        src: "/images/companies/pg.png",
        alt: "P&G Logo"
      }
    }
  ];

  const initiatives: Initiative[] = [
    {
      title: "Adaptive Climbing",
      description: "Started a new chapter with the Adaptive Climbing Group focusing on making rock climbing accessible to people with disabilities",
      image: {
        src: "/images/initiatives/climbing.png",
        alt: "Adaptive Climbing"
      },
      link: "https://www.adaptiveclimbinggroup.org/northern-new-jersey"
    }
  ];

  const skills: Skill[] = [
    // Product Management
    { name: "Product Launch & Planning", level: 4 as const, category: "Product Management" as const },
    { name: "Roadmapping & Prioritization", level: 4 as const, category: "Product Management" as const },
    { name: "Product Strategy", level: 3 as const, category: "Product Management" as const },
    { name: "Customer Journey Mapping", level: 3 as const, category: "Product Management" as const },
    { name: "Backlog Management", level: 3 as const, category: "Product Management" as const },
    { name: "Market Analysis", level: 2 as const, category: "Product Management" as const },
    
    // Leadership & Collaboration
    { name: "Team Building & Leadership", level: 4 as const, category: "Leadership & Collaboration" as const },
    { name: "Stakeholder Engagement", level: 3 as const, category: "Leadership & Collaboration" as const },
    { name: "Cross-functional Collaboration", level: 3 as const, category: "Leadership & Collaboration" as const },
    { name: "Project & Vendor Management", level: 3 as const, category: "Leadership & Collaboration" as const },
    
    // Technical Skills
    { name: "API and Integrations", level: 4 as const, category: "Technical Skills" as const },
    { name: "Product Analytics", level: 3 as const, category: "Technical Skills" as const },
    { name: "Agile Methodologies", level: 3 as const, category: "Technical Skills" as const },
    { name: "Programming", level: 3 as const, category: "Technical Skills" as const },
    { name: "Databases", level: 3 as const, category: "Technical Skills" as const },
    
    // Languages
    { name: "Spanish", level: 4 as const, category: "Languages" as const },
    { name: "Hebrew", level: 2 as const, category: "Languages" as const }
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Hero Section */}
      <header className="relative notebook-grid border-b border-rule">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="relative grid grid-cols-1 md:grid-cols-[1.42fr_1fr] gap-8 md:gap-12 items-center py-12 sm:py-16 md:py-20">
            {/* Left column: the claim */}
            <div>
              <p className={`${monoStyles.eyebrow} flex items-center gap-2.5 motion-safe:animate-rise`}>
                <span aria-hidden="true" className="block w-4 h-px bg-signal" />
                New Jersey &middot; Operations &amp; product
              </p>

              <h1
                className="mt-4 font-bold text-ink tracking-claim text-balance
                           text-[2.1rem] leading-[1.03] sm:text-5xl md:text-[3.4rem] md:leading-[1.015]
                           motion-safe:animate-rise [animation-delay:70ms]"
              >
                Ten years finding money that&rsquo;s{' '}
                <span className="text-signal">stuck</span>.
              </h1>

              <p className="mt-5 max-w-[46ch] text-muted text-base sm:text-[1.03rem] leading-relaxed motion-safe:animate-rise [animation-delay:140ms]">
                Industrial engineer <span className="font-mono text-ink text-[0.94em]">&rarr;</span>{' '}
                software engineer <span className="font-mono text-ink text-[0.94em]">&rarr;</span>{' '}
                chief product officer. Now I find operational cost savings at
                Expense Reduction Coaching.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 motion-safe:animate-rise [animation-delay:210ms]">
                <Link
                  href="/services"
                  className="inline-block bg-signal text-signal-ink font-semibold text-sm py-3 px-5
                             hover:brightness-110 focus-visible:outline focus-visible:outline-2
                             focus-visible:outline-offset-2 focus-visible:outline-signal transition"
                >
                  Work with me
                </Link>
                <Link
                  href="/portfolio"
                  className={`${monoStyles.label} text-ink border-b border-rule-hi pb-0.5
                             hover:border-signal hover:text-signal focus-visible:outline
                             focus-visible:outline-2 focus-visible:outline-offset-2
                             focus-visible:outline-signal transition-colors`}
                >
                  See what I&rsquo;ve built &rarr;
                </Link>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${monoStyles.eyebrow} hover:text-signal focus-visible:outline
                             focus-visible:outline-2 focus-visible:outline-offset-2
                             focus-visible:outline-signal transition-colors`}
                >
                  R&eacute;sum&eacute; &#8599;
                </a>
              </div>
            </div>

            {/* Right column: portrait, hard-edged rather than a circle */}
            <div className="w-full max-w-[336px] md:ml-auto motion-safe:animate-rise [animation-delay:160ms]">
              <div className="relative aspect-[4/5] ring-1 ring-rule-hi">
                <Image
                  src="/images/profile-portrait.jpg"
                  alt="Joe Lapscher"
                  fill
                  priority
                  sizes="(max-width: 768px) 336px, 336px"
                  className="object-cover saturate-[.78] contrast-[1.03] dark:saturate-[.7] dark:brightness-[.8]"
                />
              </div>
              <p className={`${monoStyles.eyebrow} mt-3 leading-loose`}>
                <span className="text-ink">Yoel &ldquo;Joe&rdquo; Lapscher</span>
                <br />
                Engineer &middot; operator &middot; cuts his own hair
              </p>
            </div>
          </div>
        </div>

        {/* Measurement rail: the ornament is the actual chronology. */}
        <div className="border-t border-rule">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <ol className="flex flex-wrap md:flex-nowrap">
              {career.map((stop, i) => (
                <li
                  key={stop.year}
                  className="relative basis-1/3 sm:basis-1/4 md:basis-0 md:flex-1 min-w-0 pt-4 pb-4 pr-2
                             motion-safe:animate-rise"
                  style={{ animationDelay: `${300 + i * 60}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 ${
                      stop.current ? 'w-0.5 h-3.5 bg-signal' : 'w-px h-2 bg-tick'
                    }`}
                  />
                  <span className={`${monoStyles.data} block text-[10.5px] text-muted mb-0.5`}>
                    {stop.year}
                  </span>
                  <span
                    className={`${monoStyles.label} block truncate ${
                      stop.current ? 'text-signal' : 'text-ink'
                    }`}
                  >
                    {stop.company}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Credibility strip: surfaces what the accordions below hide. */}
        <div className="border-t border-rule">
          <div
            className={`container mx-auto px-4 sm:px-6 max-w-5xl py-3.5 flex flex-wrap gap-x-7 gap-y-2
                        ${monoStyles.eyebrow} motion-safe:animate-rise [animation-delay:740ms]`}
          >
            <span><b className="font-medium text-ink tabular-nums">8</b> roles</span>
            <span><b className="font-medium text-ink tabular-nums">4</b> products shipped</span>
            <span><b className="font-medium text-ink tabular-nums">2</b> fintechs scaled</span>
            <span><b className="font-medium text-ink tabular-nums">1</b> practice founded &amp; sold</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Horizontal Divider */}
        <hr className="my-8 border-rule" />

        {/* Work Experience Section */}
        <section id="experience" className="mb-12 sm:mb-16 md:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-12 text-gray-900 dark:text-white`}>Experience</h2>
          <ExperienceTimeline experiences={experiences} />
        </section>

        <section id="volunteering-education" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Volunteering Section */}
            <div className="flex flex-col">
              <CollapsibleSection title="Volunteering" defaultOpen={false}>
                <div className="flex-1">
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
              </CollapsibleSection>
            </div>

            {/* Education Section */}
            <div className="flex flex-col">
              <CollapsibleSection title="Education" defaultOpen={false}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex-1">
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
              </CollapsibleSection>
            </div>
          </div>
        </section>

        <section id="skills" className="mt-16 sm:mt-20 mb-16 sm:mb-20 scroll-mt-20">
          <CollapsibleSection title="Skills" defaultOpen={false}>
            <div className="space-y-8">
              {Object.entries(
                skills.reduce((acc, skill) => ({
                  ...acc,
                  [skill.category]: [...(acc[skill.category] || []), skill].sort((a, b) => b.level - a.level),
                }), {} as Record<string, typeof skills>)
              ).map(([category, skills]) => (
                <CollapsibleSection key={category} title={category} size="medium" defaultOpen={false}>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                  </div>
                </CollapsibleSection>
              ))}
            </div>
          </CollapsibleSection>
        </section>
      </main>
    </>
  );
}
