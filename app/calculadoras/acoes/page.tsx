import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'

export const metadata: Metadata = {
  title: 'Calculadora de Ações / ETFs',
  description: 'Preço médio, lucro/prejuízo, IR e dividend yield para ações e ETFs.',
}

export default function AcoesCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de Ações / ETFs
        </h1>
        <p className="text-muted-foreground mb-8">
          Calcule preço médio, P&L, IR e indicadores de valuation.
        </p>
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Calculadora será implementada na Fase 3.
        </div>
      </div>
      <DisclaimerBanner />
    </>
  )
}
