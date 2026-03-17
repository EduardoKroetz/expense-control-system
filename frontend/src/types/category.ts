
export default interface Category {
  id: number,
  description: string,
  purpose: "Expense" | "Income" | "Both"
}