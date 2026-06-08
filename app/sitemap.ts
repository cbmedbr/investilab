import type { MetadataRoute } from 'next'
import { APP_URL } from '@/lib/config'
import { investmentTypes } from '@/content/investment-types'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: APP_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/aprender`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/calculadoras`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${APP_URL}/calculadoras/renda-fixa`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${APP_URL}/calculadoras/acoes`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${APP_URL}/calculadoras/fiis`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${APP_URL}/calculadoras/cripto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${APP_URL}/comparador`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${APP_URL}/sobre`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${APP_URL}/aviso-legal`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const aprenderPages: MetadataRoute.Sitemap = Object.keys(investmentTypes).map(
    (slug) => ({
      url: `${APP_URL}/aprender/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })
  )

  return [...staticPages, ...aprenderPages]
}
