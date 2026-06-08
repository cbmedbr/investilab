import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minha conta',
  description: 'Seus cenários e cálculos salvos.',
}

export default function ContaPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-3">Minha conta</h1>
      <p className="text-muted-foreground mb-8">
        Acesse seus cenários e cálculos salvos.
      </p>
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Autenticação e cenários salvos serão implementados na Fase 4.
      </div>
    </div>
  )
}
