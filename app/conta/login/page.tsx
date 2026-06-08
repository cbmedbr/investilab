import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Faça login para salvar seus cenários e cálculos.',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">
        Entrar
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Faça login para salvar seus cenários e cálculos.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
