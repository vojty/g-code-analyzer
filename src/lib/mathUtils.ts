import Decimal from 'decimal.js'

export function sum<T extends number | Decimal>(values: Array<T>) {
  return values.reduce((acc, val) => acc.add(val), new Decimal(0))
}
