import { projects as caseStudies } from "@/lib/projects";
import type { AweLetter, HomeProject, NavSection, TimelineEntry } from "@/types";

export const NAV_SECTIONS: NavSection[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const HERO_ROLES = ["Software Engineer", "AI Engineer", "Creative Technologist", "Content Creator"];

export const HERO_NAME = "Elliot";

export const AWE_LETTERS: AweLetter[] = [
  { letter: "A", label: "About", href: "#about" },
  { letter: "W", label: "Work", href: "#work" },
  { letter: "E", label: "Experience", href: "#experience" },
];

export const ABOUT_STATEMENTS = [
  "I build software that feels human.",
  "I teach machines to solve problems.",
  "I create content that makes technology understandable.",
];

export const SKILL_TAGS = [
  "Next.js", "React", "TypeScript", "Remix", "Tailwind CSS", "Framer Motion",
  "Node.js", "Laravel", "PHP", "FastAPI", "REST APIs",
  "Azure AI Foundry", "OpenAI API", "LangChain", "RAG Systems", "Pinecone", "LLM Fine-tuning", "AI Agents",
  "Supabase", "PostgreSQL", "Redis", "Docker", "Vercel", "MongoDB",
];

// Reuses lib/projects.ts (the richer dataset backing /projects and /projects/[slug])
// plus two homepage-only extras that don't have a live link yet.
export const HOME_PROJECTS: HomeProject[] = [
  ...caseStudies.map((p) => ({
    slug: p.slug,
    href: p.link,
    img: p.thumbnail,
    title: p.title,
    tags: p.tags,
    desc: p.description,
    outcome: p.impact,
  })),
  {
    slug: "emailcalm",
    href: "#",
    img: "/showcase/emailcalm.png",
    title: "EmailCalm",
    tags: ["Next.js", "MongoDB", "Sentiment AI"],
  },
  {
    slug: "partyo",
    href: "#",
    img: "/showcase/partyo.png",
    title: "PartyO",
    tags: ["React", "Node.js", "Socket.io"],
  },
];

export const TIMELINE_ITEMS: TimelineEntry[] = [
  { year: "2022", label: "Learned." },
  { year: "2023", label: "Built." },
  { year: "2024", label: "Freelanced." },
  { year: "2025", label: "Scaled." },
  { year: "2026", label: "Building AI." },
];

export const PHILOSOPHY_WORDS = [
  "Technology", "should", "disappear.", "People", "shouldn't", "notice", "the",
  "engineering.", "They", "should", "remember", "the", "experience.",
];

export const SOCIAL_LINKS = [
  { href: "https://github.com/elliotawe", label: "GitHub" },
  { href: "https://linkedin.com/in/elliot-awe", label: "LinkedIn" },
  { href: "https://x.com/elliot_awe", label: "Twitter" },
];
