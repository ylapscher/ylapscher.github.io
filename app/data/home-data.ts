export type Experience = {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  image?: {
    src: string;
    alt: string;
  };
  link?: string;
};

export type Initiative = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  link: string;
};

export type Skill = {
  name: string;
  level: 1 | 2 | 3 | 4;
  category: 'Product Management' | 'Leadership & Collaboration' | 'Technical Skills' | 'Languages';
};

/**
 * The hero's measurement rail. This is the real chronology, not decoration --
 * it puts the eight-role arc above the fold, where the Experience accordion
 * below currently hides it behind `defaultOpen={false}`.
 *
 * Company names only: at eight stops across the container each label gets
 * roughly 137px, so anything longer truncates.
 */
export const career: ReadonlyArray<{
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

export const experiences: Experience[] = [
  {
    role: 'Partner',
    company: 'Expense Reduction Coaching',
    duration: '2026 - Present',
    achievements: [
      'Evolved from the product world to consulting, where I help companies find operational cost savings',
    ],
    image: {
      src: '/images/companies/erc.png',
      alt: 'Expense Reduction Coaching',
    },
  },
  {
    role: 'Chief Product Officer',
    company: 'Tienda Pago',
    duration: '2025',
    achievements: [
      'I launched my career into Product leadership and owned Product, Growth, and Marketing at a LATAM Fintech that provided microloans to bodegas',
    ],
    image: {
      src: '/images/companies/tp.png',
      alt: 'Tienda Pago',
    },
  },
  {
    role: 'Senior Product Manager',
    company: 'Transcard',
    duration: '2024 - 2025',
    achievements: [
      'I doubled down in the fintech world, focusing on payments, and driving the launch of a new platform that streamlines how businesses transact without relying on checks',
    ],
    image: {
      src: '/images/companies/transcard.png',
      alt: 'Transcard Logo',
    },
  },
  {
    role: 'Senior Product Manager',
    company: 'Raistone',
    duration: '2022 - 2024',
    achievements: [
      'As the 2nd product hire at Raistone, I jumped into the fintech scene with enthusiasm, leveraging my Fortune 500 experience to thrive in this dynamic environment and drive impactful changes in working capital solutions',
    ],
    image: {
      src: '/images/companies/raistone.png',
      alt: 'RaiStone Logo',
    },
  },
  {
    role: 'Product Manager',
    company: 'Citrix',
    duration: '2020 - 2022',
    achievements: [
      "After hanging up my software engineering 'cleats,' I dove headfirst into product management at Citrix, where I learned about prioritization & roadmapping, stakeholder management, and remote desktops",
    ],
    image: {
      src: '/images/companies/citrix.png',
      alt: 'Citrix Logo',
    },
    link: 'https://medium.com/@ylapscher/preview-system-log-for-the-citrix-cloud-platform-citrix-blogs-8306e408ef76',
  },
  {
    role: 'Software Engineer',
    company: 'General Electric',
    duration: '2018 - 2020',
    achievements: [
      "I kicked off my career with GE's IT Leadership Program, where I embraced diverse roles across NY, Maine, NOLA, and Atlanta, gaining hands-on experience in software engineering and product management in a global industrial powerhouse",
    ],
    image: {
      src: '/images/companies/ge.png',
      alt: 'GE Logo',
    },
    link: 'https://careers.gevernova.com/global/en/lp-dtlp',
  },
  {
    role: 'Founder',
    company: 'Macro Excellence',
    duration: '2017 - 2018',
    achievements: [
      'Founded, managed, and sold a technical consulting practice specializing in building custom software solutions that make business processes more efficient',
    ],
    image: {
      src: '/images/initiatives/macro.png',
      alt: 'Macro Excellence',
    },
    link: 'https://youtu.be/wmdxsiGG1rM?si=lu834SDaqkz8qTuu',
  },
  {
    role: 'Intern',
    company: 'Procter & Gamble',
    duration: '2015 - 2017',
    achievements: [
      'During my 4 internships at P&G, I worked on process improvement by finding ways to cut costs in market research and created some handy Excel VBA tools to automate reporting',
    ],
    image: {
      src: '/images/companies/pg.png',
      alt: 'P&G Logo',
    },
  },
];

export const initiatives: Initiative[] = [
  {
    title: 'Adaptive Climbing',
    description:
      'Started a new chapter with the Adaptive Climbing Group focusing on making rock climbing accessible to people with disabilities',
    image: {
      src: '/images/initiatives/climbing.png',
      alt: 'Adaptive Climbing',
    },
    link: 'https://www.adaptiveclimbinggroup.org/northern-new-jersey',
  },
];

export const skills: Skill[] = [
  { name: 'Product Launch & Planning', level: 4, category: 'Product Management' },
  { name: 'Roadmapping & Prioritization', level: 4, category: 'Product Management' },
  { name: 'Product Strategy', level: 3, category: 'Product Management' },
  { name: 'Customer Journey Mapping', level: 3, category: 'Product Management' },
  { name: 'Backlog Management', level: 3, category: 'Product Management' },
  { name: 'Market Analysis', level: 2, category: 'Product Management' },
  { name: 'Team Building & Leadership', level: 4, category: 'Leadership & Collaboration' },
  { name: 'Stakeholder Engagement', level: 3, category: 'Leadership & Collaboration' },
  { name: 'Cross-functional Collaboration', level: 3, category: 'Leadership & Collaboration' },
  { name: 'Project & Vendor Management', level: 3, category: 'Leadership & Collaboration' },
  { name: 'API and Integrations', level: 4, category: 'Technical Skills' },
  { name: 'Product Analytics', level: 3, category: 'Technical Skills' },
  { name: 'Agile Methodologies', level: 3, category: 'Technical Skills' },
  { name: 'Programming', level: 3, category: 'Technical Skills' },
  { name: 'Databases', level: 3, category: 'Technical Skills' },
  { name: 'Spanish', level: 4, category: 'Languages' },
  { name: 'Hebrew', level: 2, category: 'Languages' },
];
