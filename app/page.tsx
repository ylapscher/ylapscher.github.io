import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Jane Smith
            <span className="block text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mt-2">
              Senior Product Manager
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about building user-centric products that solve real problems.
            10+ years of experience in leading cross-functional teams and delivering
            impactful solutions.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-4xl">
        {/* Work Experience Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
          <div className="space-y-8">
            {[
              {
                role: "Senior Product Manager",
                company: "Tech Corp Inc.",
                duration: "2020 - Present",
                location: "San Francisco, CA",
                achievements: [
                  "Led product strategy for flagship SaaS platform generating $10M ARR",
                  "Managed a cross-functional team of 15 members across 3 time zones",
                  "Implemented new agile processes resulting in 30% faster delivery times"
                ]
              },
              {
                role: "Product Manager",
                company: "StartupCo",
                duration: "2018 - 2020",
                location: "New York, NY",
                achievements: [
                  "Launched 3 major product features that increased user retention by 45%",
                  "Conducted user research with 200+ customers to inform product roadmap",
                  "Collaborated with engineering to reduce technical debt by 25%"
                ]
              }
            ].map((job, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{job.role}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                    <p>{job.duration}</p>
                    <p>{job.location}</p>
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
          <h2 className="text-2xl font-bold mb-8">Let's Connect</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:jane.smith@example.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/janesmith"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Jane Smith. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
