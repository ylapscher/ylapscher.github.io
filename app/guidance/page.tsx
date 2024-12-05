import { CalendarIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Calendar from '../components/Calendar';

const services = [
  {
    title: "Resume/Interview Prep",
    description: "Let me help you prepare for your next big opportunity with personalized resume review and interview coaching.",
    icon: <DocumentTextIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Product Skills Coaching/Mentorship",
    description: "Get guidance on product management fundamentals, strategy, and career growth from someone who's been there.",
    icon: <BeakerIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "How to Use Cursor AI",
    description: "Learn how to leverage AI tools effectively in your workflow to boost productivity and innovation.",
    icon: <CalendarIcon className="w-8 h-8 text-blue-600" />,
  },
];

export default function Guidance() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can I help?</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          With a decade of experience under my belt, I'd love to help where I can. Feel free to review my areas of focus below:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <Calendar />
    </main>
  );
} 