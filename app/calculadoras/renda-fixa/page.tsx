import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'
import { RendaFixaCalculator } from '@/components/calculators/renda-fixa-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de Renda Fixa',
  description:
    'Calcule rendimento bruto e líquido de CDB, Tesouro, LCI/LCA e mais. Com IR, IOF e comparação com poupança.',
}

export default function RendaFixaCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de Renda Fixa
        </h1>
        <p className="text-muted-foreground mb-8">
          Simule a rentabilidade bruta e líquida de investimentos em renda fixa
          (CDB, Tesouro Direto, LCI/LCA e mais).
        </p>
        <RendaFixaCalculator />
      </div>
      <DisclaimerBanner />
    </>
  )
}
