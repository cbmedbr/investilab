/**
 * Cálculos de risco e retorno — funções puras.
 */

/**
 * Sharpe simplificado: (retorno_esperado - taxa_livre_de_risco) / volatilidade
 * Todos os valores em % a.a.
 */
export function calcularSharpe(
  retornoEsperado: number,
  taxaLivreDeRisco: number,
  volatilidade: number
): number | null {
  if (volatilidade <= 0) return null
  return (retornoEsperado - taxaLivreDeRisco) / volatilidade
}

/**
 * Faixa de resultado (otimista / esperado / pessimista).
 * Usa retorno ± 1 desvio padrão (volatilidade).
 */
export function calcularFaixaResultado(
  aporte: number,
  retornoEsperadoAA: number,
  volatilidadeAA: number,
  prazoAnos: number
): {
  pessimista: number
  esperado: number
  otimista: number
} {
  const esperado = aporte * Math.pow(1 + retornoEsperadoAA / 100, prazoAnos)
  const retornoPess = retornoEsperadoAA - volatilidadeAA
  const retornoOtim = retornoEsperadoAA + volatilidadeAA
  const pessimista = aporte * Math.pow(1 + retornoPess / 100, prazoAnos)
  const otimista = aporte * Math.pow(1 + retornoOtim / 100, prazoAnos)

  return { pessimista, esperado, otimista }
}
