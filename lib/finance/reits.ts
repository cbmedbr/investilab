/**
 * Cálculos para FIIs (Fundos Imobiliários) — funções puras.
 */

export interface FIIInput {
  precoCota: number
  quantidade: number
  rendimentoMensalPorCota: number
  valorPatrimonialPorCota: number
}

export interface FIIResult {
  investimentoTotal: number
  dyMensal: number
  dyAnual: number
  pvp: number | null
  rendaMensalEstimada: number
  rendaAnualEstimada: number
  /** Cotas necessárias para o rendimento mensal pagar 1 cota */
  magicNumber: number | null
}

export function calcularFII(input: FIIInput): FIIResult {
  const investimentoTotal = input.precoCota * input.quantidade
  const rendaMensalEstimada = input.rendimentoMensalPorCota * input.quantidade
  const rendaAnualEstimada = rendaMensalEstimada * 12

  const dyMensal =
    input.precoCota > 0
      ? input.rendimentoMensalPorCota / input.precoCota
      : 0

  const dyAnual = dyMensal * 12

  const pvp =
    input.valorPatrimonialPorCota > 0
      ? input.precoCota / input.valorPatrimonialPorCota
      : null

  const magicNumber =
    input.rendimentoMensalPorCota > 0
      ? input.precoCota / input.rendimentoMensalPorCota
      : null

  return {
    investimentoTotal,
    dyMensal,
    dyAnual,
    pvp,
    rendaMensalEstimada,
    rendaAnualEstimada,
    magicNumber,
  }
}
