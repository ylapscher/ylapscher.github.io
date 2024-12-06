import { 
  UserGroupIcon, // for improv comedy
  MusicalNoteIcon, // for piano
  FireIcon, // for hot yoga
  ArrowTrendingUpIcon // for rock climbing
} from '@heroicons/react/24/outline';
import ImageGallery from '../components/ImageGallery';
import GoodreadsWidget from '../components/GoodreadsWidget';

const hobbies = [
  {
    title: "Rock Climbing",
    description: "I love sport climbing outdoors and bouldering indoors. It's a great way to stay active and challenge myself.",
    icon: <ArrowTrendingUpIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Hot Yoga",
    description: "Practice hot yoga to maintain flexibility and mental clarity. The heat adds an extra challenge and helps deepen the practice.",
    icon: <FireIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Piano",
    description: "I'm a pianist with a love for jazz music. Music provides a creative outlet and a way to express my artistic side.",
    icon: <MusicalNoteIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Improv Comedy",
    description: "I enjoy performing with improv groups, where I've honed my quick thinking and public speaking skills through the joy and creativity of improvcomedy.",
    icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
  },
];

export default function Hobbies() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hobbies</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          When I'm not building products, you can find me pursuing these passions:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {hobby.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{hobby.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {hobby.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-16 border-gray-300 dark:border-gray-700" />

      <div id="barber" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-6">Barber Portfolio</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          If you like my work below, schedule your appointment{' '}
          <a 
            href="/guidance#book" 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            here
          </a>
          !
        </p>
        <ImageGallery />
      </div>

      <hr className="my-16 border-gray-300 dark:border-gray-700" />

      <div id="reading" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-6">Reading List</h2>
        <div className="flex items-center gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You can see some books I've been reading here:
          </p>
          <a 
            href="https://www.goodreads.com/review/list/37296901?shelf=read" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <img 
              src="https://s.gr-assets.com/images/badge/badge1.jpg" 
              alt="Yoel's book recommendations on Goodreads" 
              className="rounded-lg shadow-md h-8"
            />
          </a>
        </div>
      </div>
    </main>
  );
} 