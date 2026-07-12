import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      // Explicit allow for AI answer-engine crawlers — the wildcard rule
      // above already covers them, but naming them keeps intent obvious
      // and survives a future edit that scopes the wildcard rule down.
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://elliotawe.co/sitemap.xml',
  }
}
