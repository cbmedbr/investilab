export type AssetClass = 'renda_fixa' | 'acoes' | 'fiis' | 'cripto' | 'outro'

export interface ComparadorRow {
  id: string
  nome: string
  classe: AssetClass
  aporte: number
  prazoMeses: number
  retornoEsperadoAA: number
  volatilidade: number
  tributacao: number // alíquota efetiva (0 a 1)
  liquidez: string
}

export interface ComparadorAssumptions {
  taxaLivreDeRisco: number // % a.a. (Selic)
  prazoPadrao: number // meses
}

export interface ComputedRow extends ComparadorRow {
  retornoLiquidoAA: number
  retornoEsperadoRS: number
  retornoLiquidoRS: number
  pessimista: number
  otimista: number
  sharpe: number | null
}

export const CLASS_LABELS: Record<AssetClass, string> = {
  renda_fixa: 'Renda Fixa',
  acoes: 'Ações',
  fiis: 'FIIs',
  cripto: 'Cripto',
  outro: 'Outro',
}

export const DEFAULT_TAX: Record<AssetClass, number> = {
  renda_fixa: 0.15,
  acoes: 0.15,
  fiis: 0.20,
  cripto: 0.15,
  outro: 0,
}
