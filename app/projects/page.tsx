import type { Metadata } from "next"
import ProjectsContent from "./projects-content"

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of intelligent applications and systems built by Elliot Awe.",
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
