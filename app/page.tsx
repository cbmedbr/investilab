import Link from 'next/link'
import { ArrowRight, BookOpen, Calculator, BarChart3 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_NAME } from '@/lib/config'

const features = [
  {
    icon: BookOpen,
    title: 'Aprender',
    description:
      'Entenda cada tipo de investimento, riscos, tributação e o que analisar antes de investir.',
    href: '/aprender',
  },
  {
    icon: Calculator,
    title: 'Calculadoras',
    description:
      'Calcule rentabilidade líquida, impostos e indicadores para renda fixa, ações, FIIs e cripto.',
    href: '/calculadoras',
  },
  {
    icon: BarChart3,
    title: 'Comparador',
    description:
      'Monte cenários editáveis de risco × retorno e descubra qual investimento faz mais sentido.',
    href: '/comparador',
  },
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Invista com conhecimento
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          O {APP_NAME} ajuda você a entender, calcular e comparar investimentos
          no mercado brasileiro — de forma educacional, sem &quot;dicas
          quentes&quot;.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/aprender" className={buttonVariants({ size: 'lg' })}>
            Começar a aprender <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/calculadoras" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Calculadoras
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <f.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}
