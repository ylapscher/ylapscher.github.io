export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectBeforeAfter = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  url: string;
  color: string;
  icon: string;
  thumbnail: string;
  heroImage: string;
  outcomeHook: string;
  gallery?: ProjectImage[];
  beforeAfter?: ProjectBeforeAfter;
  stack?: string[];
  role?: string;
  timeline?: string;
  category?: string;
  metrics?: ProjectMetric[];
  embedUrl?: string;
  contextAndProblem: string;
  constraintsAndStakes: string;
  discoveryAndInsight: string;
  optionsTradeoffsAndDecisions: string;
  solutionAndExecution: string;
  outcomesMetricsAndEvidence: string;
  reflectionAndLessonsLearned: string;
};

export const projects: Project[] = [
  {
    title: "Sam Storybook",
    slug: "sam-storybook",
    description: "Families order a personalized photo storybook online. Stripe checkout, then a printed book in the mail.",
    url: "https://www.samstorybook.com/",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    icon: "📚",
    thumbnail: "/images/portfolio/sam-storybook/hero.webp",
    heroImage: "/images/portfolio/sam-storybook/hero.webp",
    outcomeHook: "Order a printed book in under five minutes",
    gallery: [
      { src: "/images/portfolio/sam-storybook/desktop-2.webp", alt: "Story builder interface", caption: "Story builder" },
      { src: "/images/portfolio/sam-storybook/mobile-1.webp", alt: "Sam Storybook mobile view" },
    ],
    beforeAfter: {
      before: "/images/portfolio/sam-storybook/before.webp",
      after: "/images/portfolio/sam-storybook/hero.webp",
      beforeLabel: "Generic photo album",
      afterLabel: "Personalized story builder",
    },
    stack: ["Next.js", "Stripe", "Tailwind CSS"],
    role: "Solo builder",
    timeline: "2024 · 6 weeks",
    category: "E-commerce",
    metrics: [
      { value: "Stripe", label: "checkout" },
      { value: "6 weeks", label: "build time" },
    ],
    contextAndProblem: "Families wanted a meaningful way to preserve and share cherished memories with their children. Traditional photo albums felt impersonal, and existing personalized book services were expensive or lacked customization options.",
    constraintsAndStakes: "The solution needed to be affordable, easy to use for non-technical users, and deliver a high-quality physical product. Payment processing had to be secure and seamless.",
    discoveryAndInsight: "Through conversations with parents, I discovered that the emotional value of personalized storytelling far exceeded generic photo books. Parents wanted to be the authors of their children's stories.",
    optionsTradeoffsAndDecisions: "Evaluated print-on-demand services vs. partnering with local printers. Chose Stripe for payments due to its developer-friendly API and broad payment method support.",
    solutionAndExecution: "Built a Next.js application with an intuitive story builder interface. Integrated Stripe for secure checkout and implemented a photo upload system with automatic optimization.",
    outcomesMetricsAndEvidence: "Successfully launched with positive user feedback. The streamlined checkout process resulted in high conversion rates from cart to purchase.",
    reflectionAndLessonsLearned: "Learned the importance of optimizing image uploads for various connection speeds. Future iterations could include more template options and collaborative editing features."
  },
  {
    title: "Knock on Block",
    slug: "knock-on-block",
    description: "A local handyman's site: services, work photos, and a quote form that emails the owner the moment someone asks.",
    url: "https://www.knockonblock.com/",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    icon: "🔧",
    thumbnail: "/images/portfolio/knock-on-block/hero.webp",
    heroImage: "/images/portfolio/knock-on-block/hero.webp",
    outcomeHook: "Consistent lead flow from mobile search",
    gallery: [
      { src: "/images/portfolio/knock-on-block/desktop-2.webp", alt: "Quote request form", caption: "Quote request form" },
      { src: "/images/portfolio/knock-on-block/mobile-1.webp", alt: "Knock on Block mobile homepage", caption: "Mobile-first layout" },
    ],
    beforeAfter: {
      before: "/images/portfolio/knock-on-block/before.webp",
      after: "/images/portfolio/knock-on-block/hero.webp",
      beforeLabel: "Word-of-mouth only",
      afterLabel: "Professional web presence",
    },
    stack: ["Next.js", "Resend", "Tailwind CSS"],
    role: "Solo builder",
    timeline: "2024 · 2 weeks",
    category: "Local services",
    metrics: [
      { value: "2 weeks", label: "build time" },
      { value: "Instant", label: "lead alerts" },
    ],
    contextAndProblem: "A local handyman needed a professional web presence to compete with larger service companies. They were losing potential customers who couldn't find them online or easily request quotes.",
    constraintsAndStakes: "The solution needed to be low-maintenance, mobile-friendly, and convert visitors into leads without requiring the owner to constantly monitor the site.",
    discoveryAndInsight: "Research showed that most handyman searches happen on mobile devices, and customers prioritize seeing previous work examples and easy contact methods over flashy designs.",
    optionsTradeoffsAndDecisions: "Chose a static site approach for speed and reliability. Selected Resend for email delivery due to its high deliverability rates and simple integration.",
    solutionAndExecution: "Developed a clean, responsive website showcasing services, a gallery of completed work, and customer testimonials. Implemented a quote request form with instant email notifications.",
    outcomesMetricsAndEvidence: "The website generates consistent lead inquiries. The owner reports a significant increase in quote requests compared to relying solely on word-of-mouth.",
    reflectionAndLessonsLearned: "Simple, focused websites often outperform complex ones for local service businesses. The key is reducing friction between visitor intent and action."
  },
  {
    title: "Yoga Studio",
    slug: "yoga-studio",
    description: "A free pose library and sequence builder for home practice. Works offline as a PWA, no subscription.",
    url: "https://yoga.lapscher.com/",
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    icon: "🧘",
    thumbnail: "/images/portfolio/yoga-studio/hero.webp",
    heroImage: "/images/portfolio/yoga-studio/hero.webp",
    outcomeHook: "Free sequence builder for home practice",
    gallery: [
      { src: "/images/portfolio/yoga-studio/desktop-2.webp", alt: "Sequence generator", caption: "Sequence generator" },
      { src: "/images/portfolio/yoga-studio/mobile-1.webp", alt: "Yoga Studio mobile view" },
    ],
    stack: ["Next.js", "Service Workers", "Tailwind CSS"],
    role: "Solo builder",
    timeline: "2024 · 4 weeks",
    category: "Wellness",
    metrics: [
      { value: "Offline", label: "PWA" },
      { value: "100+", label: "poses" },
    ],
    embedUrl: "https://yoga.lapscher.com/",
    contextAndProblem: "Yoga practitioners often struggle to create balanced sequences for home practice. Existing apps were either too complex or required expensive subscriptions for basic features.",
    constraintsAndStakes: "The tool needed to be free, intuitive for beginners, and provide value to experienced practitioners. It had to work offline for users who practice without internet access.",
    discoveryAndInsight: "Talking with yoga instructors revealed that sequence building follows patterns based on pose categories, transitions, and session goals. This could be systematized into a generator.",
    optionsTradeoffsAndDecisions: "Built a pose database with categorization and transition rules. Opted for a web-based approach with offline capability using service workers rather than a native app.",
    solutionAndExecution: "Created a sequence generator that considers pose difficulty, category balance, and smooth transitions. Added a pose library with detailed instructions and modifications.",
    outcomesMetricsAndEvidence: "Users report the tool helps them maintain consistent home practice. The pose repository serves as a reference for proper form and variations.",
    reflectionAndLessonsLearned: "Wellness tools benefit from a calm, focused UI that mirrors the activity they support. Animation and transitions should feel intentional and peaceful."
  },
  {
    title: "Harbor Parking",
    slug: "harbor-parking",
    description: "Replaced a building's WhatsApp parking thread with a live availability board and reservations.",
    url: "https://parking.lapscher.com/",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: "🚗",
    thumbnail: "/images/portfolio/harbor-parking/hero.webp",
    heroImage: "/images/portfolio/harbor-parking/hero.webp",
    outcomeHook: "Eliminated double-bookings",
    gallery: [
      { src: "/images/portfolio/harbor-parking/desktop-2.webp", alt: "Reservation flow", caption: "Reservation flow" },
      { src: "/images/portfolio/harbor-parking/mobile-1.webp", alt: "Harbor Parking mobile view" },
    ],
    beforeAfter: {
      before: "/images/portfolio/harbor-parking/before.webp",
      after: "/images/portfolio/harbor-parking/hero.webp",
      beforeLabel: "WhatsApp chaos",
      afterLabel: "Real-time dashboard",
    },
    stack: ["Next.js", "Real-time DB", "Tailwind CSS"],
    role: "Solo builder",
    timeline: "2024 · 3 weeks",
    category: "Community tool",
    metrics: [
      { value: "0", label: "double-bookings" },
      { value: "Live", label: "availability" },
    ],
    embedUrl: "https://parking.lapscher.com/",
    contextAndProblem: "A residential community was managing shared parking spaces through a chaotic WhatsApp group. Messages got lost, double-bookings occurred, and new residents had no way to understand availability.",
    constraintsAndStakes: "The solution needed to be simpler than the WhatsApp group it replaced. Residents of all technical abilities needed to adopt it, and it had to handle real-time availability updates.",
    discoveryAndInsight: "The core problem wasn't communication—it was visibility. Residents needed a single source of truth for parking availability that updated in real-time without constant messaging.",
    optionsTradeoffsAndDecisions: "Evaluated calendar-based solutions vs. custom build. Chose to build a custom solution for better UX and to handle the specific reservation rules of the community.",
    solutionAndExecution: "Built a real-time parking availability dashboard with reservation capabilities. Implemented notifications for reservation confirmations and reminders.",
    outcomesMetricsAndEvidence: "The WhatsApp group activity dropped significantly as residents adopted the new system. Double-bookings were eliminated and new residents onboard easily.",
    reflectionAndLessonsLearned: "Sometimes the best solution is removing communication rather than improving it. A well-designed system can replace hundreds of daily messages with a single glance at a dashboard."
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return projects.findIndex(project => project.slug === slug);
}

export function getNextProject(slug: string): Project | null {
  const currentIndex = getProjectIndex(slug);
  if (currentIndex === -1) return null;
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

export function getPreviousProject(slug: string): Project | null {
  const currentIndex = getProjectIndex(slug);
  if (currentIndex === -1) return null;
  const previousIndex = (currentIndex - 1 + projects.length) % projects.length;
  return projects[previousIndex];
}

export function getProjectDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
