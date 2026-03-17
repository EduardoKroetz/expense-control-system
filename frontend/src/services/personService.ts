import { API_URL } from "../config/api"
import type Person from "../types/person"

const apiUrl = `${API_URL}/persons`

export async function createPerson(data: Omit<Person, "id">) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function updatePerson(data: Person) {
  const res = await fetch(`${apiUrl}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function deletePerson(id: number) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export async function getPersons() {
  const res = await fetch(`${apiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })

  return res.json()
}
