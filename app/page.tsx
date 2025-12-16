'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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
            <circle cx="12" cy="12" r="10" className="text-blue-600" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            {/* Background Stroke */}
            <circle cx="12" cy="12" r="10" className="fill-none stroke-blue-600 stroke-2" />
            {/* Filled 3/4 Pie Slice Path (Top-Right, Bottom-Right, Bottom-Left quadrants) */}
            <path d="M 12 2 A 10 10 0 1 1 2 12 L 12 12 Z" fill="currentColor" className="text-blue-600" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-blue-600 stroke-2" />
            <path d="M12 22a10 10 0 0 1 0-20" fill="currentColor" className="text-blue-600" />
          </svg>
        );
      default: // level 1
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-blue-600 stroke-2" />
            <path d="M12 22a10 10 0 0 1 0-10" fill="currentColor" className="text-blue-600" />
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

function ScrollExperience({ experiences }: { experiences: Experience[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    const experienceElements = document.querySelectorAll('[data-experience-item]');
    experienceElements.forEach((el) => observer.observe(el));

    return () => {
      experienceElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <div className="space-y-0">
        {experiences.map((experience, index) => {
          const isClickable = experience.link;
          const ContentWrapper = isClickable ? 'a' : 'div';
          const contentProps = isClickable ? {
            href: experience.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block"
          } : {};
          
          const isActive = activeIndex === index;
          const isPast = index < activeIndex;
          const isFuture = index > activeIndex;
          
          // Hide past items completely, show active fully, show future with reduced opacity
          const opacity = isPast ? 0 : (isActive ? 1 : 0.3);
          const scale = isActive ? 1 : 0.96;
          const yOffset = isActive ? 0 : (isPast ? -10 : 10);
          const pointerEvents = isPast ? 'none' : 'auto';
          const visibility = isPast ? 'hidden' : 'visible';
          
          // Add spacing between items for scroll effect - each item needs space to scroll into view
          // Last item has less padding to allow normal page scroll to continue
          const paddingBottom = index === experiences.length - 1 ? 'pb-8' : 'pb-[60vh]';
          
          return (
            <div
              key={index}
              data-experience-item
              data-index={index}
              className={`sticky top-16 sm:top-20 ${paddingBottom} transition-all duration-700 ease-out`}
              style={{
                opacity,
                transform: `translateY(${yOffset}px) scale(${scale})`,
                zIndex: isActive ? experiences.length : experiences.length - index,
                pointerEvents,
                visibility,
              }}
            >
              <ContentWrapper {...contentProps}>
                <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                  isClickable 
                    ? 'hover:-translate-y-1 hover:shadow-xl hover:border-blue-500 cursor-pointer group' 
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
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className={`font-bold text-lg text-gray-900 dark:text-white ${
                            isClickable ? 'group-hover:text-blue-600 transition-colors' : ''
                          }`}>
                            {experience.role}
                          </h3>
                          <span className="text-xs font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                            {experience.duration.split(' - ')[0]}
                          </span>
                        </div>
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
  "jobTitle": "Chief Product Officer",
  "description": "Chief Product Officer at Tienda Pago with expertise in fintech, SaaS, and enterprise software. Experienced in product strategy, roadmapping, and team leadership.",
  "url": "https://lapscher.com",
  "sameAs": [
    "https://www.linkedin.com/in/ylapscher/",
    "https://soundcloud.com/ylapscher/tracks"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Tienda Pago"
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
      role: "Chief Product Officer",
      company: "Tienda Pago",
      duration: "2025 - Present",
      achievements: [
        "I've launched my career into Product leadership and currently own Product, Growth, and Marketing at a LATAM Fintech that provides microloans to bodegas"
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

  const textStyles = {
    h1: "text-4xl sm:text-5xl font-bold font-geist-sans",
    h2: "text-2xl sm:text-3xl font-bold font-geist-sans",
    h3: "text-lg sm:text-xl font-semibold font-geist-sans",
    body: "text-base font-geist-sans text-gray-600 dark:text-gray-400",
    small: "text-sm font-geist-sans",
  };

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
      <header className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Joe Lapscher"
              fill
              priority
              className="object-cover scale-110 object-[50%_35%]"
              sizes="(max-width: 768px) 192px, 192px"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <h1 className={textStyles.h1}>
            <span className="text-gray-900 dark:text-white">Joe Lapscher</span>
            <span className="block text-xl sm:text-2xl text-gray-700 dark:text-gray-400 mt-2 font-geist-sans">
              Chief Product Officer
            </span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            <em>Welcome | Bienvenido | ברוכים הבאים!</em>
            <br />
            I'm the Chief Product Officer at Tienda Pago, specializing in fintech. This is the corner of the internet where I share my professional journey and recent projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="/services"
              className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Let's Connect
            </a>
            <a
              href="/projects"
              className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              View My Projects
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Horizontal Divider */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Work Experience Section */}
        <section id="experience" className="mb-12 sm:mb-16 md:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-12 text-gray-900 dark:text-white`}>Experience</h2>
          <ScrollExperience experiences={experiences} />
        </section>

        {/* Horizontal Divider for Volunteering and Education */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
        <section id="volunteering-education" className="mb-16 sm:mb-20 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Volunteering Section */}
            <div className="flex flex-col">
              <h2 className={`${textStyles.h2} mb-8 text-gray-900 dark:text-white`}>Volunteering</h2>
              <div className="flex-1">
                {initiatives.map((initiative, index) => (
                  <a
                    key={index}
                    href={initiative.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500"
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
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                        {initiative.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="flex flex-col">
              <h2 className={`${textStyles.h2} mb-8 text-gray-900 dark:text-white`}>Education</h2>
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
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Teaching Assistant:</p>
                      <ul className="text-gray-700 dark:text-gray-400 text-sm mt-1 space-y-1">
                        <li>• Managerial Quantitative Analysis I & II</li>
                        <li>• Retail Consulting</li>
                        <li>• Intro to Managerial Statistics</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">BS, Industrial & Systems Engineering</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Divider for Skills */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
        <section id="skills" className="mb-16 sm:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-6 text-gray-900 dark:text-white`}>Skills</h2>
          <div className="space-y-8">
            {Object.entries(
              skills.reduce((acc, skill) => ({
                ...acc,
                [skill.category]: [...(acc[skill.category] || []), skill].sort((a, b) => b.level - a.level),
              }), {} as Record<string, typeof skills>)
            ).map(([category, skills]) => (
              <div key={category}>
                <h3 className={`${textStyles.h3} mb-4 text-gray-900 dark:text-white`}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
