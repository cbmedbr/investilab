'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { InfoTooltip } from '@/components/ui/info-tooltip'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash2 } from 'lucide-react'
import { calcularCrypto, type CryptoAporte } from '@/lib/finance/crypto'
import { ISENCAO_CRIPTO } from '@/lib/finance/tax'
import { TAX_REFERENCE_LABEL } from '@/lib/config'
import { formatBRL, formatPercentValue } from '@/lib/format'


export function CriptoCalculator() {
  const [aportes, setAportes] = useState<CryptoAporte[]>([
    { preco: 0, quantidade: 0 },
  ])
  const [precoAtual, setPrecoAtual] = useState(0)
  const [totalAlienadoMes, setTotalAlienadoMes] = useState(0)

  const addAporte = () => {
    setAportes([...aportes, { preco: 0, quantidade: 0 }])
  }

  const removeAporte = (index: number) => {
    if (aportes.length <= 1) return
    setAportes(aportes.filter((_, i) => i !== index))
  }

  const updateAporte = (
    index: number,
    field: keyof CryptoAporte,
    value: number
  ) => {
    const updated = [...aportes]
    updated[index] = { ...updated[index], [field]: value }
    setAportes(updated)
  }

  const result = useMemo(() => {
    const validAportes = aportes.filter((a) => a.preco > 0 && a.quantidade > 0)
    if (validAportes.length === 0 || precoAtual <= 0) return null
    return calcularCrypto({
      aportes: validAportes,
      precoAtual,
      totalAlienadoMes,
    })
  }, [aportes, precoAtual, totalAlienadoMes])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Aportes (DCA)
              <InfoTooltip text="Dollar Cost Averaging: adicione cada compra com preço e quantidade. O preço médio será calculado automaticamente." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aportes.map((aporte, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label className="text-xs">Preço unitário (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={aporte.preco || ''}
                    onChange={(e) =>
                      updateAporte(index, 'preco', parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Quantidade</Label>
                  <Input
                    type="number"
                    step="0.00000001"
                    value={aporte.quantidade || ''}
                    onChange={(e) =>
                      updateAporte(index, 'quantidade', parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAporte(index)}
                  disabled={aportes.length <= 1}
                  aria-label="Remover aporte"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addAporte} className="w-full">
              <Plus className="h-4 w-4 mr-1" /> Adicionar aporte
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label htmlFor="precoAtual">Preço atual (R$)</Label>
              <Input
                id="precoAtual"
                type="number"
                step="0.01"
                value={precoAtual || ''}
                onChange={(e) => setPrecoAtual(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="totalAlienadoMes">
                Total alienado (vendido) no mês (R$)
                <InfoTooltip
                  text={`Se as alienações no mês forem até ${formatBRL(ISENCAO_CRIPTO)}, o ganho de capital é isento de IR.`}
                />
              </Label>
              <Input
                id="totalAlienadoMes"
                type="number"
                step="0.01"
                value={totalAlienadoMes || ''}
                onChange={(e) =>
                  setTotalAlienadoMes(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">{TAX_REFERENCE_LABEL}</p>
          </CardContent>
        </Card>
      </div>

      {/* Resultados */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ResultItem label="Preço médio" value={formatBRL(result.precoMedio)} />
              <ResultItem label="Quantidade total" value={result.quantidadeTotal.toFixed(8)} />
              <ResultItem label="Custo total" value={formatBRL(result.custoTotal)} />
              <ResultItem label="Valor atual" value={formatBRL(result.valorAtual)} />
              <ResultItem
                label="Lucro / Prejuízo"
                value={formatBRL(result.lucro)}
                highlight={result.lucro >= 0}
                negative={result.lucro < 0}
              />
              <ResultItem
                label="Variação"
                value={formatPercentValue(result.variacao * 100)}
                highlight={result.variacao >= 0}
                negative={result.variacao < 0}
              />

              <Separator className="col-span-2 my-1" />

              <ResultItem
                label="IR devido"
                value={result.irDevido > 0 ? `- ${formatBRL(result.irDevido)}` : 'Isento'}
                negative={result.irDevido > 0}
              />
              <ResultItem
                label="Lucro líquido"
                value={formatBRL(result.lucroLiquido)}
                highlight={result.lucroLiquido >= 0}
                negative={result.lucroLiquido < 0}
              />
            </div>

            {result.valorDARF > 0 && (
              <div className="mt-4 p-3 rounded-md bg-amber-50 dark:bg-amber-950/30 text-sm">
                <p className="font-medium">DARF a pagar: {formatBRL(result.valorDARF)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Programa GCAP da Receita Federal. Vencimento: último dia útil do mês seguinte à venda.
                </p>
              </div>
            )}

            {result.irDevido === 0 && result.lucro > 0 && (
              <div className="mt-4 p-3 rounded-md bg-green-50 dark:bg-green-950/30 text-sm">
                <p className="text-green-700 dark:text-green-400">
                  Alienações até {formatBRL(ISENCAO_CRIPTO)}/mês — ganho isento de IR.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ResultItem({
  label,
  value,
  highlight,
  negative,
}: {
  label: string
  value: string
  highlight?: boolean
  negative?: boolean
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`text-sm font-semibold ${
          highlight
            ? 'text-green-600 dark:text-green-400'
            : negative
              ? 'text-red-500 dark:text-red-400'
              : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}
