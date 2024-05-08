export function formatNumber(num: number, digits = 2) {
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  })
}