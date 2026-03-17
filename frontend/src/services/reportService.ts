import { API_URL } from "../config/api"

const apiUrl = `${API_URL}/reports`

export async function getPersonsTotals() {
  const res = await fetch(`${apiUrl}/persons-totals`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })

  return res.json()
}

export async function getCategoriesTotals() {
  const res = await fetch(`${apiUrl}/categories-totals`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })

  return res.json()
}

