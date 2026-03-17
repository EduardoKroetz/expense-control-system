import { useState } from "react"
import type Person from "../../types/person"
import FormField from "../../components/ui/FormField"
import { createPerson, updatePerson } from "../../services/personService"
import Spinner from "../../components/ui/Spinner"
import toast from "react-hot-toast"

type PersonFormProps = {
  person?: Person,
  onSuccess?: (person: Person) => void
}

type Errors = {
  fullName?: string
  age?: string
}

export default function PersonForm({ person, onSuccess }: PersonFormProps) {
  const newPerson = !person || person?.id === 0;

  const [fullName, setFullName] = useState(person?.fullName ?? "")
  const [age, setAge] = useState(person?.age.toString() ?? "")

  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    const newErrors: Errors = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Nome é obrigatório"
    } else if (fullName.length > 200) {
      newErrors.fullName = "Nome deve possuir no máximo 200 caracteres"
    }

    const ageNumber = Number(age);
    if (!ageNumber || ageNumber <= 0) {
      newErrors.age = "Idade deve ser maior que 0"
    } 
    else if (ageNumber > 120) {
      newErrors.age = "Idade deve ser menor ou igual a 120"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true);

    const data: Person = {
      id: person?.id ?? 0,
      fullName,
      age: ageNumber
    }

    try {
      if (newPerson) {
        const res = await createPerson(data)
        data.id = res.id;
      } else {
        await updatePerson(data)
      }
    } catch {
      toast.error("Erro ao salvar a pessoa")
      return;
    } finally {
      setIsLoading(false);
    }

    toast.success(`Pessoa ${newPerson ? "criada" : "atualizada"} com sucesso!`)
    onSuccess?.(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField name="Nome" error={errors.fullName} > 
        <input
          type="text"
          placeholder="Nome"
          className={`input input-bordered w-full ${errors.fullName ? "input-error" : ""}`}
          value={fullName}
          maxLength={200}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormField>

      <FormField name="Idade" error={errors.age} > 
        <input
          type="number"
          placeholder="Idade"
          className={`input input-bordered w-full ${errors.age ? "input-error" : ""}`}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </FormField>

      <div>
        <button className="btn bg-blue-400 float-end mt-3">
          {isLoading ? <Spinner size="lg" /> : "Salvar"}     
        </button>
      </div>
    </form>
  )
}