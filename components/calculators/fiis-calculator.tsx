'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InfoTooltip } from '@/components/ui/info-tooltip'
import { Badge } from '@/components/ui/badge'
import { calcularFII } from '@/lib/finance/reits'
import { TAX_REFERENCE_LABEL } from '@/lib/config'
import { formatBRL, formatPercentValue, formatDecimal } from '@/lib/format'

interface FormData {
  precoCota: number
  quantidade: number
  rendimentoMensalPorCota: number
  valorPatrimonialPorCota: number
}

export function FIIsCalculator() {
  const { register, watch } = useForm<FormData>({
    defaultValues: {
      precoCota: 0,
      quantidade: 10,
      rendimentoMensalPorCota: 0,
      valorPatrimonialPorCota: 0,
    },
    mode: 'onChange',
  })

  const values = watch()

  const result = useMemo(() => {
    if (!values.precoCota) return null
    return calcularFII({
      precoCota: values.precoCota,
      quantidade: values.quantidade,
      rendimentoMensalPorCota: values.rendimentoMensalPorCota,
      valorPatrimonialPorCota: values.valorPatrimonialPorCota,
    })
  }, [values])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados do FII</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="precoCota">Preço da cota (R$)</Label>
              <Input id="precoCota" type="number" step="0.01" {...register('precoCota', { valueAsNumber: true })} />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade de cotas</Label>
              <Input id="quantidade" type="number" {...register('quantidade', { valueAsNumber: true })} />
            </div>
          </div>

          <div>
            <Label htmlFor="rendimentoMensalPorCota">
              Rendimento mensal por cota (R$)
              <InfoTooltip text="Valor do rendimento (dividendo) distribuído mensalmente por cota." />
            </Label>
            <Input
              id="rendimentoMensalPorCota"
              type="number"
              step="0.01"
              {...register('rendimentoMensalPorCota', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Label htmlFor="valorPatrimonialPorCota">
              Valor patrimonial por cota (R$)
              <InfoTooltip text="VP/cota informado nos relatórios do fundo. Usado para calcular o P/VP." />
            </Label>
            <Input
              id="valorPatrimonialPorCota"
              type="number"
              step="0.01"
              {...register('valorPatrimonialPorCota', { valueAsNumber: true })}
            />
          </div>

          <div className="p-3 rounded-md bg-muted/50 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Tributação de FIIs</p>
            <p>Rendimentos mensais: <Badge variant="secondary" className="text-xs">Isentos de IR</Badge> para PF (requisitos: FII com +50 cotistas, negociado em bolsa, investidor com &lt;10% das cotas).</p>
            <p className="mt-1">Ganho na venda de cotas: 20% sobre o lucro, sem isenção.</p>
          </div>

          <p className="text-xs text-muted-foreground">{TAX_REFERENCE_LABEL}</p>
        </CardContent>
      </Card>

      {/* Resultados */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ResultItem label="Investimento total" value={formatBRL(result.investimentoTotal)} />
              <ResultItem
                label="DY mensal"
                value={formatPercentValue(result.dyMensal * 100)}
              />
              <ResultItem
                label="DY anual"
                value={formatPercentValue(result.dyAnual * 100)}
                highlight
              />
              {result.pvp !== null && (
                <ResultItem
                  label="P/VP"
                  value={formatDecimal(result.pvp)}
                />
              )}
              <ResultItem
                label="Renda mensal estimada"
                value={formatBRL(result.rendaMensalEstimada)}
                highlight
              />
              <ResultItem
                label="Renda anual estimada"
                value={formatBRL(result.rendaAnualEstimada)}
              />
            </div>

            {result.magicNumber !== null && (
              <div className="mt-4 p-3 rounded-md bg-muted/50 text-sm">
                <p className="font-medium mb-1">
                  Magic Number
                  <InfoTooltip text="Número de cotas necessárias para que o rendimento mensal pague 1 cota nova. Quanto menor, mais rápido o reinvestimento." />
                </p>
                <p className="text-lg font-bold">
                  {formatDecimal(result.magicNumber, 0)} cotas
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Com {formatDecimal(result.magicNumber, 0)} cotas, o rendimento mensal paga 1 cota nova de{' '}
                  {formatBRL(values.precoCota)}.
                </p>
              </div>
            )}

            {result.pvp !== null && (
              <div className="mt-4 p-3 rounded-md bg-muted/50 text-sm">
                <p>
                  {result.pvp < 0.95
                    ? 'P/VP abaixo de 1 — cota negociando com desconto sobre o patrimônio.'
                    : result.pvp > 1.1
                      ? 'P/VP acima de 1 — cota negociando com ágio sobre o patrimônio.'
                      : 'P/VP próximo de 1 — cota negociando próximo ao valor patrimonial.'}
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
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? 'text-green-600 dark:text-green-400 text-base' : ''}`}>
        {value}
      </p>
    </div>
  )
}
