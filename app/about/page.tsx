import type { Metadata } from "next"
import AboutContent from "./about-content"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Elliot Awe's philosophy and experience as a Full-Stack & AI Engineer based in Accra, Ghana.",
  alternates: {
    canonical: "https://elliotawe.co/about",
  },
  openGraph: {
    title: "About | Elliot Awe",
    description: "Learn about Elliot Awe's philosophy and experience as a Full-Stack & AI Engineer based in Accra, Ghana.",
    url: "https://elliotawe.co/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Elliot Awe",
    description: "Learn about Elliot Awe's philosophy and experience as a Full-Stack & AI Engineer based in Accra, Ghana.",
  },
}

export default function AboutPage() {
  return <AboutContent />
}
