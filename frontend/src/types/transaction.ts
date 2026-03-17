
export default interface Transaction {
  id: number,
  description: string,
  value: number,
  type: "Expense" | "Income",
  categoryId: number,
  personId: number,
  
  personFullName?: string,
  categoryDescription?: string
}