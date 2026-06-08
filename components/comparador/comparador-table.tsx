'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InfoTooltip } from '@/components/ui/info-tooltip'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Plus, Trash2, Copy, Save, FolderOpen, Settings2 } from 'lucide-react'
import { useIndicators } from '@/hooks/use-indicators'
import { createClient } from '@/lib/supabase/client'
import { calcularSharpe, calcularFaixaResultado } from '@/lib/finance/risk'
import { formatBRL, formatPercentValue, formatDecimal } from '@/lib/format'
import { ComparadorCharts } from './comparador-charts'
import {
  type ComparadorRow,
  type ComparadorAssumptions,
  type ComputedRow,
  type AssetClass,
  CLASS_LABELS,
  DEFAULT_TAX,
} from './types'

const LOCAL_STORAGE_KEY = 'investilab_comparador'

function createEmptyRow(prazo: number): ComparadorRow {
  return {
    id: crypto.randomUUID(),
    nome: '',
    classe: 'renda_fixa',
    aporte: 10000,
    prazoMeses: prazo,
    retornoEsperadoAA: 10,
    volatilidade: 2,
    tributacao: DEFAULT_TAX.renda_fixa,
    liquidez: 'Diária',
  }
}

export function ComparadorTable() {
  const { selic } = useIndicators()
  const router = useRouter()
  const searchParams = useSearchParams()
  const cenarioId = searchParams.get('cenario')

  const [rows, setRows] = useState<ComparadorRow[]>(() => [
    createEmptyRow(12),
  ])
  const [assumptions, setAssumptions] = useState<ComparadorAssumptions>({
    taxaLivreDeRisco: 13.25,
    prazoPadrao: 12,
  })
  const [scenarioName, setScenarioName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  // Update taxa livre de risco when indicators load
  useEffect(() => {
    if (selic) {
      setAssumptions((prev) => ({ ...prev, taxaLivreDeRisco: selic }))
    }
  }, [selic])

  // Load from localStorage
  useEffect(() => {
    if (cenarioId) return // loading from supabase instead
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const { rows: savedRows, assumptions: savedAssumptions } =
          JSON.parse(saved)
        if (savedRows?.length > 0) setRows(savedRows)
        if (savedAssumptions) setAssumptions((prev) => ({ ...prev, ...savedAssumptions }))
      }
    } catch {}
  }, [cenarioId])

  // Load scenario from Supabase
  useEffect(() => {
    if (!cenarioId) return
    const supabase = createClient()
    supabase
      .from('il_scenarios')
      .select('*')
      .eq('id', cenarioId)
      .single()
      .then(({ data }) => {
        if (data) {
          setRows(data.rows as ComparadorRow[])
          setAssumptions((prev) => ({
            ...prev,
            ...(data.assumptions as Partial<ComparadorAssumptions>),
          }))
          setScenarioName(data.name)
        }
      })
  }, [cenarioId])

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ rows, assumptions })
      )
    } catch {}
  }, [rows, assumptions])

  const computed: ComputedRow[] = useMemo(() => {
    return rows.map((row) => {
      const prazoAnos = row.prazoMeses / 12
      const retornoLiquidoAA = row.retornoEsperadoAA * (1 - row.tributacao)
      const retornoEsperadoRS =
        row.aporte * (Math.pow(1 + row.retornoEsperadoAA / 100, prazoAnos) - 1)
      const retornoLiquidoRS = retornoEsperadoRS * (1 - row.tributacao)
      const faixa = calcularFaixaResultado(
        row.aporte,
        row.retornoEsperadoAA,
        row.volatilidade,
        prazoAnos
      )
      const sharpe = calcularSharpe(
        row.retornoEsperadoAA,
        assumptions.taxaLivreDeRisco,
        row.volatilidade
      )

      return {
        ...row,
        retornoLiquidoAA,
        retornoEsperadoRS,
        retornoLiquidoRS,
        pessimista: faixa.pessimista - row.aporte,
        otimista: faixa.otimista - row.aporte,
        sharpe,
      }
    })
  }, [rows, assumptions.taxaLivreDeRisco])

  const bestSharpeId = useMemo(() => {
    let best: { id: string; sharpe: number } | null = null
    for (const r of computed) {
      if (r.sharpe !== null && (best === null || r.sharpe > best.sharpe)) {
        best = { id: r.id, sharpe: r.sharpe }
      }
    }
    return best?.id
  }, [computed])

  const updateRow = useCallback(
    (id: string, field: keyof ComparadorRow, value: string | number) => {
      setRows((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r
          const updated = { ...r, [field]: value }
          // Auto-update tributacao when class changes
          if (field === 'classe') {
            updated.tributacao = DEFAULT_TAX[value as AssetClass]
          }
          return updated
        })
      )
    },
    []
  )

  const addRow = () =>
    setRows((prev) => [...prev, createEmptyRow(assumptions.prazoPadrao)])
  const removeRow = (id: string) =>
    setRows((prev) => prev.filter((r) => r.id !== id))
  const duplicateRow = (id: string) => {
    const row = rows.find((r) => r.id === id)
    if (row) setRows((prev) => [...prev, { ...row, id: crypto.randomUUID() }])
  }

  async function saveToSupabase() {
    if (!scenarioName.trim()) return
    setSaving(true)
    setSaveMessage('')
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setSaveMessage('Faça login para salvar cenários.')
      setSaving(false)
      return
    }

    const payload = {
      user_id: user.id,
      name: scenarioName.trim(),
      rows: rows as unknown as Record<string, unknown>[],
      assumptions: assumptions as unknown as Record<string, unknown>,
    }

    let error
    if (cenarioId) {
      ;({ error } = await supabase
        .from('il_scenarios')
        .update(payload)
        .eq('id', cenarioId))
    } else {
      ;({ error } = await supabase.from('il_scenarios').insert(payload))
    }

    if (error) {
      setSaveMessage(error.message)
    } else {
      setSaveMessage('Cenário salvo!')
      setSaveDialogOpen(false)
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Premissas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            Premissas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="w-48">
              <Label>
                Taxa livre de risco (% a.a.)
                <InfoTooltip text="Usada no cálculo do Sharpe. Por padrão, a Selic atual." />
              </Label>
              <Input
                type="number"
                step="0.01"
                value={assumptions.taxaLivreDeRisco}
                onChange={(e) =>
                  setAssumptions((prev) => ({
                    ...prev,
                    taxaLivreDeRisco: parseFloat(e.target.value) || 0,
                  }))
                }
              />
            </div>
            <div className="w-36">
              <Label>Prazo padrão (meses)</Label>
              <Input
                type="number"
                value={assumptions.prazoPadrao}
                onChange={(e) =>
                  setAssumptions((prev) => ({
                    ...prev,
                    prazoPadrao: parseInt(e.target.value) || 12,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela editável */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Ativos / Cenários</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addRow}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger
                  render={
                    <Button variant="default" size="sm">
                      <Save className="h-4 w-4 mr-1" /> Salvar
                    </Button>
                  }
                />
                <DialogContent>
                  <DialogTitle>Salvar cenário</DialogTitle>
                  <DialogDescription>
                    Dê um nome ao cenário para salvá-lo na sua conta.
                  </DialogDescription>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Nome do cenário"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                    />
                    {saveMessage && (
                      <p className="text-sm text-muted-foreground">
                        {saveMessage}
                      </p>
                    )}
                    <div className="flex gap-2 justify-end">
                      <DialogClose
                        render={
                          <Button variant="outline">Cancelar</Button>
                        }
                      />
                      <Button
                        onClick={saveToSupabase}
                        disabled={saving || !scenarioName.trim()}
                      >
                        {saving ? 'Salvando...' : 'Salvar'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="p-2 min-w-[140px]">Nome</th>
                  <th className="p-2 min-w-[100px]">Classe</th>
                  <th className="p-2 min-w-[100px]">Aporte (R$)</th>
                  <th className="p-2 min-w-[80px]">Prazo (m)</th>
                  <th className="p-2 min-w-[90px]">
                    Retorno
                    <InfoTooltip text="Retorno esperado % a.a." />
                  </th>
                  <th className="p-2 min-w-[90px]">
                    Risco
                    <InfoTooltip text="Volatilidade % a.a. (desvio padrão)" />
                  </th>
                  <th className="p-2 min-w-[80px]">IR (%)</th>
                  <th className="p-2 min-w-[90px]">Liquidez</th>
                  <th className="p-2 min-w-[100px]">
                    Ret. líq. (R$)
                  </th>
                  <th className="p-2 min-w-[70px]">
                    Sharpe
                    <InfoTooltip text="(Retorno - Taxa livre) / Volatilidade. Quanto maior, melhor a relação risco/retorno." />
                  </th>
                  <th className="p-2 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {computed.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b hover:bg-muted/30 ${
                      row.id === bestSharpeId
                        ? 'bg-green-50 dark:bg-green-950/20'
                        : ''
                    }`}
                  >
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        value={row.nome}
                        placeholder="Ex: CDB 120% CDI"
                        onChange={(e) =>
                          updateRow(row.id, 'nome', e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1">
                      <select
                        className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
                        value={row.classe}
                        onChange={(e) =>
                          updateRow(row.id, 'classe', e.target.value)
                        }
                      >
                        {Object.entries(CLASS_LABELS).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        type="number"
                        value={row.aporte || ''}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            'aporte',
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        type="number"
                        value={row.prazoMeses || ''}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            'prazoMeses',
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        type="number"
                        step="0.1"
                        value={row.retornoEsperadoAA || ''}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            'retornoEsperadoAA',
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        type="number"
                        step="0.1"
                        value={row.volatilidade || ''}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            'volatilidade',
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        type="number"
                        step="1"
                        value={Math.round(row.tributacao * 100) || ''}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            'tributacao',
                            (parseFloat(e.target.value) || 0) / 100
                          )
                        }
                      />
                    </td>
                    <td className="p-1">
                      <Input
                        className="h-8 text-sm"
                        value={row.liquidez}
                        onChange={(e) =>
                          updateRow(row.id, 'liquidez', e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-right font-medium">
                      <span
                        className={
                          row.retornoLiquidoRS >= 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-500'
                        }
                      >
                        {formatBRL(row.retornoLiquidoRS)}
                      </span>
                    </td>
                    <td className="p-1 text-center">
                      {row.sharpe !== null ? (
                        <span className="font-medium">
                          {formatDecimal(row.sharpe)}
                        </span>
                      ) : (
                        '—'
                      )}
                      {row.id === bestSharpeId && (
                        <Badge
                          variant="secondary"
                          className="ml-1 text-[10px] px-1"
                        >
                          Melhor
                        </Badge>
                      )}
                    </td>
                    <td className="p-1">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => duplicateRow(row.id)}
                          aria-label="Duplicar"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeRow(row.id)}
                          disabled={rows.length <= 1}
                          aria-label="Remover"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      {computed.filter((r) => r.nome).length > 0 && (
        <ComparadorCharts rows={computed} bestSharpeId={bestSharpeId} />
      )}
    </div>
  )
}
