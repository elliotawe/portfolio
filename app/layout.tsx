import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://elliotawe.co"),
  title: {
    template: "%s | Elliot Awe",
    default: "Elliot Awe - Full-Stack & AI Engineering",
  },
  description: "Full-Stack & AI Engineer crafting intelligent applications across the entire stack, from intuitive interfaces to scalable systems and AI-driven solutions.",
  keywords: [
    "Elliot Awe",
    "Software Engineer Accra",
    "AI Engineer Ghana",
    "Full-Stack Developer Ghana",
    "AI Automation Specialists",
    "Next.js Developer",
    "React Engineer Accra"
  ],
  authors: [{ name: "Elliot Awe" }],
  creator: "Elliot Awe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elliotawe.co",
    title: "Elliot Awe - Frontend & AI Engineer",
    description: "Architecting intelligent applications in Accra, Ghana. Specialized in Next.js, AI workflows, and scalable systems.",
    siteName: "Elliot Awe Portfolio",
    images: [
      {
        url: "/portrait.jpeg",
        width: 1200,
        height: 630,
        alt: "Elliot Awe Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elliot Awe - Frontend & AI Engineer",
    description: "Architecting intelligent applications. Specialized in Next.js, AI workflows, and scalable systems.",
    creator: "@elliot_awe",
    images: ["/portrait.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://elliotawe.co",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Elliot Awe",
  url: "https://elliotawe.co",
  image: "https://elliotawe.co/portrait.jpeg",
  jobTitle: "Full-Stack & AI Engineer",
  description: "Full-Stack & AI Engineer crafting intelligent applications across the entire stack, from intuitive interfaces to scalable systems and AI-driven solutions.",
  address: {
    "@type": "PostalAddress",
    "addressLocality": "Accra",
    "addressCountry": "Ghana"
  },
  sameAs: [
    "https://github.com/elliotawe",
    "https://linkedin.com/in/elliot-awe",
    "https://x.com/elliot_awe"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-sm">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}

