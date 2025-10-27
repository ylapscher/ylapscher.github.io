import { BuildingOfficeIcon, CodeBracketIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Calendar from '../components/Calendar';

const services = [
  {
    title: "Fractional CPO / Product Leadership",
    description: "Strategic product leadership for early to growth-stage startups. I help build product foundations, define roadmaps, and scale product teams.",
    icon: <BuildingOfficeIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Freelance Website Development",
    description: "Custom website development using modern technologies. From concept to deployment, I build fast, responsive, and user-friendly web experiences.",
    icon: <CodeBracketIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "PM Mentoring & Interview Prep",
    description: "Guidance for aspiring and junior product managers. Resume reviews, interview coaching, and career strategy from someone who's been there.",
    icon: <AcademicCapIcon className="w-8 h-8 text-blue-600" />,
  },
];

export default function Services() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      {/* Booking Section */}
      <section id="book" className="scroll-mt-20 mb-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Let's Connect!
        </h1>
        <Calendar />
      </section>

      <hr className="my-16 border-gray-300 dark:border-gray-700" />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">How can I help?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          As a senior product manager free agent, I'm focused on three key areas where I can add immediate value:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 