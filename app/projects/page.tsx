import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Joe Lapscher',
  description: "Web projects I've built to solve real problems and craft engaging experiences.",
};

type Project = {
  title: string;
  description: string;
  url: string;
  color: string;
  icon: string;
};

const projects: Project[] = [
  {
    title: "Sam Storybook",
    description: "Offers a personalized book for families to create and share a custom storybook, preserving cherished memories with photos and narratives. The website provides user-friendly experience to order the book with a Stripe integration for payment processing.",
    url: "https://www.samstorybook.com/",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    icon: "📚"
  },
  {
    title: "Knock on Block",
    description: "Handyman services website with a simple user interface highlighting services offered, work examples, and reviews. Integration with Resend sends email notifications to the owner when a quote is requested via a form.",
    url: "https://www.knockonblock.com/",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    icon: "🔧"
  },
  {
    title: "Yoga Studio",
    description: "Provides accessible resources for yoga enthusiasts, including guided sessions and wellness tips to enhance mindful living. The website encourages users to deepen their practice in a supportive and intuitive yoga pose sequence generator and repository.",
    url: "https://yoga.lapscher.com/",
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    icon: "🧘"
  },
  {
    title: "Harbor Parking",
    description: "Streamlines parking access and management by offering tools for finding, reserving, and tracking parking spaces. Dedicated to convenience, the site helps users minimize stress and replace the current process of communicating available parking spots via a WhatsApp group.",
    url: "https://parking.lapscher.com/",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: "🚗"
  }
];

export default function Projects() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Projects</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          Here are some websites I've built to solve real problems and create engaging user experiences:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} in a new tab`}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500"
          >
            <div className="aspect-video relative overflow-hidden">
              <div className={`w-full h-full ${project.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                <span className="text-6xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {project.icon}
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  ↗
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-500 text-sm">
          Each project was built with a focus on user experience, performance, and solving real-world problems.
        </p>
      </div>
    </main>
  );
}
