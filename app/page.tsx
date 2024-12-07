'use client';

import Image from 'next/image';
import { useState } from 'react';

type Experience = {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  image?: {
    src: string;
    alt: string;
  };
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
            <circle cx="12" cy="12" r="10" className="fill-none stroke-blue-600 stroke-2" />
            <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" className="text-blue-600" />
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
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Proficiency: {skill.level}/4
      </div>
    </div>
  );
}

function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-600" />
      
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div 
            key={index}
            className={`relative flex items-center ${
              index % 2 === 1 ? 'md:justify-end' : 'justify-start'
            }`}
          >
            {/* Year as Marker */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
              <div className="bg-blue-600 rounded-full flex items-center">
                <span className="text-base font-extrabold text-blue-600 bg-gray-50 mx-[1px] my-[1px] px-3 py-0.5 rounded-full">
                  {experience.duration.split(' - ')[0]}
                </span>
              </div>
            </div>
            
            {/* Content Box */}
            <div className={`w-full md:w-[48%] pl-16 md:pl-10 pr-4 md:pr-10 ${
              index % 2 === 1 ? 'md:pl-0' : ''
            }`}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
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
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{experience.role}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{experience.company}</p>
                    <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {experience.achievements[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const experiences: Experience[] = [
    {
      role: "Senior Product Manager",
      company: "Transcard",
      duration: "2024 - Present",
      achievements: [
        "I'm doubling down in the fintech world, focusing on payments, and driving the launch of a new platform that streamlines how businesses transact without relying on checks"
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
      }
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
      }
    },
    {
      role: "Graduate Student",
      company: "University of Florida",
      duration: "2017 - 2018",
      achievements: [
        "I earned my MS in Information Systems & Operations Management at UF, where I served as a Teaching Assistant for courses in Managerial Quantitative Analysis and Retail Consulting. I also hold a BS in Industrial & Systems Engineering, where I played water polo"
      ],
      image: {
        src: "/images/companies/uf.png",
        alt: "UF Logo"
      }
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
    },
    {
      title: "Young Jewish Professionals",
      description: "Founding board member of the Atlanta chapter of Young Jewish Professionals, creating programs for young professionals in the Jewish community",
      image: {
        src: "/images/initiatives/yjp.png",
        alt: "Young Jewish Professionals"
      },
      link: "https://www.yjpintown.org/"
    },
    {
      title: "Blockchain Club",
      description: "Cofounder of the blockchain forums at UF and GE, leading discussions and workshops on blockchain technology, cryptocurrencies, and their impact on financial services",
      image: {
        src: "/images/initiatives/blockchain.png",
        alt: "Blockchain Club"
      },
      link: "https://www.instagram.com/gatorblockchain/?hl=en"
    },
    {
      title: "Macro Excellence",
      description: "Founded, managed, and sold a technical consulting practice specializing in building custom software solutions that make business processes more efficient",
      image: {
        src: "/images/initiatives/macro.png",
        alt: "Macro Excellence"
      },
      link: "https://youtu.be/wmdxsiGG1rM?si=_wUAidl0huhKyuye"
    }
  ];

  const skills: Skill[] = [
    // Product Management
    { name: "Product Strategy", level: 3 as const, category: "Product Management" as const },
    { name: "Market Analysis", level: 2 as const, category: "Product Management" as const },
    { name: "Roadmapping & Prioritization", level: 4 as const, category: "Product Management" as const },
    { name: "Customer Journey Mapping", level: 3 as const, category: "Product Management" as const },
    { name: "Product Launch & Planning", level: 4 as const, category: "Product Management" as const },
    { name: "Backlog Management", level: 3 as const, category: "Product Management" as const },
    
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
      {/* Hero Section */}
      <header className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Joe Lapscher"
              fill
              priority
              className="object-cover scale-150 object-[50%_35%]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <h1 className={textStyles.h1}>
            Joe Lapscher
            <span className="block text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mt-2 font-geist-sans">
              Senior Product Manager
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Welcome | Bienvenido | ברוכים הבאים!
            <br />
            Hey there! 👋 This is my little corner of the web where I share my professional journey, 
            hobbies, and travel adventures 😊
          </p>
          <a
            href="/guidance"
            className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition mx-auto"
          >
            Let's Connect!
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Horizontal Divider */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Work Experience Section */}
        <section id="experience" className="mb-16 sm:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-12`}>Experience</h2>
          <ExperienceTimeline experiences={experiences} />
        </section>

        {/* Horizontal Divider for Initiatives */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
        <section id="initiatives" className="mb-16 sm:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-12`}>Initiatives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => (
              <a
                key={index}
                href={initiative.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500"
              >
                {initiative.image && (
                  <div className="h-48 sm:h-64 relative">
                    <Image
                      src={initiative.image.src}
                      alt={initiative.image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Horizontal Divider for Skills */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
        <section id="skills" className="mb-16 sm:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-6`}>Skills</h2>
          <div className="space-y-8">
            {Object.entries(
              skills.reduce((acc, skill) => ({
                ...acc,
                [skill.category]: [...(acc[skill.category] || []), skill],
              }), {} as Record<string, typeof skills>)
            ).map(([category, skills]) => (
              <div key={category}>
                <h3 className={`${textStyles.h3} mb-4`}>{category}</h3>
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
