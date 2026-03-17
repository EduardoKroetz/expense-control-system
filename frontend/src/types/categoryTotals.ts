
export default interface CategoryTotals {
  categories: CategoryTotal[],
  totals: Totals
}

type CategoryTotal = {
  id: number
  description: string
  totalExpense: number
  totalIncome: number
  balance: number
}

type Totals = {
  totalExpense: number
  totalIncome: number
  balance: number
}