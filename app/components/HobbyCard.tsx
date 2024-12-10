'use client';

type HobbyProps = {
  hobby: {
    title: string;
    description: string;
    icon: React.ReactNode;
    link?: string;
  };
};

export default function HobbyCard({ hobby }: HobbyProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
        ${hobby.link ? 'transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500 cursor-pointer' : ''}`}
      onClick={() => hobby.link && window.open(hobby.link, '_blank')}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {hobby.icon}
        </div>
        <div>
          <h3 className={`text-xl font-bold mb-2 text-gray-900 dark:text-white ${hobby.link ? 'group-hover:text-blue-600 transition-colors' : ''}`}>
            {hobby.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-400">
            {hobby.description}
          </p>
        </div>
      </div>
    </div>
  );
} 