
export default interface PersonTotals {
  persons: PersonTotal[],
  totals: Totals
}

type PersonTotal = {
  id: number
  fullName: string
  totalExpense: number
  totalIncome: number
  balance: number
}

type Totals = {
  totalExpense: number
  totalIncome: number
  balance: number
}