import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'
import { FIIsCalculator } from '@/components/calculators/fiis-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de FIIs',
  description:
    'Dividend yield, P/VP, renda mensal estimada e magic number para Fundos Imobiliários.',
}

export default function FIIsCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de FIIs
        </h1>
        <p className="text-muted-foreground mb-8">
          Calcule DY, P/VP, renda mensal estimada e magic number para Fundos
          Imobiliários.
        </p>
        <FIIsCalculator />
      </div>
      <DisclaimerBanner />
    </>
  )
}
