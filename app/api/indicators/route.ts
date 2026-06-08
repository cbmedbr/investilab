import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

/**
 * Indicadores do Banco Central — API SGS (Sistema Gerenciador de Séries Temporais)
 * Docs: https://dadosabertos.bcb.gov.br/dataset/11-taxa-de-juros---selic
 */
const BCB_BASE = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs'

const SERIES = [
  { id: 'selic', code: 432, unit: '% a.a.', label: 'Meta Selic' },
  { id: 'cdi', code: 4389, unit: '% a.a.', label: 'CDI anualizado' },
  { id: 'ipca_mensal', code: 433, unit: '% mês', label: 'IPCA mensal' },
  { id: 'ipca_12m', code: 13522, unit: '% a.a.', label: 'IPCA acumulado 12m' },
  { id: 'poupanca', code: 195, unit: '% mês', label: 'Poupança (rendimento mensal)' },
] as const

interface BCBResponse {
  data: string
  valor: string
}

async function fetchBCBSerie(code: number): Promise<BCBResponse | null> {
  try {
    const res = await fetch(
      `${BCB_BASE}.${code}/dados/ultimos/1?formato=json`,
      { signal: AbortSignal.timeout(10000) }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return null
    return data[0] as BCBResponse
  } catch {
    return null
  }
}

function parseBCBDate(dateStr: string): string {
  // BCB retorna "dd/mm/yyyy"
  const [day, month, year] = dateStr.split('/')
  return `${year}-${month}-${day}`
}

// Cache: revalida no máximo 1x por dia
const CACHE_MAX_AGE_HOURS = 24

export async function GET() {
  try {
    let supabase: ReturnType<typeof createServiceClient> | null = null
    try {
      supabase = createServiceClient()
    } catch {
      // Service role não configurada — busca direto do BCB sem cache
    }

    // Verificar cache no Supabase
    if (supabase) {
      const { data: cached } = await supabase
        .from('il_market_indicators')
        .select('*')

      if (cached && cached.length > 0) {
        const lastFetch = new Date(cached[0].fetched_at)
        const hoursAgo =
          (Date.now() - lastFetch.getTime()) / (1000 * 60 * 60)

        if (hoursAgo < CACHE_MAX_AGE_HOURS) {
          return NextResponse.json({
            indicators: cached,
            source: 'cache',
            cached_at: cached[0].fetched_at,
          })
        }
      }
    }

    // Buscar do BCB
    const results = await Promise.allSettled(
      SERIES.map(async (serie) => {
        const data = await fetchBCBSerie(serie.code)
        if (!data) return null
        return {
          id: serie.id as string,
          value: parseFloat(data.valor.replace(',', '.')),
          unit: serie.unit as string,
          label: serie.label as string,
          reference_date: parseBCBDate(data.data),
          fetched_at: new Date().toISOString(),
        }
      })
    )

    const indicators = results
      .filter(
        (r): r is PromiseFulfilledResult<{ id: string; value: number; unit: string; label: string; reference_date: string; fetched_at: string }> =>
          r.status === 'fulfilled' && r.value !== null
      )
      .map((r) => r.value)

    if (indicators.length === 0) {
      // BCB indisponível — retorna cache antigo se existir
      if (supabase) {
        const { data: staleCache } = await supabase
          .from('il_market_indicators')
          .select('*')

        if (staleCache && staleCache.length > 0) {
          return NextResponse.json({
            indicators: staleCache,
            source: 'stale_cache',
            cached_at: staleCache[0].fetched_at,
          })
        }
      }

      return NextResponse.json(
        { error: 'Não foi possível obter indicadores do BCB', indicators: [] },
        { status: 502 }
      )
    }

    // Salvar no cache (upsert via service role)
    if (supabase) {
      for (const ind of indicators) {
        await supabase.from('il_market_indicators').upsert(
          {
            id: ind.id,
            value: ind.value,
            unit: ind.unit,
            reference_date: ind.reference_date,
            fetched_at: ind.fetched_at,
          },
          { onConflict: 'id' }
        )
      }
    }

    return NextResponse.json({
      indicators,
      source: 'bcb',
      fetched_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Erro ao buscar indicadores:', error)
    return NextResponse.json(
      { error: 'Erro interno ao buscar indicadores', indicators: [] },
      { status: 500 }
    )
  }
}
