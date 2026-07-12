import type { Metadata } from "next"
import ProjectsContent from "./projects-content"

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of intelligent applications and systems built by Elliot Awe.",
  alternates: {
    canonical: "https://elliotawe.co/projects",
  },
  openGraph: {
    title: "Projects | Elliot Awe",
    description: "A showcase of intelligent applications and systems built by Elliot Awe.",
    url: "https://elliotawe.co/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Elliot Awe",
    description: "A showcase of intelligent applications and systems built by Elliot Awe.",
  },
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
