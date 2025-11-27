// "use client"

// import Link from "next/link"
// import { useEffect, useRef, useState } from "react"

// export default function AboutPage() {
//   const [isDark, setIsDark] = useState(true)
//   const sectionsRef = useRef<(HTMLElement | null)[]>([])

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", isDark)
//   }, [isDark])

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in-up")
//           }
//         })
//       },
//       { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
//     )

//     sectionsRef.current.forEach((section) => {
//       if (section) observer.observe(section)
//     })

//     return () => observer.disconnect()
//   }, [])

//   const toggleTheme = () => {
//     setIsDark(!isDark)
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
//         {/* Header */}
//         <header className="py-12 sm:py-20">
//           <div className="space-y-4">
//             <Link href="/" className="text-sm text-accent hover:text-accent/80 transition-colors">
//               ← Back to Home
//             </Link>
//             <h1 className="text-4xl sm:text-5xl font-light">About Me</h1>
//           </div>
//         </header>

//         {/* Bio Section */}
//         <section
//           ref={(el) => { sectionsRef.current[0] = el }}
//           className="py-12 sm:py-20 border-b border-border opacity-0"
//         >
//           <div className="space-y-6">
//             <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
//               I'm a Frontend Developer from the Philippines with a passion for crafting digital experiences at the
//               intersection of design, technology, and user experience. With over 5 years of professional experience,
//               I've had the privilege of working with some of the world's leading companies.
//             </p>
//             <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
//               My journey in web development started with a curiosity about how things work on the internet. Today, I
//               focus on building performant, accessible, and beautiful interfaces that solve real problems for users.
//             </p>
//           </div>
//         </section>

//         {/* Expertise Section */}
//         <section
//           ref={(el) => { sectionsRef.current[1] = el }}
//           className="py-12 sm:py-20 border-b border-border opacity-0"
//         >
//           <div className="space-y-8">
//             <h2 className="text-2xl sm:text-3xl font-light">Expertise</h2>
//             <div className="grid sm:grid-cols-2 gap-8">
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-accent">Frontend Development</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Proficient in React, TypeScript, and modern frontend tooling. I build responsive, accessible
//                   interfaces with attention to performance and user experience.
//                 </p>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-accent">Full Stack Development</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Experience with Node.js, databases, and API design. I can take projects from concept to production
//                   across the entire stack.
//                 </p>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-accent">Design Systems</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Built and maintained scalable design systems that enable teams to create consistent, cohesive digital
//                   products.
//                 </p>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-accent">Performance Optimization</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Deep focus on web performance, accessibility, and SEO best practices to create products that perform
//                   well for everyone.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Skills Section */}
//         <section
//           ref={(el) => { sectionsRef.current[2] = el }}
//           className="py-12 sm:py-20 border-b border-border opacity-0"
//         >
//           <div className="space-y-6">
//             <h2 className="text-2xl sm:text-3xl font-light">Technical Skills</h2>
//             <div className="grid sm:grid-cols-3 gap-6">
//               <div>
//                 <div className="text-sm font-mono text-accent mb-3">LANGUAGES</div>
//                 <div className="flex flex-wrap gap-2">
//                   {["JavaScript", "TypeScript", "HTML", "CSS", "Ruby", "SQL"].map((skill) => (
//                     <span
//                       key={skill}
//                       className="px-3 py-1 text-sm border border-border rounded-full hover:border-accent/50 transition-colors"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm font-mono text-accent mb-3">FRAMEWORKS</div>
//                 <div className="flex flex-wrap gap-2">
//                   {["React", "Next.js", "Node.js", "Express", "GraphQL"].map((skill) => (
//                     <span
//                       key={skill}
//                       className="px-3 py-1 text-sm border border-border rounded-full hover:border-accent/50 transition-colors"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm font-mono text-accent mb-3">TOOLS</div>
//                 <div className="flex flex-wrap gap-2">
//                   {["Git", "Vercel", "Docker", "AWS", "Figma"].map((skill) => (
//                     <span
//                       key={skill}
//                       className="px-3 py-1 text-sm border border-border rounded-full hover:border-accent/50 transition-colors"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Philosophy Section */}
//         <section
//           ref={(el) => { sectionsRef.current[3] = el }}
//           className="py-12 sm:py-20 border-b border-border opacity-0"
//         >
//           <div className="space-y-6">
//             <h2 className="text-2xl sm:text-3xl font-light">My Philosophy</h2>
//             <div className="space-y-4">
//               <p className="text-lg text-muted-foreground leading-relaxed">
//                 I believe great software is built at the intersection of technical excellence and user empathy. Every
//                 line of code should serve a purpose, and every interface should feel intuitive.
//               </p>
//               <p className="text-lg text-muted-foreground leading-relaxed">
//                 I'm committed to writing accessible code, building performant applications, and creating delightful user
//                 experiences. Continuous learning is part of my identity—I'm always exploring new technologies and best
//                 practices.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section ref={(el) => { sectionsRef.current[4] = el }} className="py-12 sm:py-20 opacity-0">
//           <div className="space-y-6">
//             <h2 className="text-2xl sm:text-3xl font-light">Let's Work Together</h2>
//             <p className="text-lg text-muted-foreground leading-relaxed">
//               I'm always interested in new projects, collaborations, and conversations about technology and design.
//             </p>
//             <Link
//               href="/#connect"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-medium"
//             >
//               Get in Touch
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="py-12 sm:py-16 border-t border-border">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
//             <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
//               ← Back to Home
//             </Link>
//             <button
//               onClick={toggleTheme}
//               className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
//               aria-label="Toggle theme"
//             >
//               {isDark ? (
//                 <svg
//                   className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </footer>
//       </main>

