'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { InfoTooltip } from '@/components/ui/info-tooltip'
import { Badge } from '@/components/ui/badge'
import { calcularRendaFixa, calcularPoupanca } from '@/lib/finance/fixed-income'
import { TAX_REFERENCE_LABEL } from '@/lib/config'
import { formatBRL, formatPercentValue } from '@/lib/format'
import { useIndicators } from '@/hooks/use-indicators'

interface FormData {
  valorInicial: number
  tipo: 'pos_cdi' | 'prefixado' | 'ipca'
  taxa: number
  prazoMeses: number
  isentoIR: boolean
}

export function RendaFixaCalculator() {
  const { selic, cdi, ipca12m } = useIndicators()

  const { register, watch, setValue } = useForm<FormData>({
    defaultValues: {
      valorInicial: 10000,
      tipo: 'pos_cdi',
      taxa: 100,
      prazoMeses: 12,
      isentoIR: false,
    },
    mode: 'onChange',
  })

  const values = watch()

  const result = useMemo(() => {
    if (!values.valorInicial || !values.taxa || !values.prazoMeses) return null
    try {
      return calcularRendaFixa({
        valorInicial: values.valorInicial,
        tipo: values.tipo,
        taxa: values.taxa,
        prazoMeses: values.prazoMeses,
        cdiAA: cdi ?? 13.15,
        ipcaAA: ipca12m ?? 4.5,
        isentoIR: values.isentoIR,
      })
    } catch {
      return null
    }
  }, [values, cdi, ipca12m])

  const poupancaResult = useMemo(() => {
    if (!values.valorInicial || !values.prazoMeses) return null
    return calcularPoupanca(
      values.valorInicial,
      values.prazoMeses,
      selic ?? 13.25
    )
  }, [values.valorInicial, values.prazoMeses, selic])

  const tipoLabel: Record<string, string> = {
    pos_cdi: '% do CDI',
    prefixado: '% a.a.',
    ipca: '% a.a. (spread real)',
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados do investimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="valorInicial">Valor aplicado (R$)</Label>
            <Input
              id="valorInicial"
              type="number"
              step="100"
              {...register('valorInicial', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Label htmlFor="tipo">
              Tipo
              <InfoTooltip text="Pós-fixado (% do CDI): rende conforme o CDI. Prefixado: taxa fixa. IPCA+: inflação + juros reais." />
            </Label>
            <select
              id="tipo"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register('tipo')}
            >
              <option value="pos_cdi">Pós-fixado (% do CDI)</option>
              <option value="prefixado">Prefixado</option>
              <option value="ipca">IPCA+</option>
            </select>
          </div>

          <div>
            <Label htmlFor="taxa">
              Taxa ({tipoLabel[values.tipo]})
              <InfoTooltip
                text={
                  values.tipo === 'pos_cdi'
                    ? `Percentual do CDI. Ex: 100 = 100% do CDI. CDI atual: ${cdi ? cdi.toFixed(2) : '...'}% a.a.`
                    : values.tipo === 'prefixado'
                      ? 'Taxa anual fixa. Ex: 12 = 12% a.a.'
                      : `Spread real acima do IPCA. Ex: 6.5 = IPCA + 6,5% a.a. IPCA 12m: ${ipca12m ? ipca12m.toFixed(2) : '...'}%`
                }
              />
            </Label>
            <Input
              id="taxa"
              type="number"
              step="0.1"
              {...register('taxa', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Label htmlFor="prazoMeses">Prazo (meses)</Label>
            <Input
              id="prazoMeses"
              type="number"
              min="1"
              max="600"
              {...register('prazoMeses', { valueAsNumber: true })}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="isentoIR"
              checked={values.isentoIR}
              onCheckedChange={(checked) =>
                setValue('isentoIR', checked as boolean)
              }
            />
            <Label htmlFor="isentoIR" className="cursor-pointer">
              Isento de IR
              <InfoTooltip text="LCI, LCA, CRI, CRA e debêntures incentivadas são isentos de IR para pessoa física." />
            </Label>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            {TAX_REFERENCE_LABEL}. Consulte a Receita Federal para valores
            oficiais.
          </p>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="space-y-4">
        {result && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resultado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <ResultItem
                    label="Valor final bruto"
                    value={formatBRL(result.valorFinalBruto)}
                  />
                  <ResultItem
                    label="Rendimento bruto"
                    value={formatBRL(result.rendimentoBruto)}
                  />
                  {result.iof > 0 && (
                    <ResultItem
                      label="IOF"
                      value={`- ${formatBRL(result.iof)}`}
                      negative
                    />
                  )}
                  {result.ir > 0 && (
                    <ResultItem
                      label="IR"
                      value={`- ${formatBRL(result.ir)}`}
                      negative
                    />
                  )}
                  {values.isentoIR && (
                    <div className="col-span-2">
                      <Badge variant="secondary">Isento de IR</Badge>
                    </div>
                  )}
                  <ResultItem
                    label="Valor final líquido"
                    value={formatBRL(result.valorFinalLiquido)}
                    highlight
                  />
                  <ResultItem
                    label="Rendimento líquido"
                    value={formatBRL(result.rendimentoLiquido)}
                  />
                  <ResultItem
                    label="Rentabilidade líquida total"
                    value={formatPercentValue(
                      result.rentabilidadeTotalLiquida * 100
                    )}
                  />
                  <ResultItem
                    label="Rentabilidade líquida a.a."
                    value={formatPercentValue(
                      result.rentabilidadeAALiquida * 100
                    )}
                  />
                </div>

                {/* Comparação com poupança */}
                {poupancaResult && (
                  <div className="mt-4 p-3 rounded-md bg-muted/50 text-sm">
                    <p className="font-medium mb-1">Comparação com a Poupança</p>
                    <p>
                      No mesmo prazo, a poupança renderia{' '}
                      <strong>{formatBRL(poupancaResult.rendimento)}</strong>{' '}
                      (final: {formatBRL(poupancaResult.valorFinal)}).
                    </p>
                    {result.rendimentoLiquido > poupancaResult.rendimento ? (
                      <p className="text-green-600 dark:text-green-400 mt-1">
                        Este investimento rende{' '}
                        {formatBRL(
                          result.rendimentoLiquido - poupancaResult.rendimento
                        )}{' '}
                        a mais que a poupança.
                      </p>
                    ) : (
                      <p className="text-amber-600 dark:text-amber-400 mt-1">
                        A poupança rende mais neste cenário.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gráfico */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evolução do montante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.evolucaoMensal}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="mes"
                        tickFormatter={(v) => `${v}m`}
                        fontSize={12}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          `R$ ${(v / 1000).toFixed(0)}k`
                        }
                        fontSize={12}
                      />
                      <RechartsTooltip
                        formatter={(value) => [formatBRL(Number(value)), 'Montante']}
                        labelFormatter={(label) => `Mês ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="valor"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
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
            ? 'text-green-600 dark:text-green-400 text-base'
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
