/**
 * Cálculos para criptoativos — funções puras.
 * Suporte a DCA (Dollar Cost Averaging).
 */

import { calcularIRCripto } from './tax'

export interface CryptoAporte {
  preco: number
  quantidade: number
}

export interface CryptoInput {
  aportes: CryptoAporte[]
  precoAtual: number
  totalAlienadoMes: number
}

export interface CryptoResult {
  precoMedio: number
  quantidadeTotal: number
  custoTotal: number
  valorAtual: number
  lucro: number
  variacao: number
  irDevido: number
  lucroLiquido: number
  valorDARF: number
}

export function calcularCrypto(input: CryptoInput): CryptoResult {
  let custoTotal = 0
  let quantidadeTotal = 0

  for (const aporte of input.aportes) {
    custoTotal += aporte.preco * aporte.quantidade
    quantidadeTotal += aporte.quantidade
  }

  const precoMedio = quantidadeTotal > 0 ? custoTotal / quantidadeTotal : 0
  const valorAtual = input.precoAtual * quantidadeTotal
  const lucro = valorAtual - custoTotal
  const variacao = custoTotal > 0 ? lucro / custoTotal : 0

  const irDevido = calcularIRCripto(lucro, input.totalAlienadoMes)

  return {
    precoMedio,
    quantidadeTotal,
    custoTotal,
    valorAtual,
    lucro,
    variacao,
    irDevido,
    lucroLiquido: lucro - irDevido,
    valorDARF: irDevido,
  }
}
