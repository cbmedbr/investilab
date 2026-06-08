'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LogOut, BarChart3, Calculator, Trash2 } from 'lucide-react'

interface Scenario {
  id: string
  name: string
  description: string | null
  updated_at: string
}

interface Calculation {
  id: string
  type: string
  created_at: string
}

interface AccountContentProps {
  user: { email: string; displayName: string }
  scenarios: Scenario[]
  calculations: Calculation[]
}

const typeLabels: Record<string, string> = {
  renda_fixa: 'Renda Fixa',
  acoes: 'Ações',
  fii: 'FII',
  cripto: 'Cripto',
}

export function AccountContent({
  user,
  scenarios,
  calculations,
}: AccountContentProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  async function deleteScenario(id: string) {
    await supabase.from('il_scenarios').delete().eq('id', id)
    router.refresh()
  }

  async function deleteCalculation(id: string) {
    await supabase.from('il_calculations').delete().eq('id', id)
    router.refresh()
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minha conta</h1>
          <p className="text-muted-foreground mt-1">
            {user.displayName && (
              <span className="font-medium text-foreground">
                {user.displayName}
              </span>
            )}{' '}
            — {user.email}
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Cenários */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Cenários salvos</h2>
        </div>

        {scenarios.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <p>Nenhum cenário salvo ainda.</p>
              <p className="text-sm mt-1">
                Use o{' '}
                <a href="/comparador" className="underline hover:text-foreground">
                  Comparador
                </a>{' '}
                para criar e salvar cenários.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {scenarios.map((s) => (
              <Card key={s.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{s.name}</p>
                    {s.description && (
                      <p className="text-sm text-muted-foreground">
                        {s.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Atualizado em{' '}
                      {new Date(s.updated_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/comparador?cenario=${s.id}`)}
                    >
                      Abrir
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteScenario(s.id)}
                      aria-label="Excluir cenário"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator className="mb-10" />

      {/* Cálculos salvos */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Cálculos salvos</h2>
        </div>

        {calculations.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <p>Nenhum cálculo salvo ainda.</p>
              <p className="text-sm mt-1">
                Use as{' '}
                <a
                  href="/calculadoras"
                  className="underline hover:text-foreground"
                >
                  Calculadoras
                </a>{' '}
                e clique em &quot;Salvar&quot; para guardar seus cálculos.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {calculations.map((c) => (
              <Card key={c.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                      {typeLabels[c.type] ?? c.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCalculation(c.id)}
                    aria-label="Excluir cálculo"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
