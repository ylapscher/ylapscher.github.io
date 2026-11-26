import {
  UserGroupIcon, // for improv comedy
  MusicalNoteIcon, // for piano
  FireIcon, // for hot yoga
} from '@heroicons/react/24/outline';

const hobbies = [
  {
    title: 'Rock Climbing',
    description:
      'Sport climbing outdoors, bouldering indoors. The best way I know to stay active and get pushed.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6 text-signal"
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
      'For flexibility and a clear head. The heat adds challenge and deepens the practice.',
    icon: <FireIcon className="w-6 h-6 text-signal" />,
  },
  {
    title: 'Piano',
    description:
      'Jazz, mostly. My creative outlet. Recordings on SoundCloud.',
    icon: <MusicalNoteIcon className="w-6 h-6 text-signal" />,
    link: 'https://soundcloud.com/ylapscher/tracks',
  },
  {
    title: 'Improv Comedy',
    description:
      'Performing with improv groups. Where I sharpened quick thinking and public speaking.',
    icon: <UserGroupIcon className="w-6 h-6 text-signal" />,
  },
];

export default function HobbiesGrid() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule-hi mb-12 sm:mb-16">
      {hobbies.map((hobby, i) => {
        const inner = (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>{hobby.icon}</div>
              <span className="font-mono tabular-nums text-[11px] text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3
              className={`text-xl font-bold mb-2 text-ink ${
                hobby.link ? 'group-hover:text-signal transition-colors' : ''
              }`}
            >
              {hobby.title}
              {hobby.link && <span className="ml-2 text-sm text-signal">&#8599;</span>}
            </h3>
            <p className="text-muted leading-relaxed">{hobby.description}</p>
          </>
        );
        const cell = 'block h-full p-6 sm:p-7';

        return (
          <li key={hobby.title} className="border-b border-r border-rule-hi">
            {hobby.link ? (
              <a
                href={hobby.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cell} group transition-colors hover:bg-ink/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal`}
              >
                {inner}
              </a>
            ) : (
              <div className={cell}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
