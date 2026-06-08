import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Faça login para salvar seus cenários e cálculos.',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-bold tracking-tight mb-3 text-center">
        Entrar
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Faça login para salvar seus cenários e cálculos.
      </p>
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Login será implementado na Fase 4.
      </div>
    </div>
  )
}
