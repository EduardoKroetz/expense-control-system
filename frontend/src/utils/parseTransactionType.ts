import type Transaction from "../types/transaction"

export function parseType(value: string): Transaction["type"] {
  if (value === "Expense" || value === "Income")
    return value

  throw new Error("Tipo inválido")
}

export function formatTypePtBr(value: Transaction["type"] | string) {
  return value == "Expense" ? "Despesa" : "Receita"
}