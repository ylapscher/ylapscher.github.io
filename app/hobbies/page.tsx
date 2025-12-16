'use client'

import { 
  UserGroupIcon, // for improv comedy
  MusicalNoteIcon, // for piano
  FireIcon, // for hot yoga
} from '@heroicons/react/24/outline';
import ImageGallery from '../components/ImageGallery';
import Image from 'next/image';

const hobbies = [
  {
    title: "Rock Climbing",
    description: "I love sport climbing outdoors and bouldering indoors. It's a great way to stay active and challenge myself.",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-8 h-8 text-blue-600"
        stroke="currentColor" 
        strokeWidth="1.5"
      >
        <path 
          d="M5 19L4 12L7 8L10 7L14 4L18 5L20 9L19 14L17 17L13 19L9 19L5 19Z" 
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
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
    link: "https://soundcloud.com/ylapscher/tracks"
  },
  {
    title: "Improv Comedy",
    description: "I enjoy performing with improv groups, where I've honed my quick thinking and public speaking skills through the joy and creativity of improvcomedy.",
    icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
  },
];

/**
 * Hobbies page component displaying personal interests and activities.
 * Includes hobby cards, barber portfolio gallery, and reading list section.
 * @returns {JSX.Element} The hobbies page with all hobby sections
 */
export default function Hobbies() {
  /**
   * Handles clicking on a hobby card with an optional link.
   * Opens the link in a new tab if provided.
   * @param {string} [link] - Optional URL to open
   */
  const handleHobbyClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Hobbies</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          When I'm not building products, you can find me pursuing these passions:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
              ${hobby.link ? 'transition-transform hover:scale-105 cursor-pointer' : ''}`}
            onClick={() => handleHobbyClick(hobby.link)}
            role={hobby.link ? 'button' : undefined}
            tabIndex={hobby.link ? 0 : undefined}
            onKeyDown={(e) => {
              if (hobby.link && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleHobbyClick(hobby.link);
              }
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {hobby.icon}
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 text-gray-900 dark:text-white 
                  ${hobby.link ? 'hover:text-blue-600 dark:hover:text-blue-400' : ''}`}>
                  {hobby.title}
                  {hobby.link && (
                    <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                      ↗
                    </span>
                  )}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  {hobby.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-16 border-gray-300 dark:border-gray-700" />

      <div id="barber" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Barber Portfolio</h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
          If you like my work below, schedule your appointment{' '}
          <a 
            href="/services#book" 
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
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Reading List</h2>
        <div className="flex items-center gap-4">
          <p className="text-lg text-gray-700 dark:text-gray-400">
            You can see some books I've been reading here:
          </p>
          <a 
            href="https://www.goodreads.com/review/list/37296901?shelf=read" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
            title="Yoel's book recommendations on Goodreads"
          >
            <Image 
              src="/images/goodreads-badge.jpg"
              alt="Goodreads reading list" 
              className="rounded-lg shadow-md h-8 w-auto object-contain"
              width={100}
              height={32}
            />
          </a>
        </div>
      </div>
    </main>
  );
} 