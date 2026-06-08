/**
 * Cálculos de renda fixa — funções puras.
 * Capitalização: dias úteis (base 252). DU ≈ meses × 21.
 * Dias corridos para IR/IOF: meses × 30 (ou datas reais se fornecidas).
 */

import { calcularImpostoRendaFixa } from './tax'

export type TipoRendaFixa = 'pos_cdi' | 'prefixado' | 'ipca'

export interface FixedIncomeInput {
  valorInicial: number
  tipo: TipoRendaFixa
  /** Para pós: % do CDI (ex: 110). Para pre: taxa a.a. (ex: 12). Para ipca: spread real a.a. (ex: 6.5) */
  taxa: number
  prazoMeses: number
  /** CDI anualizado (% a.a.) — obrigatório para tipo 'pos_cdi' */
  cdiAA?: number
  /** IPCA anualizado (% a.a.) — obrigatório para tipo 'ipca' */
  ipcaAA?: number
  /** Se isento de IR (LCI, LCA, CRI, CRA, debêntures incentivadas) */
  isentoIR: boolean
}

export interface FixedIncomeResult {
  valorFinalBruto: number
  rendimentoBruto: number
  iof: number
  ir: number
  valorFinalLiquido: number
  rendimentoLiquido: number
  rentabilidadeTotalLiquida: number
  rentabilidadeAALiquida: number
  /** Evolução mensal do montante bruto */
  evolucaoMensal: { mes: number; valor: number }[]
}

/**
 * Calcula a taxa anual efetiva conforme o tipo.
 */
function getTaxaAnual(input: FixedIncomeInput): number {
  switch (input.tipo) {
    case 'pos_cdi': {
      const cdi = input.cdiAA ?? 0
      return (cdi / 100) * (input.taxa / 100)
    }
    case 'prefixado':
      return input.taxa / 100
    case 'ipca': {
      const ipca = input.ipcaAA ?? 0
      return (1 + ipca / 100) * (1 + input.taxa / 100) - 1
    }
  }
}

/**
 * Capitaliza usando base 252 (dias úteis).
 * VF = VP × (1 + i_aa)^(du/252)
 */
function capitalizar(vp: number, taxaAA: number, diasUteis: number): number {
  return vp * Math.pow(1 + taxaAA, diasUteis / 252)
}

export function calcularRendaFixa(input: FixedIncomeInput): FixedIncomeResult {
  const taxaAA = getTaxaAnual(input)
  const diasUteisTotais = input.prazoMeses * 21
  const diasCorridosTotais = input.prazoMeses * 30

  // Valor final bruto
  const valorFinalBruto = capitalizar(input.valorInicial, taxaAA, diasUteisTotais)
  const rendimentoBruto = valorFinalBruto - input.valorInicial

  // Impostos
  const impostos = calcularImpostoRendaFixa(
    rendimentoBruto,
    diasCorridosTotais,
    input.isentoIR
  )

  const valorFinalLiquido = input.valorInicial + impostos.rendimentoLiquido
  const rentabilidadeTotalLiquida = impostos.rendimentoLiquido / input.valorInicial
  const anos = input.prazoMeses / 12
  const rentabilidadeAALiquida =
    anos > 0 ? Math.pow(1 + rentabilidadeTotalLiquida, 1 / anos) - 1 : 0

  // Evolução mensal (bruto)
  const evolucaoMensal: { mes: number; valor: number }[] = [
    { mes: 0, valor: input.valorInicial },
  ]
  for (let m = 1; m <= input.prazoMeses; m++) {
    const du = m * 21
    evolucaoMensal.push({
      mes: m,
      valor: capitalizar(input.valorInicial, taxaAA, du),
    })
  }

  return {
    valorFinalBruto,
    rendimentoBruto,
    iof: impostos.iof,
    ir: impostos.ir,
    valorFinalLiquido,
    rendimentoLiquido: impostos.rendimentoLiquido,
    rentabilidadeTotalLiquida,
    rentabilidadeAALiquida,
    evolucaoMensal,
  }
}

/**
 * Calcula rendimento da poupança para comparação.
 * Selic > 8,5%: 0,5% a.m. + TR (TR ≈ 0 na prática)
 * Selic ≤ 8,5%: 70% da Selic / 12
 */
export function calcularPoupanca(
  valorInicial: number,
  prazoMeses: number,
  selicAA: number
): { valorFinal: number; rendimento: number } {
  const taxaMensal =
    selicAA > 8.5 ? 0.005 : (0.7 * (selicAA / 100)) / 12

  let valor = valorInicial
  for (let m = 0; m < prazoMeses; m++) {
    valor *= 1 + taxaMensal
  }

  return {
    valorFinal: valor,
    rendimento: valor - valorInicial,
  }
}
