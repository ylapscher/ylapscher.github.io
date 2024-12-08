import { CalendarIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Calendar from '../components/Calendar';

const services = [
  {
    title: "Resume & Interview Prep",
    description: "Will help you prepare for your next big opportunity with personalized resume review and interview coaching.",
    icon: <DocumentTextIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Product Coaching / Mentorship",
    description: "Get guidance on product management fundamentals, strategy, and career growth from someone who's been there.",
    icon: <BeakerIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "How to Use Cursor AI",
    description: "Learn how to leverage AI tools to boost productivity and innovate quickly.",
    icon: <CalendarIcon className="w-8 h-8 text-blue-600" />,
  },
];

export default function Services() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">How can I help?</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          With a decade of experience under my belt, I'd love to help where I can. Here are my areas of focus:
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

      <hr className="my-16 border-gray-300 dark:border-gray-700" />

      {/* Booking Section */}
      <section id="book" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Schedule a Session
        </h2>
        <Calendar />
      </section>
    </main>
  );
} 