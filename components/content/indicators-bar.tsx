'use client'

import { useIndicators } from '@/hooks/use-indicators'
import { formatDecimal } from '@/lib/format'
import { Skeleton } from '@/components/ui/skeleton'

export function IndicatorsBar() {
  const { selic, cdi, ipca12m, poupanca, isLoading, error } = useIndicators()

  if (error) return null

  const items = [
    { label: 'Selic', value: selic, unit: '% a.a.' },
    { label: 'CDI', value: cdi, unit: '% a.a.' },
    { label: 'IPCA 12m', value: ipca12m, unit: '%' },
    { label: 'Poupança', value: poupanca, unit: '% mês' },
  ]

  return (
    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
      {items.map((item) => (
        <span key={item.label}>
          <span className="font-medium text-foreground">{item.label}:</span>{' '}
          {isLoading ? (
            <Skeleton className="inline-block w-12 h-3" />
          ) : item.value !== null ? (
            `${formatDecimal(item.value)} ${item.unit}`
          ) : (
            '—'
          )}
        </span>
      ))}
    </div>
  )
}
