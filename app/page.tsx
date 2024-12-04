'use client';

import Image from 'next/image';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 relative">
            <Image
              src="/images/profile.jpg"
              alt="Joe Lapscher"
              fill
              priority
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Joe Lapscher
            <span className="block text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mt-2">
              Senior Product Manager
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Dynamic Senior Product Manager with a knack for driving innovation and launching successful products. I excel at managing the entire product life cycle, optimizing processes, and collaborating with teams to turn customer insights into solutions that really make a difference.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-4xl">
        {/* Work Experience Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                role: "Senior Product Manager",
                company: "Veeam Software",
                duration: "2023 - Present",
                location: "Prague, Czech Republic",
                achievements: [
                  "Leading product strategy for enterprise backup solutions",
                  "Managing cross-functional teams across multiple time zones",
                  "Driving innovation in cloud data protection solutions"
                ],
                image: {
                  src: "/images/transcard.png",
                  alt: "Transcard Project"
                }
              },
              {
                role: "Product Manager",
                company: "Avast",
                duration: "2021 - 2023",
                location: "Prague, Czech Republic",
                achievements: [
                  "Led development of consumer security products",
                  "Increased user engagement by 35% through feature optimization",
                  "Managed product lifecycle for mobile security solutions"
                ]
              },
              {
                role: "Associate Product Manager",
                company: "Cisco",
                duration: "2020 - 2021",
                location: "Prague, Czech Republic",
                achievements: [
                  "Collaborated on network security product development",
                  "Implemented agile methodologies improving delivery time by 25%",
                  "Conducted market research and competitive analysis"
                ]
              },
              {
                role: "Product Marketing Specialist",
                company: "Red Hat",
                duration: "2019 - 2020",
                location: "Brno, Czech Republic",
                achievements: [
                  "Developed go-to-market strategies for enterprise solutions",
                  "Created product messaging and positioning frameworks",
                  "Coordinated with global teams on product launches"
                ]
              },
              {
                role: "Technical Project Manager",
                company: "Oracle",
                duration: "2018 - 2019",
                location: "Prague, Czech Republic",
                achievements: [
                  "Managed cloud infrastructure projects",
                  "Led team of 8 developers across multiple projects",
                  "Improved project delivery efficiency by 30%"
                ]
              },
              {
                role: "Business Analyst",
                company: "SAP",
                duration: "2017 - 2018",
                location: "Prague, Czech Republic",
                achievements: [
                  "Analyzed business requirements for enterprise solutions",
                  "Developed detailed functional specifications",
                  "Facilitated communication between stakeholders and development teams"
                ]
              }
            ].map((job, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                  {job.image && (
                    <div className="flex-shrink-0">
                      <Image
                        src={job.image.src}
                        alt={job.image.alt}
                        width={48}
                        height={48}
                        className="rounded-lg bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl">{job.role}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <p>{job.duration}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Skills</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Product Strategy & Roadmapping",
              "User Research & Analytics",
              "Agile & Scrum Management",
              "Stakeholder Communication",
              "Data-Driven Decision Making",
              "Cross-functional Team Leadership",
            ].map((skill, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "E-commerce Platform Redesign",
                description: "Led a complete redesign resulting in 40% increase in conversion rate",
                duration: "2022 - 2023",
                impact: "Revenue growth of $2M annually",
              },
              {
                title: "Mobile App Launch",
                description: "Launched a new fintech app with 100K downloads in first month",
                duration: "2021 - 2022",
                impact: "4.8/5 App Store rating",
              },
            ].map((project, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>{project.duration}</p>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    {project.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Contact</h2>
          <div className="flex flex-row gap-4 justify-center">
            <a
              href="mailto:yoel@lapscher.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/ylapscher/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://world.hey.com/yoel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Blog
            </a>
            <a
              href="https://drive.google.com/file/d/1xGWebBdenzHo2Q7hjaM1R-Ep7yr8M8FU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Resume
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
