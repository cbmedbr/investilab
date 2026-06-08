import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'
import { AcoesCalculator } from '@/components/calculators/acoes-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de Ações / ETFs',
  description:
    'Preço médio, lucro/prejuízo, IR (swing e day trade), dividend yield e valuation rápido.',
}

export default function AcoesCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de Ações / ETFs
        </h1>
        <p className="text-muted-foreground mb-8">
          Calcule preço médio, P&L, IR e indicadores de valuation para ações e
          ETFs.
        </p>
        <AcoesCalculator />
      </div>
      <DisclaimerBanner />
    </>
  )
}
