'use client'

import { useState, useEffect } from 'react'

export interface Indicator {
  id: string
  value: number
  unit: string
  label?: string
  reference_date: string
  fetched_at: string
}

interface IndicatorsResponse {
  indicators: Indicator[]
  source: 'cache' | 'bcb' | 'stale_cache'
  fetched_at?: string
  cached_at?: string
  error?: string
}

interface UseIndicatorsReturn {
  indicators: Indicator[]
  selic: number | null
  cdi: number | null
  ipca12m: number | null
  ipcaMensal: number | null
  poupanca: number | null
  isLoading: boolean
  error: string | null
  source: string | null
}

export function useIndicators(): UseIndicatorsReturn {
  const [data, setData] = useState<IndicatorsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchIndicators() {
      try {
        const res = await fetch('/api/indicators')
        const json: IndicatorsResponse = await res.json()

        if (!cancelled) {
          if (json.error && json.indicators.length === 0) {
            setError(json.error)
          } else {
            setData(json)
          }
        }
      } catch {
        if (!cancelled) {
          setError('Erro ao carregar indicadores de mercado')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchIndicators()
    return () => { cancelled = true }
  }, [])

  const getValue = (id: string): number | null => {
    if (!data) return null
    const ind = data.indicators.find((i) => i.id === id)
    return ind ? ind.value : null
  }

  return {
    indicators: data?.indicators ?? [],
    selic: getValue('selic'),
    cdi: getValue('cdi'),
    ipca12m: getValue('ipca_12m'),
    ipcaMensal: getValue('ipca_mensal'),
    poupanca: getValue('poupanca'),
    isLoading,
    error,
    source: data?.source ?? null,
  }
}
