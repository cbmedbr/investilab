/**
 * Cálculos para ações e ETFs — funções puras.
 */

import { calcularIRAcoes } from './tax'

export interface EquitiesInput {
  precoCompra: number
  quantidade: number
  precoAtual: number
  dividendosRecebidos: number
  /** Tipo de operação */
  isDayTrade: boolean
  /** Se é ETF (não tem isenção de R$ 20 mil) */
  isETF: boolean
  /** Total vendido no mês em R$ */
  totalVendidoMes: number
}

export interface EquitiesResult {
  precoMedio: number
  custoTotal: number
  valorAtual: number
  lucroPreco: number
  valorizacao: number
  dividendYieldCusto: number
  lucroTotal: number
  irDevido: number
  lucroLiquido: number
  valorDARF: number
}

export function calcularAcoes(input: EquitiesInput): EquitiesResult {
  const custoTotal = input.precoCompra * input.quantidade
  const valorAtual = input.precoAtual * input.quantidade
  const lucroPreco = valorAtual - custoTotal
  const valorizacao = custoTotal > 0 ? lucroPreco / custoTotal : 0
  const dividendYieldCusto =
    custoTotal > 0 ? input.dividendosRecebidos / custoTotal : 0
  const lucroTotal = lucroPreco + input.dividendosRecebidos

  const irDevido = calcularIRAcoes(
    lucroPreco,
    input.totalVendidoMes,
    input.isDayTrade,
    input.isETF
  )

  return {
    precoMedio: input.precoCompra,
    custoTotal,
    valorAtual,
    lucroPreco,
    valorizacao,
    dividendYieldCusto,
    lucroTotal,
    irDevido,
    lucroLiquido: lucroTotal - irDevido,
    valorDARF: irDevido,
  }
}

// ============ Indicadores de valuation ============

export interface ValuationInput {
  precoAcao: number
  lucroPoracaoLPA: number
  valorPatrimonialPorAcao: number
  roe: number
  dividendYield: number
}

export interface ValuationResult {
  pl: number | null
  pvp: number | null
  roe: number
  dy: number
  leitura: string
}

export function calcularValuation(input: ValuationInput): ValuationResult {
  const pl =
    input.lucroPoracaoLPA > 0 ? input.precoAcao / input.lucroPoracaoLPA : null
  const pvp =
    input.valorPatrimonialPorAcao > 0
      ? input.precoAcao / input.valorPatrimonialPorAcao
      : null

  let leitura = ''
  if (pl !== null) {
    if (pl < 10) leitura += 'P/L baixo (pode indicar desconto). '
    else if (pl > 25) leitura += 'P/L alto (mercado precifica crescimento). '
    else leitura += 'P/L em faixa moderada. '
  }
  if (pvp !== null) {
    if (pvp < 1) leitura += 'P/VP abaixo de 1 (negociando abaixo do patrimônio). '
    else if (pvp > 3) leitura += 'P/VP elevado. '
  }
  if (input.dividendYield > 6) {
    leitura += 'DY atrativo para renda passiva. '
  }

  return {
    pl,
    pvp,
    roe: input.roe,
    dy: input.dividendYield,
    leitura: leitura.trim(),
  }
}
