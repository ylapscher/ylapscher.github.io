export type Project = {
  title: string;
  slug: string;
  description: string;
  url: string;
  color: string;
  icon: string;
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
    description: "Offers a personalized book for families to create and share a custom storybook, preserving cherished memories with photos and narratives. The website provides user-friendly experience to order the book with a Stripe integration for payment processing.",
    url: "https://www.samstorybook.com/",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    icon: "📚",
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
    description: "Handyman services website with a simple user interface highlighting services offered, work examples, and reviews. Integration with Resend sends email notifications to the owner when a quote is requested via a form.",
    url: "https://www.knockonblock.com/",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    icon: "🔧",
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
    description: "Provides accessible resources for yoga enthusiasts, including guided sessions and wellness tips to enhance mindful living. The website encourages users to deepen their practice in a supportive and intuitive yoga pose sequence generator and repository.",
    url: "https://yoga.lapscher.com/",
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    icon: "🧘",
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
    description: "Streamlines parking access and management by offering tools for finding, reserving, and tracking parking spaces. Dedicated to convenience, the site helps users minimize stress and replace the current process of communicating available parking spots via a WhatsApp group.",
    url: "https://parking.lapscher.com/",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: "🚗",
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

