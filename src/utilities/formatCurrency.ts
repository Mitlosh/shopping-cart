const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "UAH",
  style: "currency",
})

export function formatCurrency(value: number) {
  return CURRENCY_FORMATTER.format(value)
}
