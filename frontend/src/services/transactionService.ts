import { API_URL } from "../config/api"
import type Transaction from "../types/transaction"

const apiUrl = `${API_URL}/transactions`

export async function createTransaction(data: Omit<Transaction, "id">) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function getTransactions() {
  const res = await fetch(`${apiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })

  return res.json()
}