//       <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
//     </div>
//   )
// }


"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Header */}
        <header className="py-12 sm:py-20">
          <div className="space-y-4">
            <Link href="/" className="text-sm text-accent hover:text-accent/80 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-light">About Me</h1>
          </div>
        </header>

        {/* Bio Section */}
        <section
          ref={(el) => { sectionsRef.current[0] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              I'm a Full-Stack Engineer, AI Engineer, and automation-focused developer 
              based in Accra, Ghana. I build scalable, intelligent applications across the stack using 
              tools like React, Next.js, Remix, Laravel, Node.js, and modern AI frameworks. 
              My work blends engineering, design, and problem-solving to create systems that feel 
              fast, intuitive, and impactful.
            </p>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              I’ve built everything from full-stack content platforms and Laravel-based government 
              portals to real-time IoT dashboards and AI-assisted tools. I currently serve as a 
              co-organizer for <a href="https://globalai.community/chapters/accra" className="underline">Global AI Accra</a> chapter of the <a href="https://globalai.community" className="underline">Global AI Community</a>, where I help developers understand AI and build 
              practical, real-world automations. I’m driven by curiosity, continuous learning, and 
              a mission to build technology that genuinely improves people’s lives.
            </p>
          </div>
        </section>

        {/* Expertise Section */}
        <section
          ref={(el) => { sectionsRef.current[1] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-light">Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-8">

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-accent">Full-Stack Development</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience building complete applications using Laravel, PHP, Node.js with Express, 
                  MySQL, MongoDB, and full-stack frameworks like Next.js and Remix. 
                  I develop everything from APIs to admin portals to real-time systems.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-accent">Frontend Engineering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Skilled in React, Next.js, Remix, Tailwind CSS, and building responsive, clean, 
                  performance-driven interfaces. I’ve built complex dashboards, admin panels, and 
                  client portals used by real businesses.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-accent">AI Engineering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Integrating LLMs, automation workflows, and intelligent features into applications. 
                  I build AI-assisted tools, workflow automations, and system integrations using modern 
                  AI platforms and developer tooling.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-accent">IoT Dashboards & Real-Time Apps</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built real-time monitoring dashboards using Remix, websockets, and cloud services. 
                  These systems handle live device data, transforming sensor readings into meaningful 
                  and actionable insights for end users.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={(el) => { sectionsRef.current[2] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-light">Technical Skills</h2>
            <div className="grid sm:grid-cols-3 gap-6">

              <div>
                <div className="text-sm font-mono text-accent mb-3">LANGUAGES</div>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "TypeScript", "PHP", "SQL", "Python", "HTML", "CSS"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm border border-border rounded-full hover:border-accent/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-mono text-accent mb-3">FRAMEWORKS</div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Remix", "Laravel", "Node.js", "Express"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm border border-border rounded-full hover:border-accent/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-mono text-accent mb-3">TOOLS</div>
                <div className="flex flex-wrap gap-2">
                  {["Git", "GitHub", "Docker", "Figma", "OpenAI", "Cloudflare", "Supabase"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm border border-border rounded-full hover:border-accent/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section
          ref={(el) => { sectionsRef.current[3] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-light">My Philosophy</h2>
            <div className="space-y-4">

              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe great engineering blends precision, creativity, and empathy. 
                Whether I’m building a dashboard, a full product, or an automation workflow, 
                my goal is always the same: solve a real problem and make the experience feel effortless.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I care about delivering clean code, reliable performance, and thoughtful user experience. 
                I’m constantly learning and exploring AI, automation, full-stack design patterns, and modern 
                tools that help me build better, faster, and smarter.
              </p>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={(el) => { sectionsRef.current[4] = el }}
          className="py-12 sm:py-20 opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-light">Let's Build Something</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether it's AI integrations, automation pipelines, full-stack applications, or real-time dashboards, 
              I’m always open to new collaborations and projects that push ideas into reality.
            </p>

            <Link
              href="mailto:elliotawe@outlook.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-medium"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>

            <button
              onClick={toggleTheme}
              className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </footer>

      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
