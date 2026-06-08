'use client'

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  BarChart,
  Bar,
  Cell,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBRL, formatDecimal } from '@/lib/format'
import type { ComputedRow } from './types'

interface Props {
  rows: ComputedRow[]
  bestSharpeId: string | undefined
}

const COLORS = [
  'hsl(220, 70%, 55%)',
  'hsl(150, 60%, 45%)',
  'hsl(35, 90%, 55%)',
  'hsl(0, 70%, 55%)',
  'hsl(280, 60%, 55%)',
  'hsl(180, 60%, 45%)',
  'hsl(60, 70%, 45%)',
  'hsl(320, 60%, 55%)',
]

export function ComparadorCharts({ rows, bestSharpeId }: Props) {
  const namedRows = rows.filter((r) => r.nome)

  const scatterData = namedRows.map((r, i) => ({
    name: r.nome,
    x: r.volatilidade,
    y: r.retornoEsperadoAA,
    z: r.aporte,
    fill: COLORS[i % COLORS.length],
    isBest: r.id === bestSharpeId,
  }))

  const barData = namedRows.map((r, i) => ({
    name: r.nome,
    'Retorno bruto': r.retornoEsperadoRS,
    'Retorno líquido': r.retornoLiquidoRS,
    Pessimista: r.pessimista,
    Otimista: r.otimista,
    fill: COLORS[i % COLORS.length],
  }))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Scatter: Risco x Retorno */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risco × Retorno</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="x"
                  name="Risco"
                  unit="%"
                  fontSize={12}
                  label={{
                    value: 'Risco (volatilidade % a.a.)',
                    position: 'bottom',
                    fontSize: 11,
                  }}
                />
                <YAxis
                  dataKey="y"
                  name="Retorno"
                  unit="%"
                  fontSize={12}
                  label={{
                    value: 'Retorno % a.a.',
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 11,
                  }}
                />
                <ZAxis dataKey="z" range={[60, 400]} name="Aporte" />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null
                    const d = payload[0]?.payload
                    if (!d) return null
                    return (
                      <div className="bg-popover border rounded-md p-2 text-xs shadow-md">
                        <p className="font-medium">{d.name}</p>
                        <p>Retorno: {formatDecimal(d.y)}% a.a.</p>
                        <p>Risco: {formatDecimal(d.x)}%</p>
                        <p>Aporte: {formatBRL(d.z)}</p>
                      </div>
                    )
                  }}
                />
                <Scatter data={scatterData}>
                  {scatterData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      stroke={entry.isBest ? '#000' : undefined}
                      strokeWidth={entry.isBest ? 2 : 0}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {namedRows.map((r, i) => (
              <div key={r.id} className="flex items-center gap-1.5 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                {r.nome}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Barras: Retorno líquido */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Retorno líquido esperado (R$)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value, name) => [
                    formatBRL(Number(value)),
                    name,
                  ]}
                />
                <Legend fontSize={11} />
                <Bar dataKey="Retorno líquido" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Bar>
                <Bar dataKey="Pessimista" fill="hsl(0, 60%, 65%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Otimista" fill="hsl(150, 50%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
