import type { Metadata } from 'next'
import { DisclaimerBanner } from '@/components/layout/disclaimer-banner'

export const metadata: Metadata = {
  title: 'Calculadora de FIIs',
  description: 'Dividend yield, P/VP, renda mensal e magic number para Fundos Imobiliários.',
}

export default function FIIsCalculadoraPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Calculadora de FIIs
        </h1>
        <p className="text-muted-foreground mb-8">
          Calcule DY, P/VP, renda mensal estimada e magic number.
        </p>
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Calculadora será implementada na Fase 3.
        </div>
      </div>
      <DisclaimerBanner />
    </>
  )
}
