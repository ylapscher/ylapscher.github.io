import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '../data/projects-data';

export const metadata: Metadata = {
  title: 'Portfolio — Joe Lapscher',
  description: "Web projects I've built to solve real problems and craft engaging experiences.",
};

export default function Portfolio() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Portfolio</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          Here are some websites I've built to solve real problems and create engaging user experiences:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={`/portfolio/${project.slug}`}
            aria-label={`View ${project.title} project details`}
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
                  →
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </Link>
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

