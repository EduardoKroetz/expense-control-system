import { API_URL } from "../config/api"
import type Category from "../types/category"

const apiUrl = `${API_URL}/categories`

export async function createCategory(data: Omit<Category, "id">) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function updateCategory(data: Category) {
  const res = await fetch(`${apiUrl}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function deleteCategory(id: number) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export async function getCategories() {
  const res = await fetch(`${apiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })

  return res.json()
}
