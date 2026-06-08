import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Landmark, TrendingUp, Building2, Bitcoin } from 'lucide-react'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'
import { IndicatorsBar } from '@/components/content/indicators-bar'

export const metadata: Metadata = {
  title: 'Calculadoras de investimento',
  description:
    'Calcule rentabilidade líquida, impostos e indicadores para renda fixa, ações, FIIs e cripto.',
}

const calculators = [
  {
    href: '/calculadoras/renda-fixa',
    icon: Landmark,
    title: 'Renda Fixa',
    description:
      'Tesouro Direto, CDB, LCI/LCA e mais. Calcule rendimento bruto e líquido com IR e IOF.',
  },
  {
    href: '/calculadoras/acoes',
    icon: TrendingUp,
    title: 'Ações / ETFs',
    description:
      'Preço médio, lucro/prejuízo, IR (swing e day trade), dividend yield e valuation rápido.',
  },
  {
    href: '/calculadoras/fiis',
    icon: Building2,
    title: 'FIIs',
    description:
      'Dividend yield, P/VP, renda mensal estimada e magic number.',
  },
  {
    href: '/calculadoras/cripto',
    icon: Bitcoin,
    title: 'Cripto',
    description:
      'Preço médio (DCA), P&L e IR sobre ganho de capital com isenção de R$ 35 mil.',
  },
]

export default function CalculadorasPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Calculadoras de investimento
          </h1>
          <p className="text-muted-foreground text-lg">
            Simule rentabilidade líquida, impostos e indicadores para cada classe
            de ativo.
          </p>
          <IndicatorsBar />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <calc.icon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>{calc.title}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <DisclaimerBanner />
    </>
  )
}
