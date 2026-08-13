import Image from 'next/image';
import ImageGallery from '../components/ImageGallery';
import HobbiesGrid from './HobbiesGrid';
import { getReadingList } from '../lib/reading-list';

export default async function Hobbies() {
  const books = await getReadingList();

  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Hobbies</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          When I'm not building products, you can find me pursuing these passions:
        </p>
      </div>

      <HobbiesGrid />

      <hr className="my-16 border-rule" />

      <div id="barber" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Barber Portfolio</h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
          If you like my work below, schedule your appointment{' '}
          <a 
            href="/services#book" 
            className="text-signal hover:brightness-110 text-signal hover:brightness-110 underline"
          >
            here
          </a>
          !
        </p>
        <ImageGallery />
      </div>

      <hr className="my-16 border-rule" />

      <div id="reading" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Reading List</h2>

        {books.length > 0 ? (
          <>
            <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
              A few of the books I've read recently:
            </p>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {books.slice(0, 12).map((book) => (
                <a
                  key={book.link || book.title}
                  href={book.link || 'https://www.goodreads.com/review/list/37296901?shelf=read'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 w-28 sm:w-32 transition-transform hover:scale-105"
                  title={`${book.title}${book.author ? ` by ${book.author}` : ''}`}
                >
                  <div className="relative w-full aspect-[2/3] rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-signal transition-colors">
                    {book.title}
                  </p>
                </a>
              ))}
            </div>
            <a
              href="https://www.goodreads.com/review/list/37296901?shelf=read"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-signal hover:brightness-110 text-sm underline"
            >
              See the full list on Goodreads &rarr;
            </a>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-700 dark:text-gray-400">
              You can see some books I've been reading here:
            </p>
            <a
              href="https://www.goodreads.com/review/list/37296901?shelf=read"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
              title="Joe's book recommendations on Goodreads"
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
        )}
      </div>
    </main>
  );
}
