const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const decimalFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Formata valor em R$ (ex: R$ 1.234,56) */
export function formatBRL(value: number): string {
  return currencyFormatter.format(value)
}

/** Formata percentual (0.15 → "15,00%") */
export function formatPercent(value: number): string {
  return percentFormatter.format(value)
}

/** Formata número decimal (1234.5 → "1.234,50") */
export function formatDecimal(value: number, decimals = 2): string {
  if (decimals !== 2) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }
  return decimalFormatter.format(value)
}

/** Formata percentual a partir de valor já em % (15 → "15,00%") */
export function formatPercentValue(value: number): string {
  return percentFormatter.format(value / 100)
}
