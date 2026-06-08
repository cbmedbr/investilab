/**
 * Regras tributárias brasileiras para investimentos.
 * Referência: legislação vigente em junho/2026.
 * Centralize aqui todas as alíquotas para facilitar atualização.
 */

// ============ IR Renda Fixa — Tabela Regressiva ============

export interface IRBracket {
  maxDays: number
  rate: number
}

/** Tabela regressiva de IR sobre rendimentos de renda fixa (dias corridos) */
export const IR_RENDA_FIXA: IRBracket[] = [
  { maxDays: 180, rate: 0.225 },
  { maxDays: 360, rate: 0.20 },
  { maxDays: 720, rate: 0.175 },
  { maxDays: Infinity, rate: 0.15 },
]

/** Retorna a alíquota de IR para renda fixa dado o prazo em dias corridos */
export function getIRRendaFixa(diasCorridos: number): number {
  for (const bracket of IR_RENDA_FIXA) {
    if (diasCorridos <= bracket.maxDays) return bracket.rate
  }
  return 0.15
}

// ============ IOF — Renda Fixa (resgate < 30 dias) ============

/**
 * Tabela oficial de IOF (Decreto 6.306/2007).
 * Incide sobre o rendimento se resgate em menos de 30 dias corridos.
 * Dia 1 = 96%, Dia 2 = 93%, ..., Dia 29 = 3%, Dia 30+ = 0%.
 */
export const IOF_TABLE: number[] = [
  96, 93, 90, 86, 83, 80, 76, 73, 70, 66,
  63, 60, 56, 53, 50, 46, 43, 40, 36, 33,
  30, 26, 23, 20, 16, 13, 10, 6, 3, 0,
]

/** Retorna a alíquota de IOF (0 a 1) dado o número de dias corridos */
export function getIOF(diasCorridos: number): number {
  if (diasCorridos <= 0) return 0.96
  if (diasCorridos >= 30) return 0
  return (IOF_TABLE[diasCorridos - 1] ?? 0) / 100
}

// ============ Renda Variável ============

/** IR sobre ganho de capital em ações — swing trade */
export const IR_ACOES_SWING = 0.15

/** IR sobre ganho de capital em ações — day trade */
export const IR_ACOES_DAYTRADE = 0.20

/** Isenção de IR para ações swing trade: total vendido no mês até este valor */
export const ISENCAO_ACOES_SWING = 20_000

/** IR sobre ganho na venda de cotas de FII */
export const IR_FII_VENDA = 0.20

/** IR sobre ganho na venda de ETF (swing trade) */
export const IR_ETF_SWING = 0.15

/** IR sobre ganho na venda de ETF (day trade) */
export const IR_ETF_DAYTRADE = 0.20

/** JCP: IR retido na fonte */
export const IR_JCP = 0.15

// ============ Cripto — Ganho de Capital ============

/** Isenção de IR cripto: alienações no mês até este valor */
export const ISENCAO_CRIPTO = 35_000

export interface CryptoTaxBracket {
  maxGain: number
  rate: number
}

/** Faixas progressivas de ganho de capital para cripto */
export const CRIPTO_GANHO_CAPITAL: CryptoTaxBracket[] = [
  { maxGain: 5_000_000, rate: 0.15 },
  { maxGain: 10_000_000, rate: 0.175 },
  { maxGain: 30_000_000, rate: 0.20 },
  { maxGain: Infinity, rate: 0.225 },
]

/** Retorna a alíquota de IR para ganho de capital em cripto */
export function getIRCripto(ganhoCapital: number): number {
  for (const bracket of CRIPTO_GANHO_CAPITAL) {
    if (ganhoCapital <= bracket.maxGain) return bracket.rate
  }
  return 0.225
}

/**
 * Calcula o IR sobre rendimento de renda fixa.
 * Retorna { iof, irBruto, irLiquido, rendimentoLiquido }
 */
export function calcularImpostoRendaFixa(
  rendimentoBruto: number,
  diasCorridos: number,
  isentoIR: boolean
): {
  iof: number
  ir: number
  rendimentoLiquido: number
} {
  // IOF (sobre o rendimento, se < 30 dias)
  const iofRate = getIOF(diasCorridos)
  const iof = rendimentoBruto * iofRate
  const rendimentoAposIOF = rendimentoBruto - iof

  // IR (sobre o rendimento após IOF)
  let ir = 0
  if (!isentoIR) {
    const irRate = getIRRendaFixa(diasCorridos)
    ir = rendimentoAposIOF * irRate
  }

  return {
    iof,
    ir,
    rendimentoLiquido: rendimentoBruto - iof - ir,
  }
}

/**
 * Calcula IR sobre ganho de capital em ações/ETFs.
 */
export function calcularIRAcoes(
  ganho: number,
  totalVendidoMes: number,
  isDayTrade: boolean,
  isETF: boolean
): number {
  if (ganho <= 0) return 0

  if (isDayTrade) {
    return ganho * IR_ACOES_DAYTRADE
  }

  // Isenção swing trade: total vendido ≤ R$ 20.000/mês (não vale para ETF)
  if (!isETF && totalVendidoMes <= ISENCAO_ACOES_SWING) {
    return 0
  }

  return ganho * IR_ACOES_SWING
}

/**
 * Calcula IR sobre ganho de capital em cripto.
 */
export function calcularIRCripto(
  ganho: number,
  totalAlienadoMes: number
): number {
  if (ganho <= 0) return 0

  // Isenção: alienações no mês ≤ R$ 35.000
  if (totalAlienadoMes <= ISENCAO_CRIPTO) {
    return 0
  }

  const rate = getIRCripto(ganho)
  return ganho * rate
}
