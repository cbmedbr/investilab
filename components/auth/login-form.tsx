'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { Loader2, Mail, KeyRound } from 'lucide-react'
import { APP_URL } from '@/lib/config'

type Tab = 'senha' | 'magic'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/conta'

  const [tab, setTab] = useState<Tab>('senha')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleEmailPassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName || undefined },
          emailRedirectTo: `${APP_URL}/auth/callback?redirect=${redirect}`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Verifique seu e-mail para confirmar o cadastro.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        router.push(redirect)
        router.refresh()
      }
    }

    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${APP_URL}/auth/callback?redirect=${redirect}`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Link de acesso enviado! Verifique seu e-mail.')
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 justify-center mb-2">
          <Button
            variant={tab === 'senha' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTab('senha')}
          >
            <KeyRound className="h-4 w-4 mr-1" />
            E-mail e senha
          </Button>
          <Button
            variant={tab === 'magic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTab('magic')}
          >
            <Mail className="h-4 w-4 mr-1" />
            Magic link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tab === 'senha' ? (
          <form onSubmit={handleEmailPassword} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="displayName">Nome</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isSignUp ? 'Criar conta' : 'Entrar'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? 'Já tem conta?' : 'Não tem conta?'}{' '}
              <button
                type="button"
                className="underline hover:text-foreground"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
              >
                {isSignUp ? 'Entrar' : 'Criar conta'}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <Label htmlFor="email-magic">E-mail</Label>
              <Input
                id="email-magic"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Enviar link de acesso
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Enviaremos um link para seu e-mail. Clique nele para entrar sem
              senha.
            </p>
          </form>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-50 dark:bg-red-950/30 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-4 p-3 rounded-md bg-green-50 dark:bg-green-950/30 text-sm text-green-600 dark:text-green-400">
            {message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
