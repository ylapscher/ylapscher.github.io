import Image from 'next/image';
import ImageGallery from '../components/ImageGallery';
import HobbiesGrid from './HobbiesGrid';
import PageHeader from '../components/PageHeader';
import { CONTACT_EMAIL } from '../lib/site';
import { getReadingList } from '../lib/reading-list';

export default async function Hobbies() {
  const books = await getReadingList();

  return (
    <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <PageHeader eyebrow="§ Outside work" title="Hobbies">
        Off the clock: climbing, hot yoga, jazz piano, improv, and cutting hair.
      </PageHeader>

      <HobbiesGrid />

      <div id="barber" className="mb-16 scroll-mt-20 border-t border-rule pt-14">
        <PageHeader as="h2" eyebrow="§ Before &amp; after" title="Barber portfolio">
          If you like my work below,{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-signal hover:brightness-110 underline underline-offset-4"
          >
            email me
          </a>{' '}
          for a cut.
        </PageHeader>
        <ImageGallery aspectRatio="4 / 3" />
      </div>

      <div id="reading" className="mb-16 scroll-mt-20 border-t border-rule pt-14">
        <PageHeader as="h2" eyebrow="§ Recently read" title="Reading list" />

        {books.length > 0 ? (
          <>
            <p className="text-muted mb-6">
              A few of the books I've read recently:
            </p>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {books.slice(0, 12).map((book) => (
                <a
                  key={book.link || book.title}
                  href={book.link || 'https://www.goodreads.com/review/list/37296901?shelf=read'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 w-28 sm:w-32 transition-transform motion-safe:hover:-translate-y-1"
                  title={`${book.title}${book.author ? ` by ${book.author}` : ''}`}
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden ring-1 ring-rule-hi bg-ink/5">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-ink line-clamp-2 group-hover:text-signal transition-colors">
                    {book.title}
                  </p>
                </a>
              ))}
            </div>
            <a
              href="https://www.goodreads.com/review/list/37296901?shelf=read"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-[11px] uppercase tracking-util text-signal border-b border-signal/40 pb-0.5 hover:brightness-110"
            >
              See the full list on Goodreads &rarr;
            </a>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-muted">
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
                className="h-8 w-auto object-contain"
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
