import { useState } from "react"
import type Category from "../../types/category"
import FormField from "../../components/ui/FormField"
import { createCategory, updateCategory } from "../../services/categoryService"
import Spinner from "../../components/ui/Spinner"
import toast from "react-hot-toast"
import { formatPurposePtBr, parsePurpose } from "../../utils/parseCategoryPurpose"

type CategoryFormProps = {
  category?: Category,
  onSuccess?: (category: Category) => void
}

type Errors = {
  description?: string
  purpose?: string
}

const purposes = ["Expense", "Income", "Both"];

export default function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const newCategory = !category || category?.id === 0;

  const [description, setDescription] = useState(category?.description ?? "")
  const [purpose, setPurpose] = useState(category?.purpose ?? "")

  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    const newErrors: Errors = {}

    if (!description.trim()) {
      newErrors.description = "Descrição é obrigatório"
    } else if (description.length > 400) {
      newErrors.description = "Descrição deve possuir no máximo 400 caracteres"
    }

    if (!purpose) {
      newErrors.purpose = "Finalidade é obrigatório"
    } 

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true);

    const data: Category = {
      id: category?.id ?? 0,
      description,
      purpose: parsePurpose(purpose)
    }

    try {
      if (newCategory) {
        const res = await createCategory(data)
        data.id = res.id;
      } else {
        await updateCategory(data)
      }
    } catch {
      toast.error("Erro ao salvar a categoria")
      return;
    }
    finally {
      setIsLoading(false);
    }

    toast.success(`Categoria ${newCategory ? "criada" : "atualizada"} com sucesso!`)
    onSuccess?.(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField name="Descrição" error={errors.description} > 
        <input
          type="text"
          placeholder="Descrição"
          className={`input input-bordered w-full ${errors.description ? "input-error" : ""}`}
          value={description}
          maxLength={400}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormField>

      <FormField name="Finalidade" error={errors.purpose} > 
        <select
          className={`select input-bordered w-full ${errors.purpose ? "input-error" : ""}`}
          onChange={(e) => setPurpose(e.target.value)}
        >
          {purposes.map(p => (
            <option selected={purpose == p} value={p}>{formatPurposePtBr(p)}</option>
          ))}
        </select>
      </FormField>

      <div>
        <button className="btn bg-blue-400 float-end mt-3">
          {isLoading ? <Spinner size="lg" /> : "Salvar"}     
        </button>
      </div>
    </form>
  )
}