import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'

export const metadata: Metadata = {
  title: 'Comparador de investimentos',
  description: 'Compare risco × retorno de diferentes investimentos em um cenário editável.',
}

export default function ComparadorPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Comparador de investimentos
        </h1>
        <p className="text-muted-foreground mb-8">
          Monte cenários editáveis e visualize a relação risco × retorno de cada
          ativo.
        </p>
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Comparador será implementado na Fase 5.
        </div>
      </div>
      <DisclaimerBanner />
    </>
  )
}
