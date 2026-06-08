'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { InfoTooltip } from '@/components/ui/info-tooltip'
import { Separator } from '@/components/ui/separator'
import { calcularAcoes, calcularValuation } from '@/lib/finance/equities'
import { ISENCAO_ACOES_SWING, IR_ACOES_DAYTRADE } from '@/lib/finance/tax'
import { TAX_REFERENCE_LABEL } from '@/lib/config'
import { formatBRL, formatPercentValue } from '@/lib/format'

interface FormData {
  precoCompra: number
  quantidade: number
  precoAtual: number
  dividendosRecebidos: number
  isDayTrade: boolean
  isETF: boolean
  totalVendidoMes: number
  lpa: number
  vpa: number
  roe: number
  dy: number
}

export function AcoesCalculator() {
  const { register, watch, setValue } = useForm<FormData>({
    defaultValues: {
      precoCompra: 0,
      quantidade: 100,
      precoAtual: 0,
      dividendosRecebidos: 0,
      isDayTrade: false,
      isETF: false,
      totalVendidoMes: 0,
      lpa: 0,
      vpa: 0,
      roe: 0,
      dy: 0,
    },
    mode: 'onChange',
  })

  const values = watch()

  const result = useMemo(() => {
    if (!values.precoCompra || !values.precoAtual) return null
    return calcularAcoes({
      precoCompra: values.precoCompra,
      quantidade: values.quantidade,
      precoAtual: values.precoAtual,
      dividendosRecebidos: values.dividendosRecebidos,
      isDayTrade: values.isDayTrade,
      isETF: values.isETF,
      totalVendidoMes: values.totalVendidoMes,
    })
  }, [values])

  const valuation = useMemo(() => {
    if (!values.precoAtual || (!values.lpa && !values.vpa)) return null
    return calcularValuation({
      precoAcao: values.precoAtual,
      lucroPoracaoLPA: values.lpa,
      valorPatrimonialPorAcao: values.vpa,
      roe: values.roe,
      dividendYield: values.dy,
    })
  }, [values.precoAtual, values.lpa, values.vpa, values.roe, values.dy])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Operação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="precoCompra">Preço de compra (R$)</Label>
                <Input id="precoCompra" type="number" step="0.01" {...register('precoCompra', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input id="quantidade" type="number" {...register('quantidade', { valueAsNumber: true })} />
              </div>
            </div>

            <div>
              <Label htmlFor="precoAtual">Preço atual / de venda (R$)</Label>
              <Input id="precoAtual" type="number" step="0.01" {...register('precoAtual', { valueAsNumber: true })} />
            </div>

            <div>
              <Label htmlFor="dividendosRecebidos">
                Dividendos recebidos (R$)
                <InfoTooltip text="Total de dividendos + JCP recebidos. Dividendos são isentos; JCP tem 15% retido na fonte." />
              </Label>
              <Input id="dividendosRecebidos" type="number" step="0.01" {...register('dividendosRecebidos', { valueAsNumber: true })} />
            </div>

            <div>
              <Label htmlFor="totalVendidoMes">
                Total vendido no mês (R$)
                <InfoTooltip text={`Se o total vendido no mês for até ${formatBRL(ISENCAO_ACOES_SWING)} (swing trade, não ETF), o ganho é isento de IR.`} />
              </Label>
              <Input id="totalVendidoMes" type="number" step="0.01" {...register('totalVendidoMes', { valueAsNumber: true })} />
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="isDayTrade"
                  checked={values.isDayTrade}
                  onCheckedChange={(v) => setValue('isDayTrade', v as boolean)}
                />
                <Label htmlFor="isDayTrade" className="cursor-pointer">
                  Day trade
                  <InfoTooltip text={`Day trade: ${(IR_ACOES_DAYTRADE * 100).toFixed(0)}% sobre o ganho, sem isenção.`} />
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isETF"
                  checked={values.isETF}
                  onCheckedChange={(v) => setValue('isETF', v as boolean)}
                />
                <Label htmlFor="isETF" className="cursor-pointer">
                  ETF
                  <InfoTooltip text="ETFs não têm a isenção de R$ 20 mil para swing trade." />
                </Label>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{TAX_REFERENCE_LABEL}</p>
          </CardContent>
        </Card>

        {/* Valuation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Valuation rápido
              <InfoTooltip text="Insira indicadores fundamentalistas para uma leitura rápida. Valores encontrados em sites como Status Invest." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lpa">
                  LPA (R$)
                  <InfoTooltip text="Lucro por ação (últimos 12 meses)" />
                </Label>
                <Input id="lpa" type="number" step="0.01" {...register('lpa', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="vpa">
                  VPA (R$)
                  <InfoTooltip text="Valor patrimonial por ação" />
                </Label>
                <Input id="vpa" type="number" step="0.01" {...register('vpa', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="roe">
                  ROE (%)
                  <InfoTooltip text="Retorno sobre patrimônio líquido" />
                </Label>
                <Input id="roe" type="number" step="0.1" {...register('roe', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="dy">
                  DY (%)
                  <InfoTooltip text="Dividend yield (proventos 12m / preço)" />
                </Label>
                <Input id="dy" type="number" step="0.1" {...register('dy', { valueAsNumber: true })} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resultado da operação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <ResultItem label="Custo total" value={formatBRL(result.custoTotal)} />
                <ResultItem label="Valor atual" value={formatBRL(result.valorAtual)} />
                <ResultItem
                  label="Lucro / Prejuízo"
                  value={formatBRL(result.lucroPreco)}
                  highlight={result.lucroPreco >= 0}
                  negative={result.lucroPreco < 0}
                />
                <ResultItem label="Valorização" value={formatPercentValue(result.valorizacao * 100)} />
                {result.dividendYieldCusto > 0 && (
                  <ResultItem
                    label="DY sobre custo"
                    value={formatPercentValue(result.dividendYieldCusto * 100)}
                  />
                )}
                <ResultItem label="Lucro total (+ dividendos)" value={formatBRL(result.lucroTotal)} />

                <Separator className="col-span-2 my-1" />

                <ResultItem
                  label={`IR devido (${values.isDayTrade ? '20%' : '15%'})`}
                  value={result.irDevido > 0 ? `- ${formatBRL(result.irDevido)}` : 'Isento'}
                  negative={result.irDevido > 0}
                />
                <ResultItem
                  label="Lucro líquido"
                  value={formatBRL(result.lucroLiquido)}
                  highlight={result.lucroLiquido >= 0}
                  negative={result.lucroLiquido < 0}
                />

                {result.valorDARF > 0 && (
                  <div className="col-span-2 p-3 rounded-md bg-amber-50 dark:bg-amber-950/30 text-sm">
                    <p className="font-medium">DARF a pagar: {formatBRL(result.valorDARF)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Código 6015 (swing) ou 6015 (day trade). Vencimento: último dia útil do mês seguinte.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {valuation && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Indicadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {valuation.pl !== null && (
                  <ResultItem label="P/L" value={valuation.pl.toFixed(2)} />
                )}
                {valuation.pvp !== null && (
                  <ResultItem label="P/VP" value={valuation.pvp.toFixed(2)} />
                )}
                {valuation.roe > 0 && (
                  <ResultItem label="ROE" value={formatPercentValue(valuation.roe)} />
                )}
                {valuation.dy > 0 && (
                  <ResultItem label="DY" value={formatPercentValue(valuation.dy)} />
                )}
              </div>
              {valuation.leitura && (
                <p className="text-sm text-muted-foreground mt-4 p-3 rounded-md bg-muted/50">
                  {valuation.leitura}
                </p>
              )}
            </CardContent>
          </Card>
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
