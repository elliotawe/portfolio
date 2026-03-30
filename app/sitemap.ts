import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

export const dynamic = 'force-static'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elliotawe.co'
 
  // Main pages
  const routes = ['', '/about', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
 
  // Project dynamic pages
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
 
  return [...routes, ...projectRoutes]
}
