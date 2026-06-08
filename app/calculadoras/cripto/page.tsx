import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'
import { CriptoCalculator } from '@/components/calculators/cripto-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de Cripto',
  description:
    'Preço médio (DCA), P&L e IR sobre ganho de capital em criptoativos com isenção de R$ 35 mil.',
}

export default function CriptoCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de Cripto
        </h1>
        <p className="text-muted-foreground mb-8">
          Calcule preço médio via DCA, P&L e imposto sobre ganho de capital em
          criptoativos.
        </p>
        <CriptoCalculator />
      </div>
      <DisclaimerBanner />
    </>
  )
}
