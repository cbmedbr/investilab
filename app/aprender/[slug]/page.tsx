import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { investmentTypes } from '@/content/investment-types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = investmentTypes[slug]
  if (!content) return {}
  return {
    title: content.title,
    description: content.subtitle,
  }
}

export function generateStaticParams() {
  return Object.keys(investmentTypes).map((slug) => ({ slug }))
}

export default async function AprenderSlugPage({ params }: Props) {
  const { slug } = await params
  const content = investmentTypes[slug]
  if (!content) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <span className="text-sm text-muted-foreground">{content.category}</span>
      <h1 className="text-3xl font-bold tracking-tight mt-1 mb-2">
        {content.title}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">{content.subtitle}</p>

      {content.sections.map((section) => (
        <section key={section.heading} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
          <div className="prose dark:prose-invert max-w-none">
            {section.body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}

      {content.whatToAnalyze && (
        <section className="mb-8 rounded-lg border bg-muted/40 p-6">
          <h2 className="text-xl font-semibold mb-3">
            O que analisar antes de investir
          </h2>
          <ul className="space-y-2">
            {content.whatToAnalyze.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
