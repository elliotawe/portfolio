"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import caseStudiesData from "@/lib/data/case-studies.json"

export type CaseStudy = {
  slug: string
  title: string
  role: string
  company: string
  year: string
  description: string
  challenge: string
  solution: string
  results: string[]
  tech: string[]
  demoLink: string
  images: string[]
}

const caseStudies: Record<string, CaseStudy> = caseStudiesData


export default function CaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  const caseStudy = caseStudies[slug]
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

  if (!caseStudy) {
    return <div>Case study not found</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header */}
        <header className="py-12 sm:py-20 border-b border-border">
          <div className="space-y-4">
            <Link href="/" className="text-sm text-accent hover:text-accent/80 transition-colors">
              ← Back to Home
            </Link>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono">{caseStudy.year}</div>
              <h1 className="text-4xl sm:text-5xl font-light">{caseStudy.title}</h1>
              <div className="flex items-center gap-2 text-lg text-muted-foreground">
                <span>{caseStudy.role}</span>
                <span>@</span>
                <span className="text-accent font-medium">{caseStudy.company}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Overview */}
        <section
          ref={(el) => { sectionsRef.current[0] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-light">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.description}</p>
          </div>
        </section>

        {/* Challenge */}
        <section
          ref={(el) => { sectionsRef.current[1] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-light">Challenge</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
          </div>
        </section>

        {/* Solution */}
        <section
          ref={(el) => { sectionsRef.current[2] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-light">Solution</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
          </div>
        </section>

        {/* Results */}
        <section
          ref={(el) => { sectionsRef.current[3] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-light">Results & Impact</h2>
            <ul className="space-y-3">
              {caseStudy.results.map((result, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-accent font-bold shrink-0">✓</span>
                  <span className="text-lg text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Technologies */}
        <section
          ref={(el) => { sectionsRef.current[4] = el }}
          className="py-12 sm:py-20 border-b border-border opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-light">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {caseStudy.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-accent/10 text-accent border border-accent/30 rounded-full text-sm font-medium hover:bg-accent/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Link */}
        <section ref={(el) => { sectionsRef.current[5] = el }} className="py-12 sm:py-20 opacity-0">
          <div className="space-y-6">
            <h2 className="text-2xl font-light">View Project</h2>
            <a
              href={caseStudy.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-medium"
            >
              Visit {caseStudy.company}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
            <div className="text-sm text-muted-foreground">© 2025 Felix Macaspac</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
