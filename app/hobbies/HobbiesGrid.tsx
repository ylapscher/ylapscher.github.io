import type { ReactNode } from 'react';
import {
  UserGroupIcon, // for improv comedy
  MusicalNoteIcon, // for piano
  FireIcon, // for hot yoga
} from '@heroicons/react/24/outline';

const hobbies = [
  {
    title: 'Rock Climbing',
    description:
      "I love sport climbing outdoors and bouldering indoors. It's a great way to stay active and challenge myself.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8 text-signal"
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
    title: 'Hot Yoga',
    description:
      'Practice hot yoga to maintain flexibility and mental clarity. The heat adds an extra challenge and helps deepen the practice.',
    icon: <FireIcon className="w-8 h-8 text-signal" />,
  },
  {
    title: 'Piano',
    description:
      "I'm a pianist with a love for jazz music. Music provides a creative outlet and a way to express my artistic side.",
    icon: <MusicalNoteIcon className="w-8 h-8 text-signal" />,
    link: 'https://soundcloud.com/ylapscher/tracks',
  },
  {
    title: 'Improv Comedy',
    description:
      "I enjoy performing with improv groups, where I've honed my quick thinking and public speaking skills through the joy and creativity of improv comedy.",
    icon: <UserGroupIcon className="w-8 h-8 text-signal" />,
  },
];

function HobbyCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function HobbiesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
      {hobbies.map((hobby) => {
        const className =
          'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700';
        const body = (
          <HobbyCard title={hobby.title} description={hobby.description} icon={hobby.icon} />
        );

        if (hobby.link) {
          return (
            <a
              key={hobby.title}
              href={hobby.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className} transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{hobby.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-signal">
                    {hobby.title}
                    <span className="ml-2 text-sm text-signal">↗</span>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400">{hobby.description}</p>
                </div>
              </div>
            </a>
          );
        }

        return (
          <div key={hobby.title} className={className}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
