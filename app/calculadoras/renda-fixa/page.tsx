import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'

export const metadata: Metadata = {
  title: 'Calculadora de Renda Fixa',
  description: 'Calcule rendimento bruto e líquido de CDB, Tesouro, LCI/LCA e mais.',
}

export default function RendaFixaCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de Renda Fixa
        </h1>
        <p className="text-muted-foreground mb-8">
          Simule a rentabilidade bruta e líquida de investimentos em renda fixa.
        </p>
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Calculadora será implementada na Fase 3.
        </div>
      </div>
      <DisclaimerBanner />
    </>
  )
}
