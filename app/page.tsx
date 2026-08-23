import Image from 'next/image';
import Link from 'next/link';
import ExperienceTimeline from './components/ExperienceTimeline';
import FieldNotes from './components/FieldNotes';
import JsonLd from './components/JsonLd';
import { career, experiences, initiatives, skills } from './data/home-data';
import { BOOKING_URL, CONTACT_EMAIL, RESUME_URL, SITE_NAME } from './lib/site';
import { personSchema } from './lib/structured-data';
import { textStyles, monoStyles } from './lib/typography';

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema} />
      {/* Hero Section */}
      <header className="relative notebook-grid border-b border-rule">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="relative grid grid-cols-1 md:grid-cols-[1.42fr_1fr] gap-8 md:gap-12 items-center py-12 sm:py-16 md:py-20">
            {/* Left column: the claim */}
            <div>
              <h1
                className="font-bold text-ink tracking-claim text-balance
                           text-[2.1rem] leading-[1.03] sm:text-5xl md:text-[3.4rem] md:leading-[1.015]
                           motion-safe:animate-rise"
              >
                Ten years finding money that&rsquo;s{' '}
                <span className="text-signal">stuck</span>.
              </h1>

              <p className="mt-5 max-w-[46ch] text-muted text-base sm:text-[1.03rem] leading-relaxed motion-safe:animate-rise [animation-delay:70ms]">
                Industrial engineer <span className="font-mono text-ink text-[0.94em]">&rarr;</span>{' '}
                software engineer <span className="font-mono text-ink text-[0.94em]">&rarr;</span>{' '}
                chief product officer. Now I find operational cost savings at
                Expense Reduction Coaching.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 motion-safe:animate-rise [animation-delay:140ms]">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-signal text-signal-ink font-semibold text-sm py-3 px-5
                             hover:brightness-110 focus-visible:outline focus-visible:outline-2
                             focus-visible:outline-offset-2 focus-visible:outline-signal transition"
                >
                  Work with me
                </a>
                <Link
                  href="/portfolio"
                  className={`${monoStyles.label} text-ink border-b border-rule-hi pb-0.5
                             hover:border-signal hover:text-signal focus-visible:outline
                             focus-visible:outline-2 focus-visible:outline-offset-2
                             focus-visible:outline-signal transition-colors`}
                >
                  See what I&rsquo;ve built &rarr;
                </Link>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${monoStyles.eyebrow} hover:text-signal focus-visible:outline
                             focus-visible:outline-2 focus-visible:outline-offset-2
                             focus-visible:outline-signal transition-colors`}
                >
                  R&eacute;sum&eacute; &#8599;
                </a>
              </div>
            </div>

            {/* Right column: portrait, hard-edged rather than a circle */}
            <div className="w-full max-w-[336px] md:ml-auto motion-safe:animate-rise [animation-delay:110ms]">
              <div className="relative aspect-[4/5] ring-1 ring-rule-hi">
                <Image
                  src="/images/profile-portrait.jpg"
                  alt="Portrait of Joe Lapscher"
                  fill
                  priority
                  sizes="(max-width: 768px) 336px, 336px"
                  className="object-cover"
                />
              </div>
              <p className={`${monoStyles.eyebrow} mt-3 leading-loose`}>
                <span className="text-ink">Joe Lapscher</span>
                <br />
                Cost Reduction Specialist | Engineer | Amateur Barber
              </p>
            </div>
          </div>
        </div>

        {/* Measurement rail: the ornament is the actual chronology. */}
        <div className="border-t border-rule">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <ol className="flex flex-wrap md:flex-nowrap">
              {career.map((stop, i) => (
                <li
                  key={stop.year}
                  className="relative basis-1/3 sm:basis-1/4 md:basis-0 md:flex-1 min-w-0 pt-4 pb-4 pr-2
                             motion-safe:animate-rise"
                  style={{ animationDelay: `${230 + i * 60}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 ${
                      stop.current ? 'w-0.5 h-3.5 bg-signal' : 'w-px h-2 bg-tick'
                    }`}
                  />
                  <span className={`${monoStyles.data} block text-[10.5px] text-muted mb-0.5`}>
                    {stop.year}
                  </span>
                  <span
                    className={`${monoStyles.label} block truncate ${
                      stop.current ? 'text-signal' : 'text-ink'
                    }`}
                  >
                    {stop.company}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <section className="mt-10 sm:mt-12 max-w-3xl">
          <p className="text-muted text-base leading-relaxed">
            {SITE_NAME} (also Yoel Lapscher) is a partner at Expense Reduction Coaching
            in Hoboken, New Jersey. He helps CEOs and CFOs of $10M–$100M manufacturers,
            hospitality groups, and 3PLs cut indirect spend — telecom, merchant
            processing, supplies, payroll, insurance, utilities — on a no-savings,
            no-fee basis. Before consulting he was a software engineer at GE, a product
            manager at Citrix, Raistone, and Transcard, and chief product officer at
            Tienda Pago. Email {CONTACT_EMAIL} or book a 15-minute intro when the job
            is cost reduction, fractional product leadership, a website, or PM mentoring.
          </p>
        </section>

        <hr className="my-8 border-rule" />

        {/* Work Experience Section */}
        <section id="experience" className="mb-12 sm:mb-16 md:mb-20 scroll-mt-20">
          <h2 className={`${textStyles.h2} mb-12 text-gray-900 dark:text-white`}>Experience</h2>
          <ExperienceTimeline experiences={experiences} />
        </section>

        <section id="volunteering-education" className="mt-16 sm:mt-20 mb-16 sm:mb-20 scroll-mt-20">
          <FieldNotes initiatives={initiatives} skills={skills} />
        </section>
      </main>
    </>
  );
}
