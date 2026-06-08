import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'
import { ComparadorTable } from '@/components/comparador/comparador-table'

export const metadata: Metadata = {
  title: 'Comparador de investimentos',
  description:
    'Compare risco × retorno de diferentes investimentos em um cenário editável com gráficos.',
}

export default function ComparadorPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Comparador de investimentos
        </h1>
        <p className="text-muted-foreground mb-8">
          Monte cenários editáveis e visualize a relação risco × retorno de cada
          ativo. Salve na sua conta para acessar depois.
        </p>
        <Suspense>
          <ComparadorTable />
        </Suspense>
      </div>
      <DisclaimerBanner />
    </>
  )
}
