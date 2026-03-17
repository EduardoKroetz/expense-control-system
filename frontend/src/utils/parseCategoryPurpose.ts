import type Category from "../types/category"

export function parsePurpose(value: string): Category["purpose"] {
  if (value === "Expense" || value === "Income" || value === "Both")
    return value

  throw new Error("Finalidade inválida")
}

export function formatPurposePtBr(value: Category["purpose"] | string) {
  return (
    value == "Expense" ? "Despesa" :
    value == "Income" ? "Receita" :
    "Ambas"
  )
}