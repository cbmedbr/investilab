import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'

export const metadata: Metadata = {
  title: 'Calculadora de Cripto',
  description: 'Preço médio (DCA), P&L e IR sobre ganho de capital em criptoativos.',
}

export default function CriptoCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de Cripto
        </h1>
        <p className="text-muted-foreground mb-8">
          Calcule preço médio via DCA, P&L e imposto sobre ganho de capital.
        </p>
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Calculadora será implementada na Fase 3.
        </div>
      </div>
      <DisclaimerBanner />
    </>
  )
}
